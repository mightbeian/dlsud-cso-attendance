# DLSU-D CSO Attendance System 2.0

**A modern, feature-rich attendance dashboard for the DLSU-D Council of Student Organizations**

![DLSU Green](https://img.shields.io/badge/DLSU-Green-00693C?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-3.0.0-000000?style=for-the-badge&logo=flask&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-Local-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

---

## 🎉 Version 2.0 - Major Update!

Complete dashboard redesign with advanced features:
- ✨ Modern dashboard interface
- 🎯 Single-action attendance (just press ENTER!)
- 📸 User photo display
- 👥 Live active users sidebar
- 🔍 Real-time search
- 🎛️ Comprehensive admin panel
- 📊 Real-time statistics

**[See all new features →](DASHBOARD_FEATURES.md)**

---

## ✨ Key Features

### For Users
- **One-Key Attendance** - Just enter ID and press ENTER (no buttons!)
- **Auto-Detection** - System knows if you're timing in or out
- **Photo Display** - See your photo when you log in
- **Birthday Greetings** - Special messages on your birthday
- **Live Sidebar** - See who's currently logged in by committee

### For Administrators  
- **Web-Based User Management** - Add/delete users through dashboard
- **Photo Upload** - Add profile pictures for each user
- **Advanced Search** - Find users instantly
- **Excel Export** - Generate DTR reports with committee info
- **Real-Time Monitoring** - Live statistics and active user tracking

### Committee Organization
Users organized by:
- Executive Board
- Externals
- Internals
- Visuals and Marketing
- Finance
- Admin & Productions

---

## 🚀 Quick Start

### Installation

```bash
# 1. Clone repository
git clone https://github.com/mightbeian/dlsud-cso-attendance.git
cd dlsud-cso-attendance

# 2. Install dependencies
pip install -r requirements.txt

# 3. Run the application
python app.py
```

Open browser to: **http://127.0.0.1:5000**

### Upgrading from v1.0

If you have the old version with existing data:

```bash
# Run migration script (preserves data)
python migrate_database.py

# Then restart the app
python app.py
```

---

## 📖 Usage

### Logging Attendance

1. Type your ID number
2. Press **ENTER**
3. Done! (System automatically detects Time In/Out)

### Admin Functions

Click **"Admin"** button for:
- **Export DTR** - Download Excel reports
- **Add User** - Create new users with photos
- **Manage Users** - View, search, and delete users

**[Detailed usage guide →](DASHBOARD_FEATURES.md)**

---

## 🎨 Dashboard Preview

```
┌──────────────────────────────────────────────────────────┐
│  DLSU-D CSO  Attendance System  [Search] [Admin]        │
├────────────┬─────────────────────────────────────────────┤
│            │                                             │
│ ACTIVE     │        [User Photo Displayed Here]         │
│ USERS      │                                             │
│            │   ┌──────────────────────────────────────┐ │
│ Exec (2)   │   │ Enter ID and Press ENTER             │ │
│ • Juan     │   └──────────────────────────────────────┘ │
│ • Maria    │                                             │
│            │   [Welcome Message Here]                    │
│ External   │                                             │
│ (1)        │   ┌────┐  ┌────┐  ┌────┐                 │
│ • Pedro    │   │ 15 │  │ 8  │  │Time│                 │
│            │   │User│  │In  │  │ Now│                 │
│ (Other     │   └────┘  └────┘  └────┘                 │
│ committees)│                                             │
└────────────┴─────────────────────────────────────────────┘
```

---

## 📦 What's Included

```
dlsud-cso-attendance/
├── app.py                      # Main application (enhanced)
├── database.py                 # Database models (updated)
├── migrate_database.py         # Migration script
├── requirements.txt            # Dependencies
│
├── templates/
│   ├── index.html             # Old simple interface
│   └── dashboard.html         # ✨ New dashboard interface
│
├── static/
│   ├── style.css              # Old styling
│   ├── script.js              # Old JavaScript
│   ├── dashboard.css          # ✨ New dashboard styling
│   ├── dashboard.js           # ✨ New dashboard logic
│   └── photos/                # ✨ User profile photos
│
├── README.md                  # This file
├── DASHBOARD_FEATURES.md      # ✨ Complete feature guide
├── SETUP_GUIDE.md            # Installation guide
├── TROUBLESHOOTING.md        # Problem solving
│
└── (utility scripts...)
```

---

## 🔧 Technology Stack

| Component | Technology |
|-----------|------------|
| **Backend** | Python Flask 3.0.0 |
| **Database** | SQLite with SQLAlchemy ORM |
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **UI Framework** | Custom responsive design |
| **Icons** | Font Awesome 6.4.0 |
| **File Uploads** | Werkzeug secure filename |
| **Excel Export** | openpyxl 3.1.2 |

---

## 🗄️ Database Schema

### Users Table
```sql
- id                (Primary Key)
- id_number         (Unique, e.g., "20212345")
- full_name         (Full name)
- birthday          (MM-DD format)
- committee         (Executive committee) ✨ NEW
- photo_filename    (Photo file path) ✨ NEW
```

### Attendance Table
```sql
- id                (Primary Key)
- user_id           (Foreign Key → Users)
- timestamp         (Date & time)
- event_type        ("In" or "Out")
```

---

## 🎯 Key Improvements in v2.0

### UX Enhancements
- ✅ Removed Time In/Out buttons (just press ENTER)
- ✅ Auto-detect time in vs time out
- ✅ Live active user monitoring
- ✅ Real-time statistics
- ✅ User photo display

### Admin Features
- ✅ Web-based user management
- ✅ In-dashboard user creation
- ✅ Photo upload support
- ✅ Advanced search functionality
- ✅ User deletion with confirmation

### Visual Improvements
- ✅ Modern dashboard layout
- ✅ Sidebar with active users
- ✅ Top navigation bar
- ✅ Statistics cards
- ✅ Professional modal dialogs
- ✅ Responsive design

---

## 🔍 Quick Diagnostics

```bash
# Check system health
python diagnose.py

# View current users
python add_users.py
# Select option 2

# View attendance records
python view_attendance.py
```

---

## 📚 Documentation

- **[DASHBOARD_FEATURES.md](DASHBOARD_FEATURES.md)** - Complete feature documentation
- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Detailed installation guide
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Common issues & solutions

---

## 🔐 Security Considerations

**⚠️ Local use only** - Not designed for public deployment

Current limitations:
- No authentication/authorization
- Open admin access
- No audit logging
- Local network only

For production deployment, add:
- Admin password protection
- User authentication
- Role-based access control
- Audit trail
- HTTPS/SSL

---

## 🎓 Committee Structure

The system organizes users into 6 committees:

1. **Executive Board** - Leadership
2. **Externals** - External relations
3. **Internals** - Internal affairs
4. **Visuals and Marketing** - Creative
5. **Finance** - Financial management
6. **Admin & Productions** - Support

Each committee is tracked separately in the sidebar.

---

## 🐛 Troubleshooting

**Dashboard not loading:**
```bash
# Check if Flask is running
python app.py

# Access correct URL
http://127.0.0.1:5000
```

**Can't add users:**
- Ensure all required fields are filled
- Birthday must be MM-DD format
- ID numbers must be unique

**Photos not showing:**
- Check `static/photos/` exists
- Verify file was uploaded
- Max size: 5MB

**[Full troubleshooting guide →](TROUBLESHOOTING.md)**

---

## 🚀 Auto-Start on Windows

**[Complete setup instructions →](SETUP_GUIDE.md)**

Quick method:
1. Create shortcut of `start_attendance.bat`
2. Press `Win + R`, type `shell:startup`
3. Move shortcut to Startup folder

---

## 📊 Sample Users (Testing)

| ID | Name | Committee | Birthday |
|----|------|-----------|----------|
| 20212345 | Juan Dela Cruz | Executive Board | Jan 15 |
| 20212346 | Maria Santos | Externals | Mar 22 |
| 20212347 | Pedro Reyes | Internals | Jul 8 |

---

## 🤝 Contributing

Contributions welcome! Areas for improvement:
- Edit user functionality
- Mobile responsive optimizations
- Additional reports/analytics
- Email notifications
- Enhanced security features

---

## 📄 License

MIT License - see [LICENSE](LICENSE)

---

## 👤 Author

**Christian Paul Cabrera**
- GitHub: [@mightbeian](https://github.com/mightbeian)
- LinkedIn: [mightbeian](https://www.linkedin.com/in/mightbeian/)
- Email: cabrera.cpaul@gmail.com

---

## 🙏 Support

Having issues?
1. Run `python diagnose.py`
2. Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
3. Check [DASHBOARD_FEATURES.md](DASHBOARD_FEATURES.md)
4. Open GitHub issue
5. Email for support

---

## 📝 Changelog

### Version 2.0 (Current)
- Complete dashboard redesign
- Single-action attendance (ENTER key only)
- User photo support
- Live active users sidebar
- Web-based admin panel
- Real-time search
- Committee organization
- Enhanced statistics

### Version 1.0
- Basic time in/out system
- Simple interface
- Excel export
- Birthday greetings

---

**Made with ❤️ for DLSU-D CSO**

**Dashboard Version 2.0** | **November 12, 2025**
