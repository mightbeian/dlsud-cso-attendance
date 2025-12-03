"""
DLSU-D CSO Attendance System - Database Models
SQLAlchemy models for User and Attendance tracking
"""

from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    """User model for storing student/member information"""
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.String(20), unique=True, nullable=False)
    full_name = db.Column(db.String(100), nullable=False)
    birthday = db.Column(db.String(5), nullable=True)  # Format: "MM-DD"
    committee = db.Column(db.String(50), nullable=False)
    photo_filename = db.Column(db.String(255), nullable=True)
    status = db.Column(db.String(10), default='Offline')  # "Online" or "Offline"
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationship to attendance records
    attendance_records = db.relationship('Attendance', backref='user', lazy=True, cascade='all, delete-orphan')
    
    # Valid committees
    COMMITTEES = [
        'Executive Board',
        'Externals',
        'Internals',
        'Visuals and Marketing',
        'Finance',
        'Admin & Productions'
    ]
    
    def to_dict(self):
        """Convert user object to dictionary"""
        return {
            'id': self.id,
            'student_id': self.student_id,
            'full_name': self.full_name,
            'birthday': self.birthday,
            'committee': self.committee,
            'photo_filename': self.photo_filename,
            'status': self.status
        }
    
    def __repr__(self):
        return f'<User {self.student_id}: {self.full_name}>'


class Attendance(db.Model):
    """Attendance model for tracking time in/out events"""
    __tablename__ = 'attendance'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    event_type = db.Column(db.String(10), nullable=False)  # "Time In" or "Time Out"
    
    def to_dict(self):
        """Convert attendance object to dictionary"""
        return {
            'id': self.id,
            'user_id': self.user_id,
            'timestamp': self.timestamp.isoformat(),
            'event_type': self.event_type,
            'user_name': self.user.full_name if self.user else None
        }
    
    def __repr__(self):
        return f'<Attendance {self.user_id}: {self.event_type} at {self.timestamp}>'
