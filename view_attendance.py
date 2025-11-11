"""Helper script to view attendance records from the database."""

from app import app, db
from database import User, Attendance
from datetime import datetime, timedelta

def view_all_attendance():
    """Display all attendance records."""
    with app.app_context():
        records = db.session.query(
            Attendance.timestamp,
            Attendance.event_type,
            User.id_number,
            User.full_name
        ).join(User).order_by(Attendance.timestamp.desc()).all()
        
        print(f"\n{'='*80}")
        print(f"Total Records: {len(records)}")
        print(f"{'='*80}")
        print(f"{'Timestamp':<20} {'Type':<6} {'ID Number':<12} {'Name':<30}")
        print(f"{'-'*80}")
        
        for record in records:
            timestamp_str = record.timestamp.strftime('%Y-%m-%d %I:%M %p')
            print(f"{timestamp_str:<20} {record.event_type:<6} {record.id_number:<12} {record.full_name:<30}")
        print(f"{'='*80}\n")

def view_today_attendance():
    """Display today's attendance records."""
    with app.app_context():
        today_start = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
        today_end = today_start + timedelta(days=1)
        
        records = db.session.query(
            Attendance.timestamp,
            Attendance.event_type,
            User.id_number,
            User.full_name
        ).join(User).filter(
            Attendance.timestamp >= today_start,
            Attendance.timestamp < today_end
        ).order_by(Attendance.timestamp.desc()).all()
        
        print(f"\n{'='*80}")
        print(f"Today's Attendance: {datetime.now().strftime('%Y-%m-%d')}")
        print(f"Total Records: {len(records)}")
        print(f"{'='*80}")
        print(f"{'Time':<12} {'Type':<6} {'ID Number':<12} {'Name':<30}")
        print(f"{'-'*80}")
        
        for record in records:
            time_str = record.timestamp.strftime('%I:%M %p')
            print(f"{time_str:<12} {record.event_type:<6} {record.id_number:<12} {record.full_name:<30}")
        print(f"{'='*80}\n")

def view_user_attendance(id_number):
    """Display attendance records for a specific user."""
    with app.app_context():
        user = User.query.filter_by(id_number=id_number).first()
        
        if not user:
            print(f"\n❌ User with ID {id_number} not found.\n")
            return
        
        records = Attendance.query.filter_by(user_id=user.id).order_by(Attendance.timestamp.desc()).all()
        
        print(f"\n{'='*80}")
        print(f"Attendance for: {user.full_name} (ID: {user.id_number})")
        print(f"Total Records: {len(records)}")
        print(f"{'='*80}")
        print(f"{'Date':<12} {'Time':<12} {'Type':<6}")
        print(f"{'-'*80}")
        
        for record in records:
            date_str = record.timestamp.strftime('%Y-%m-%d')
            time_str = record.timestamp.strftime('%I:%M %p')
            print(f"{date_str:<12} {time_str:<12} {record.event_type:<6}")
        print(f"{'='*80}\n")

if __name__ == '__main__':
    print("DLSU-D CSO Attendance System - View Records")
    print("="*80)
    print("1. View all attendance records")
    print("2. View today's attendance")
    print("3. View specific user's attendance")
    choice = input("\nSelect option (1-3): ").strip()
    
    if choice == '1':
        view_all_attendance()
    elif choice == '2':
        view_today_attendance()
    elif choice == '3':
        id_number = input("Enter ID Number: ").strip()
        view_user_attendance(id_number)
    else:
        print("Invalid option selected.")