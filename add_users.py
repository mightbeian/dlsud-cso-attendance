"""Helper script to add users to the attendance system database."""

from app import app, db
from database import User

# Define users to add here
users_to_add = [
    {
        'id_number': '20212348',
        'full_name': 'Anna Reyes',
        'birthday': '12-25'  # Format: MM-DD
    },
    {
        'id_number': '20212349',
        'full_name': 'Carlos Garcia',
        'birthday': '06-10'
    },
    # Add more users below following the same format
    # {
    #     'id_number': 'YOUR_ID',
    #     'full_name': 'Full Name',
    #     'birthday': 'MM-DD'
    # },
]

def add_users():
    """Add users from the users_to_add list to the database."""
    with app.app_context():
        success_count = 0
        error_count = 0
        
        for user_data in users_to_add:
            try:
                # Check if user already exists
                existing = User.query.filter_by(id_number=user_data['id_number']).first()
                if existing:
                    print(f"⚠️  User {user_data['id_number']} ({user_data['full_name']}) already exists. Skipping.")
                    continue
                
                # Create new user
                user = User(**user_data)
                db.session.add(user)
                db.session.commit()
                print(f"✓ Added: {user_data['id_number']} - {user_data['full_name']}")
                success_count += 1
            except Exception as e:
                print(f"✗ Error adding {user_data['id_number']}: {str(e)}")
                error_count += 1
                db.session.rollback()
        
        print(f"\n{'='*50}")
        print(f"Successfully added: {success_count} user(s)")
        if error_count > 0:
            print(f"Errors: {error_count} user(s)")
        print(f"{'='*50}")

def list_all_users():
    """Display all users currently in the database."""
    with app.app_context():
        users = User.query.all()
        print(f"\n{'='*50}")
        print(f"Total Users in Database: {len(users)}")
        print(f"{'='*50}")
        for user in users:
            print(f"ID: {user.id_number} | Name: {user.full_name} | Birthday: {user.birthday}")
        print(f"{'='*50}\n")

if __name__ == '__main__':
    print("DLSU-D CSO Attendance System - User Management")
    print("="*50)
    print("1. Add new users")
    print("2. List all users")
    print("3. Add users and list all")
    choice = input("\nSelect option (1-3): ").strip()
    
    if choice == '1':
        add_users()
    elif choice == '2':
        list_all_users()
    elif choice == '3':
        add_users()
        list_all_users()
    else:
        print("Invalid option selected.")