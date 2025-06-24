from flask import Blueprint, request, jsonify
from models.staff_models import StaffMember, ShiftDay
from db import db
from datetime import datetime, timezone

staff_bp = Blueprint('staff', __name__)  # Blueprint for staff management routes

VALID_DAYS = {"Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"}

def is_valid_name(name):
    # strip removes leading and trailing whitespace
    return isinstance(name, str) and len(name.strip()) > 0

def is_valid_role(role):
    return isinstance(role, str) and len(role.strip()) > 0

def is_valid_contact(contact):
    return isinstance(contact, str) and len(contact.strip()) > 0

def is_valid_wage(wage):
    # isinstance checks if wage is a number
    return isinstance(wage, (int, float)) and wage >= 0

def is_valid_time(t):
    try:
        datetime.strptime(t, "%H:%M") # Check if time is in HH:MM format
        return True
    except ValueError:
        return False

def are_valid_days(days_list):
    return all(day in VALID_DAYS for day in days_list)

def format_schedule(days, shift_start, shift_end):
    if not days:
        return "" # If no days are provided, return empty string
    
    day_order = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    # Sort days, could come unordered from the client
    sorted_days = sorted(days, key=lambda d: day_order.index(d))
    
    ranges=[] # To hold formatted day ranges
    # Initialize start and previous day to the first day in the sorted list
    start = prev = sorted_days[0]
    prev_index = day_order.index(prev)
    
    # Iterate through the sorted days to find ranges
    for d in sorted_days[1:]:
        current_index = day_order.index(d) # Index of the current day
        # Check if current day is consecutive to the previous day
        if current_index == prev_index + 1:
            prev = d
            prev_index = current_index
        else:
            # If current day is consecutive, update the previous day
            if start == prev:
                ranges.append(start)
            else:
                ranges.append(f"{start}-{prev}")
            # Start a new range
            start = prev = d
            prev_index = current_index
    
    # Append the last range or day after loop ends
    if start == prev:
        ranges.append(start)
    else:
        ranges.append(f"{start}-{prev}")
    
    days_str = ", ".join(ranges)
    time_str = f"{shift_start}-{shift_end}"
    
    return f"{days_str}, {time_str}"

def is_active_now(days, shift_start, shift_end):
    # Order matches datetime.weekday() numbering
    weekday_map = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    now = datetime.now() # Get current date and time
    # now.weekday() returns 0 for Monday, 6 for Sunday
    current_day = weekday_map[now.weekday()] 
    
    # Check if current day is in the list of active days
    if current_day not in days:
        return False
    
    shift_start_time = datetime.strptime(shift_start, "%H:%M").time()
    shift_end_time = datetime.strptime(shift_end, "%H:%M").time()
    current_time = now.time()
    
    # Check if current time is within the shift hours
    if shift_start_time <= current_time <= shift_end_time:
        return True
    else:
        return False

def calculate_hours(shift_start, shift_end):
    start = datetime.strptime(shift_start, "%H:%M")
    end = datetime.strptime(shift_end, "%H:%M")
    return (end - start).seconds / 3600  # Convert seconds to hours
    

@staff_bp.route('/staff', methods=['GET'])
def get_staff():
    staff_members = StaffMember.query.all()
    return jsonify({
        "staff": [member.to_dict() for member in staff_members],
        "totalStaff": len(staff_members),
        "lastUpdated": datetime.now(timezone.utc).isoformat()
    })

