from datetime import datetime

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
    return shift_start_time <= current_time <= shift_end_time