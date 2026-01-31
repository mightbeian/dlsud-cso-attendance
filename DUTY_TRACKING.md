# Duty Tracking Feature

## Overview

The system now tracks weekly duty hours and displays red flag alerts for users who haven't met the 8-hour weekly requirement.

## Features

### 1. **Automatic Hour Tracking**
- Calculates total hours from Time In/Out records
- Tracks hours per week (Monday to Sunday)
- Minimum requirement: **8 hours per week**

### 2. **Red Flag Alerts**
- Users below 8 hours show in sidebar with red flag icon
- Shows hours worked and hours remaining
- Organized by committee
- Updates in real-time

### 3. **Dismissible Alerts**
- Click X button to dismiss an alert
- Dismissed alerts won't show again for that week
- Resets every Monday

## How It Works

### For Users:
1. Log in and out normally
2. System automatically tracks your hours
3. If you haven't met 8 hours by mid-week, you'll appear in the duty alerts

### For Administrators:
1. Check the "Duty Alerts" section in the sidebar
2. See who needs to render more hours
3. Dismiss alerts as needed

## API Endpoints

### Get Duty Alerts
```
GET /api/duty-alerts
```
Returns users who haven't met weekly requirements.

### Dismiss Alert
```
POST /api/duty-alerts/<user_id>/dismiss
```
Dismisses the alert for the current week.

### Get User Hours
```
GET /api/user/<user_id>/hours
```
Returns hours worked this week for a specific user.

## Database Schema

### New Table: dismissed_alerts
```sql
- id (Primary Key)
- user_id (Foreign Key → users)
- week_start (DateTime) - Monday of the week
- dismissed_at (DateTime) - When dismissed
```

## Configuration

To change the required hours, edit `app.py`:

```python
REQUIRED_WEEKLY_HOURS = 8  # Change this value
```

## Migration

If upgrading from v2.0, run:

```bash
python migrate_database.py
```

This will add the `dismissed_alerts` table.

## UI Design

### Duty Alert Card
```
┌─────────────────────────────────────┐
│ ⚠️ DUTY ALERTS                      │
├─────────────────────────────────────┤
│ 🚩 Juan Dela Cruz            [X]    │
│    Executive Board                   │
│    2.5/8 hrs - Need 5.5 more        │
│                                      │
│ 🚩 Maria Santos              [X]    │
│    Externals                         │
│    4.0/8 hrs - Need 4.0 more        │
└─────────────────────────────────────┘
```

## Visual Indicators

- **Red Flag Icon (🚩)**: User needs more hours
- **Green Check (✓)**: User met requirements
- **Hours Display**: "X.X/8 hrs - Need Y.Y more"
- **Dismiss Button (X)**: Remove from list

## Best Practices

1. **Check alerts daily** - Monitor who needs to render duties
2. **Dismiss completed** - Remove alerts once users render hours
3. **Weekly review** - Check reports every Monday
4. **Export DTR** - Keep records of all hours worked

## Troubleshooting

**Alert not showing:**
- Verify user has logged hours this week
- Check if alert was dismissed
- Refresh the page

**Wrong hour calculation:**
- Ensure users logged out properly
- Check for incomplete Time In/Out pairs
- Review attendance records

**Can't dismiss alert:**
- Check browser console for errors
- Verify user ID is correct
- Try refreshing the page

## Future Enhancements

- Email notifications for low hours
- Customizable hour requirements per committee
- Monthly duty reports
- Duty hour history
- Grace period configuration