@staff_bp.route('/staff', methods=['POST'])
def add_staff_member():
    data = request.get_json()

    required_fields = ["name", "role", "wage","contact", "days", "shift_start", "shift_end"]
    missing = [field for field in required_fields if field not in data]
    if missing:
        return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400
    
    if not is_valid_name(data["name"]):
        return jsonify({"error": "Invalid name"}), 400  
    if not is_valid_role(data["role"]):
        return jsonify({"error": "Invalid role"}), 400 
    if not is_valid_contact(data["contact"]):
        return jsonify({"error": "Invalid contact"}), 400
    if not is_valid_time(data["shift_start"]) or not is_valid_time(data["shift_end"]):
        return jsonify({"error": "shift_start and shift_end must be in HH:MM 24-hour format"}), 400
    if not data.get("days") or not are_valid_days(data["days"]):
        return jsonify({"error": f"Days must be a non-empty list containing only {sorted(VALID_DAYS)}"}), 400
    if not is_valid_wage(data["wage"]):
        return jsonify({"error": "wage must be a non-negative number"}), 400
    # Convert shift_start and shift_end to datetime.time objects for comparison
    if datetime.strptime(data["shift_start"], "%H:%M").time() >= datetime.strptime(data["shift_end"], "%H:%M").time():
        return jsonify({"error": "shift_end must be after shift_start"}), 400
    
    days = data["days"]
    shift_start = data["shift_start"]
    shift_end = data["shift_end"]
    wage = data["wage"]
    schedule = format_schedule(days, shift_start, shift_end)
    is_active = is_active_now(days, shift_start, shift_end)
    hours = calculate_hours(shift_start, shift_end)
    earnings = round(wage * hours, 2)
    
    shift_day_objs = [ShiftDay(day=day) for day in days]
    
    new_member = StaffMember(
        name=data["name"].strip(),
        role=data["role"].strip(),
        status=str(is_active),
        schedule=schedule,
        wage=wage,
        earnings=earnings,
        contact=data["contact"].strip(),
        hours=hours,
        shift_start=shift_start,
        shift_end=shift_end,
        days=shift_day_objs,
    )
    
    try:
        db.session.add(new_member)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
    return jsonify(new_member.to_dict()), 201

@staff_bp.route('/staff/<int:staff_id>', methods=['PATCH'])
def update_staff_member(staff_id):
    staff_member = StaffMember.query.get(staff_id)
    if not staff_member:
        return jsonify({"error": "Staff member not found"}), 404
    
    data = request.get_json()
    
    if "name" in data:
        if not is_valid_name(data["name"]):
            return jsonify({"error": "Invalid name"}), 400
        staff_member.name = data["name"].strip()

    if "role" in data:
        if not is_valid_role(data["role"]):
            return jsonify({"error": "Invalid role"}), 400
        staff_member.role = data["role"].strip()

    if "contact" in data:
        if not is_valid_contact(data["contact"]):
            return jsonify({"error": "Invalid contact"}), 400
        staff_member.contact = data["contact"].strip()

    if "wage" in data:
        if not is_valid_wage(data["wage"]):
            return jsonify({"error": "Wage must be a non-negative number"}), 400
        staff_member.wage = data["wage"]

    shift_start = data.get("shift_start", staff_member.shift_start)
    shift_end = data.get("shift_end", staff_member.shift_end)

    if "shift_start" in data:
        if not is_valid_time(shift_start):
            return jsonify({"error": "shift_start must be in HH:MM 24-hour format"}), 400

    if "shift_end" in data:
        if not is_valid_time(shift_end):
            return jsonify({"error": "shift_end must be in HH:MM 24-hour format"}), 400

    if is_valid_time(shift_start) and is_valid_time(shift_end):
        if datetime.strptime(shift_start, "%H:%M").time() >= datetime.strptime(shift_end, "%H:%M").time():
            return jsonify({"error": "shift_end must be after shift_start"}), 400

    staff_member.shift_start = shift_start
    staff_member.shift_end = shift_end

    if "days" in data:
        new_days = data["days"]
        if not new_days or not are_valid_days(new_days):
            return jsonify({"error": f"Days must be a non-empty list containing only {sorted(VALID_DAYS)}"}), 400

        staff_member.days.clear()
        staff_member.days.extend([ShiftDay(day=day) for day in new_days])
          
    days_list = [day.day for day in staff_member.days]
    staff_member.status = str(is_active_now(days_list, staff_member.shift_start, staff_member.shift_end))
    staff_member.schedule = format_schedule(days_list, staff_member.shift_start, staff_member.shift_end)
    staff_member.hours = calculate_hours(staff_member.shift_start, staff_member.shift_end)
    staff_member.earnings = round(staff_member.wage * staff_member.hours, 2)
    
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

    return jsonify(staff_member.to_dict()), 200

@staff_bp.route('/staff/<int:staff_id>', methods=['DELETE'])
def delete_staff_member(staff_id):
    staff_member = StaffMember.query.get(staff_id)
    if not staff_member:
        return jsonify({"error": "Staff member not found"}), 404
    
    try:
        db.session.delete(staff_member)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
    return jsonify({"message": "Staff member deleted successfully"}), 200