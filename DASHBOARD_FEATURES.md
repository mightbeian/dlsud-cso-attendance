# DLSU-D CSO Attendance Dashboard - New Features

## 🎉 Major Update: Dashboard Interface

The attendance system has been completely redesigned with a modern dashboard interface featuring advanced user management and real-time monitoring capabilities.

---

## ✨ New Features

### 1. **Modern Dashboard Layout**
- **Top Navigation Bar** with DLSU branding
- **Sidebar** showing active users by committee
- **Main Content Area** for attendance logging
- **Statistics Cards** showing real-time data

### 2. **Single-Action Attendance** (ENTER Key Only)
- **No more buttons!** Just press ENTER
- System automatically detects if you're timing in or out
- If you're not logged in → Times you IN
- If you're already logged in → Times you OUT
- Simple, fast, and intuitive

### 3. **User Photo Display**
- Upload profile pictures for each user
- Photos display when user logs in/out
- Supports JPG, PNG, GIF formats
- Automatic photo management

### 4. **Live Active Users Sidebar**
- See who's currently logged in
- Organized by Executive Committee:
  - Executive Board
  - Externals
  - Internals
  - Visuals and Marketing
  - Finance
  - Admin & Productions
- Shows time when each user logged in
- Updates automatically every 10 seconds

### 5. **Search Functionality**
- Search users by name or ID number
- Real-time search results
- Click result to auto-fill ID field
- Fast and responsive

### 6. **Admin Panel**
Three powerful admin features:

#### **A. Export DTR**
- One-click Excel export
- Includes committee information
- Formatted Daily Time Records
- Automatic time calculations

#### **B. Add User**
- Add new users through web interface
- Required fields:
  - ID Number
  - Full Name
  - Birthday (MM-DD format)
  - Committee selection
- Optional photo upload
- Instant database update

#### **C. Manage Users**
- View all users in system
- Search and filter users
- Delete users (with confirmation)
- Shows user details (ID, committee, birthday)
- Cascading delete (removes all attendance records)

### 7. **Real-Time Statistics**
- Total Users count
- Currently Logged In count
- Live clock
- Auto-updating

---

## 🖼️ Dashboard Layout

```
┌─────────────────────────────────────────────────────────┐
│  [LOGO] DLSU-D CSO    [Search...]    [Admin Button]    │
├──────────────┬──────────────────────────────────────────┤
│              │                                          │
│  ACTIVE      │  [User Photo Display]                   │
│  USERS       │                                          │
│              │  ┌────────────────────────────────────┐ │
│ Executive    │  │  Enter ID Number and Press ENTER   │ │
│ Board (2)    │  └────────────────────────────────────┘ │
│ • Juan       │                                          │
│ • Maria      │  [Message Area]                          │
│              │                                          │
│ Externals(1) │  ┌─────┐ ┌─────┐ ┌─────┐              │
│ • Pedro      │  │ 15  │ │  8  │ │12:30│              │
│              │  │Users│ │Login│ │ PM  │              │
│ (Other       │  └─────┘ └─────┘ └─────┘              │
│ committees)  │                                          │
│              │                                          │
└──────────────┴──────────────────────────────────────────┘
```

---

## 🔄 Upgrade from Old Version

If you have the old attendance system installed:

### Option 1: Migrate Existing Database

```bash
# Run the migration script
python migrate_database.py
```

This will:
- Backup your existing database
- Add new committee and photo fields
- Preserve all attendance records
- Keep all user data intact

### Option 2: Fresh Install

```bash
# Delete old database (backup first!)
# Windows
del attendance.db

# Mac/Linux  
rm attendance.db

# Restart the app
python app.py
```

---

## 📖 Usage Guide

### For Regular Users (Attendance Logging)

1. **Open the dashboard**
   - Navigate to `http://127.0.0.1:5000`

