from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    id_number = db.Column(db.String(20), unique=True, nullable=False)
    full_name = db.Column(db.String(100), nullable=False)
    birthday = db.Column(db.String(5), nullable=False)  # Format: MM-DD
    committee = db.Column(db.String(50), nullable=False)  # Executive committee
    photo_filename = db.Column(db.String(200), nullable=True)  # Photo filename
    
    # Relationship
    attendance_records = db.relationship('Attendance', backref='user', lazy=True, cascade='all, delete-orphan')
    duty_alerts = db.relationship('DutyAlert', backref='user', lazy=True, cascade='all, delete-orphan')
    
    def __repr__(self):
        return f'<User {self.id_number} - {self.full_name}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'id_number': self.id_number,
            'full_name': self.full_name,
            'birthday': self.birthday,
            'committee': self.committee,
            'photo_filename': self.photo_filename
        }

class Attendance(db.Model):
    __tablename__ = 'attendance'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.now)
    event_type = db.Column(db.String(3), nullable=False)  # 'In' or 'Out'
    
    def __repr__(self):
        return f'<Attendance {self.user_id} - {self.event_type} at {self.timestamp}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'timestamp': self.timestamp.strftime('%Y-%m-%d %I:%M:%S %p'),
            'event_type': self.event_type
        }

class DutyAlert(db.Model):
    __tablename__ = 'duty_alerts'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    week_start = db.Column(db.Date, nullable=False)  # Monday of the week
    dismissed = db.Column(db.Boolean, default=False)  # If alert was dismissed
    dismissed_at = db.Column(db.DateTime, nullable=True)
    
    def __repr__(self):
        return f'<DutyAlert {self.user_id} - Week {self.week_start}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'week_start': self.week_start.strftime('%Y-%m-%d'),
            'dismissed': self.dismissed,
            'dismissed_at': self.dismissed_at.strftime('%Y-%m-%d %H:%M:%S') if self.dismissed_at else None
        }
