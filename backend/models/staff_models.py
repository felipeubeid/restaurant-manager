from db import db
from utils.staff_active_utils import is_active_now

class ShiftDay(db.Model):
    __tablename__ = "shift_day"

    id = db.Column(db.Integer, primary_key=True)
    staff_id = db.Column(db.Integer, db.ForeignKey('staff.id'), nullable=False)
    day = db.Column(db.String(10), nullable=False)

    # Lets us access the staff member associated with this shift day
    staff = db.relationship("StaffMember", back_populates="days")
    
class StaffMember(db.Model):
    __tablename__ = "staff"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(50), nullable=False)
    schedule = db.Column(db.String(100), nullable=False)
    wage = db.Column(db.Float, nullable=False)
    earnings = db.Column(db.Float, nullable=False)
    contact = db.Column(db.String(100), nullable=False)
    hours = db.Column(db.Float, nullable=False)

    shift_start = db.Column(db.String(5), nullable=False)
    shift_end = db.Column(db.String(5), nullable=False)
    
    # Lets us access the shift days associated with this staff member
    days = db.relationship("ShiftDay", back_populates="staff", cascade="all, delete-orphan")

    def to_dict(self):
        days_list = [day.day for day in self.days]
        return {
            "id": self.id,
            "name": self.name,
            "role": self.role,
            # Check if the staff member is currently active dynamically
            "is_active": is_active_now(days_list, self.shift_start, self.shift_end),
            "schedule": self.schedule,
            "wage": self.wage,
            "earnings": self.earnings,
            "contact": self.contact,
            "hours": self.hours,
            "days": days_list,
            "shift": {
                "start": self.shift_start,
                "end": self.shift_end
            }
        }