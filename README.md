# DLSU-D CSO Attendance System

A lightweight, standalone web-based attendance system for the DLSU-D Council of Student Organizations (CSO). This system runs locally on a single office computer and provides reliable time tracking with birthday greetings and Excel DTR export functionality.

![DLSU Green](https://img.shields.io/badge/DLSU-Green-00693C?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-3.0.0-000000?style=for-the-badge&logo=flask&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-Local-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

## Features

✅ **Simple Time In/Time Out Interface** - Clean, user-friendly single-page application  
✅ **Automatic Birthday Greetings** - Special messages for users on their birthday  
✅ **Excel DTR Export** - Generate formatted Daily Time Records with total hours  
✅ **State-Aware Tracking** - Prevents duplicate time-ins and tracks user status  
✅ **Local SQLite Database** - Reliable, file-based database with no external dependencies  
✅ **Professional DLSU Theme** - Minimalist design in official DLSU Green (#00693C)  
✅ **Auto-Start on Boot** - Configure to launch automatically when computer starts  
✅ **Utility Scripts** - Helper scripts for managing users and viewing records

## Quick Start

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/mightbeian/dlsud-cso-attendance.git
cd dlsud-cso-attendance

# 2. Install dependencies
pip install -r requirements.txt

# 3. Run the application
python app.py
```

Then open your browser to: **http://127.0.0.1:5000**

### Test with Sample Users

The system includes 3 pre-loaded test accounts:

| ID Number | Name | Birthday |
|-----------|------|----------|
| 20212345 | Juan Dela Cruz | January 15 |
| 20212346 | Maria Santos | March 22 |
| 20212347 | Pedro Reyes | July 8 |

## Technology Stack

| Component | Technology |
|-----------|------------|
| **Backend** | Python Flask 3.0.0 |
| **Database** | SQLite (serverless) |
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Excel Export** | openpyxl 3.1.2 |
| **ORM** | Flask-SQLAlchemy 3.1.1 |

## Usage

### Time In
1. Enter your ID Number
2. Click **"TIME IN"**
3. See welcome message (or birthday greeting!)

### Time Out
1. Enter your ID Number
2. Click **"TIME OUT"**
3. See goodbye message

### Export DTR
- Click **"Export DTR"** at the bottom
- Download Excel file with attendance records

## Managing Users

### Using the Helper Script

```bash
python add_users.py
```

### Adding Users Manually

Edit `add_users.py` and modify the `users_to_add` list:

```python
users_to_add = [
    {
        'id_number': '20212348',
        'full_name': 'Anna Reyes',
        'birthday': '12-25'  # Format: MM-DD
    },
]
```

## Auto-Start on Windows

### Method 1: Startup Folder (Easiest)

1. Right-click `start_attendance.bat` → Create shortcut
2. Press `Win + R`, type `shell:startup`
3. Move shortcut to Startup folder
4. Right-click shortcut → Properties → Run: Minimized

### Method 2: Task Scheduler (Most Reliable)

1. Open Task Scheduler (`Win + R` → `taskschd.msc`)
2. Create Basic Task
3. Trigger: "When the computer starts"
4. Action: Start program → Python executable
5. Arguments: `app.py`
6. Start in: Project directory

**See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed instructions**

## Troubleshooting

### Quick Diagnostics

Run the diagnostic script to check your setup:

```bash
python diagnose.py
```

This will check:
- Python version compatibility
- Required dependencies
- Project files and folders
- Database connectivity

### Common Issues

**"Failed to fetch" when timing in/out:**
- Ensure Flask server is running: `python app.py`
- Access the correct URL: `http://127.0.0.1:5000`
- Check browser console (F12) for errors
- See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for detailed solutions

**Excel export not working:**
- Verify openpyxl is installed: `pip install openpyxl`
- Check if you have attendance records
- Try accessing directly: `http://127.0.0.1:5000/api/export-dtr`

**Application won't start:**
- Check Python version: `python --version` (need 3.8+)
- Install dependencies: `pip install -r requirements.txt`
- Check if port 5000 is available

**For detailed troubleshooting, see [TROUBLESHOOTING.md](TROUBLESHOOTING.md)**

## Project Structure

```
dlsud-cso-attendance/
├── app.py                     # Main Flask application
├── database.py                # Database models
├── requirements.txt           # Dependencies
├── diagnose.py               # Diagnostic tool
│
├── add_users.py              # User management
├── view_attendance.py        # View records
├── backup_database.bat       # Database backup
│
├── start_attendance.bat      # Batch launcher
├── launcher.pyw              # Silent launcher
│
├── templates/
│   └── index.html            # Main UI
│
├── static/
│   ├── style.css             # Styling
│   └── script.js             # Client logic
│
├── README.md                 # This file
├── SETUP_GUIDE.md            # Detailed setup instructions
└── TROUBLESHOOTING.md        # Troubleshooting guide
```

## Database Schema

### Users Table
- `id` - Primary key
- `id_number` - Student/Employee ID (unique)
- `full_name` - Full name
- `birthday` - Format: MM-DD

### Attendance Table
- `id` - Primary key
- `user_id` - Foreign key to Users
- `timestamp` - Event date/time
- `event_type` - "In" or "Out"

## Security Notes

⚠️ **This is a local-only application** for internal office use.  
- No authentication (designed for trusted environment)
- Runs on localhost only (127.0.0.1)
- Not intended for public deployment

For production deployment considerations, see [SETUP_GUIDE.md](SETUP_GUIDE.md)

## Documentation

- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Detailed installation and configuration
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Common issues and solutions
- **[LICENSE](LICENSE)** - MIT License

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see [LICENSE](LICENSE) file

## Author

**Christian Paul Cabrera**
- GitHub: [@mightbeian](https://github.com/mightbeian)
- LinkedIn: [mightbeian](https://www.linkedin.com/in/mightbeian/)

## Support

Having issues? 
1. Run `python diagnose.py` for automated checks
2. Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
3. Open an issue on GitHub
4. Email: cabrera.cpaul@gmail.com

---

**Made with ❤️ for DLSU-D CSO**