2. **Log your attendance**
   - Type your ID number in the field
   - Press **ENTER** (that's it!)
   - Your photo will display (if uploaded)
   - See confirmation message

3. **View active users**
   - Check the sidebar to see who's logged in
   - Organized by committee

### For Administrators

1. **Access Admin Panel**
   - Click **"Admin"** button in top bar

2. **Add New Users**
   - Go to "Add User" tab
   - Fill in required information:
     - ID Number (e.g., 20212348)
     - Full Name
     - Birthday (MM-DD, e.g., 01-15)
     - Committee (select from dropdown)
   - Optionally upload a photo
   - Click "Add User"

3. **Manage Existing Users**
   - Go to "Manage Users" tab
   - Search for specific users
   - View all user details
   - Delete users if needed (with confirmation)

4. **Export Reports**
   - Go to "Export DTR" tab
   - Click "Export DTR to Excel"
   - File downloads automatically

### Uploading User Photos

**During User Creation:**
- Select photo when adding user
- Max file size: 5MB
- Supported formats: JPG, PNG, GIF

**For Existing Users:**
Currently photos can only be added when creating a user. To add a photo to an existing user:
1. Note their details
2. Delete the user
3. Re-add them with the photo

*(A photo update feature for existing users may be added in future updates)*

---

## 🎨 Committee Organization

Users are organized into these committees:
- **Executive Board** - Leadership team
- **Externals** - External affairs
- **Internals** - Internal operations  
- **Visuals and Marketing** - Creative team
- **Finance** - Financial management
- **Admin & Productions** - Administrative support

Each committee is displayed separately in the sidebar with active user counts.

---

## ⌨️ Keyboard Shortcuts

- **ENTER** - Log attendance (main input field)
- **ESC** - Close admin modal (when open)
- **Click outside** - Close search results/modals

---

## 🔧 Technical Details

### New Database Fields

**Users Table:**
- `committee` (VARCHAR 50) - User's committee
- `photo_filename` (VARCHAR 200) - Photo file path

### New API Endpoints

- `POST /api/attendance` - Toggle attendance (single endpoint)
- `GET /api/active-users` - Get currently logged-in users
- `GET /api/users` - Get all users
- `GET /api/users/search?q=query` - Search users
- `POST /api/users` - Add new user
- `DELETE /api/users/<id>` - Delete user
- `POST /api/users/<id>/photo` - Upload user photo

### File Structure

```
static/
├── dashboard.css       # Dashboard styling
├── dashboard.js        # Dashboard functionality
└── photos/            # User profile photos (auto-created)

templates/
└── dashboard.html     # Main dashboard template
```

---

## 🐛 Troubleshooting

### Issue: Photos not displaying

**Solution:**
1. Check that `static/photos/` folder exists
2. Verify photo was uploaded successfully
3. Check browser console for errors
4. Ensure photo filename is valid

### Issue: Committee not showing users

**Solution:**
1. Verify users have committee assigned
2. Check that users are actually logged in
3. Refresh the page
4. Check browser console for errors

### Issue: Search not working

**Solution:**
1. Ensure you're typing at least 2 characters
2. Check network tab for API errors
3. Verify users exist in database

### Issue: Can't add users

**Solution:**
1. Fill in all required fields
2. Birthday must be in MM-DD format
3. Select a committee from dropdown
4. Check for duplicate ID numbers

---

## 🔐 Security Notes

**Important:** This system is designed for local, trusted environments:

- No authentication/authorization
- Admin panel accessible to anyone
- Users can delete other users
- No audit trail for deletions

**For production use, consider adding:**
- Admin password protection
- User roles and permissions
- Audit logging
- Backup automation
- Photo size/format validation

---

## 💡 Tips & Best Practices

1. **Regular Backups**
   - Use `backup_database.bat` regularly
   - Keep attendance.db backed up
   - Store photos separately if needed

2. **Photo Management**
   - Use consistent photo sizes
   - Keep file sizes reasonable (< 1MB)
   - Use clear, professional photos

3. **User Management**
   - Assign correct committees
   - Use full legal names
   - Double-check ID numbers
   - Keep birthday format consistent (MM-DD)

4. **Attendance Monitoring**
   - Check active users regularly
   - Export DTR weekly/monthly
   - Review for any anomalies

---

## 🚀 Future Enhancements

Potential features for future versions:
- Edit user information
- Update photos for existing users
- Custom committee names
- Attendance reports and analytics
- Email notifications
- Mobile app version
- Biometric integration

---

## 📞 Support

For issues or questions:
- Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- Run `python diagnose.py`
- Open GitHub issue
- Email: cabrera.cpaul@gmail.com

---

**Dashboard Version: 2.0**  
**Last Updated: November 12, 2025**
