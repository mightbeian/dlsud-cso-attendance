from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    id_number = db.Column(db.String(20), unique=True, nullable=False)
    full_name = db.Column(db.String(100), nullable=False)
    birthday = db.Column(db.String(5), nullable=False)  # Format: MM-DD
    
    # Relationship
    attendance_records = db.relationship('Attendance', backref='user', lazy=True)
    
    def __repr__(self):
        return f'<User {self.id_number} - {self.full_name}>'

class Attendance(db.Model):
    __tablename__ = 'attendance'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.now)
    event_type = db.Column(db.String(3), nullable=False)  # 'In' or 'Out'
    
    def __repr__(self):
        return f'<Attendance {self.user_id} - {self.event_type} at {self.timestamp}>'