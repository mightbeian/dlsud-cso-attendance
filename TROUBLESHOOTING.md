# Troubleshooting Guide

## Common Issues and Solutions

### Issue 1: "Failed to Fetch" Error When Timing In/Out

**Symptoms:**
- Clicking "Time In" or "Time Out" shows "Failed to fetch" error
- No response from the server

**Possible Causes & Solutions:**

#### 1. Flask Server Not Running
**Check:** Look at your command prompt where you ran `python app.py`
- You should see: `* Running on http://127.0.0.1:5000`
- If not running, start it: `python app.py`

#### 2. Wrong URL
**Check:** Make sure you're accessing `http://127.0.0.1:5000` (NOT `localhost:5000`)
- Try: `http://127.0.0.1:5000`
- If that doesn't work, try: `http://localhost:5000`

#### 3. Database Not Created
**Solution:**
```bash
# Stop the server (Ctrl+C)
# Delete the database if it exists
del attendance.db  # Windows
rm attendance.db   # Mac/Linux

# Restart the server
python app.py
```

#### 4. Missing Dependencies
**Solution:**
```bash
pip install -r requirements.txt
```

#### 5. Port Already in Use
**Symptoms:** Error: "Address already in use"
**Solution:** Change port in `app.py`:
```python
if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5001)  # Changed to 5001
```
Then access: `http://127.0.0.1:5001`

#### 6. Check Browser Console
1. Press `F12` to open Developer Tools
2. Go to "Console" tab
3. Look for error messages
4. Common errors:
   - `CORS error` - Make sure you're using the same domain
   - `404 Not Found` - Flask server not running
   - `500 Internal Server Error` - Check Flask console for Python errors

---

### Issue 2: Excel Export Not Working

**Symptoms:**
- Clicking "Export DTR" does nothing
- Page doesn't download file
- Shows error in browser

**Possible Causes & Solutions:**

#### 1. No Attendance Records
**Check:** Have you created any attendance records?
**Solution:** Time in/out with a user first, then try exporting

#### 2. openpyxl Not Installed
**Solution:**
```bash
pip install openpyxl
```

#### 3. Exports Folder Permission
**Solution:** Make sure the application has write permissions
```bash
# Windows: Run Command Prompt as Administrator
# Or manually create the folder
mkdir exports
```

#### 4. Browser Blocking Download
**Check:** Browser's download settings
**Solution:**
- Check browser's download bar (bottom of browser)
- Allow downloads from `127.0.0.1`
- Check your Downloads folder

#### 5. Check Flask Console
Look for error messages like:
```
Error in export_dtr: [Errno 13] Permission denied: 'exports/...'
```

---

## Step-by-Step Debugging Process

### For "Failed to Fetch" Error:

1. **Open Command Prompt and run:**
   ```bash
   python app.py
   ```

2. **Check the output:**
   - Should show: `* Running on http://127.0.0.1:5000`
   - Should show: `Sample users added to database.` (first time only)

3. **Open browser to:** `http://127.0.0.1:5000`

4. **Open Developer Console** (Press F12)

5. **Try timing in with:** `20212345`

6. **Check Command Prompt for errors:**
   - Look for Python error messages
   - Look for `Error in time_in:` messages

7. **Check Browser Console for errors:**
   - Look for red error messages
   - Look for "Failed to fetch" details

### For Excel Export Error:

1. **Verify attendance records exist:**
   ```bash
   python view_attendance.py
   ```
   Select option 1 to view all records

2. **Test export manually:**
   - Open browser to: `http://127.0.0.1:5000/api/export-dtr`
   - Should download file immediately

3. **Check Flask console output:**
   - Look for `Error in export_dtr:` messages

4. **Verify exports folder:**
   ```bash
   dir exports      # Windows
   ls exports       # Mac/Linux
   ```

---

## Testing Checklist

Before reporting issues, please test:

- [ ] Flask server is running (`python app.py`)
- [ ] Can access web interface at `http://127.0.0.1:5000`
- [ ] Can see DLSU-D CSO logo and "Attendance System" title
- [ ] Input field accepts text
- [ ] Sample user IDs (20212345, 20212346, 20212347)
- [ ] Browser console shows no errors (F12 → Console)
- [ ] Flask console shows no errors
- [ ] All Python packages installed (`pip list`)

---

## Getting Detailed Error Information

### Enable Debug Mode

The app is already in debug mode with the latest update. Check the Flask console for detailed error messages.

### Check Python Traceback

If you see errors in the Flask console, copy the **full error message** including the traceback.

Example:
```
Traceback (most recent call last):
  File "app.py", line 67, in time_in
    user = User.query.filter_by(id_number=id_number).first()
AttributeError: 'NoneType' object has no attribute 'query'
```

This tells us exactly what went wrong!

---

## Quick Fixes

### Reset Everything

If nothing works, try a fresh start:

```bash
# 1. Stop the server (Ctrl+C)

# 2. Delete database
del attendance.db     # Windows
rm attendance.db      # Mac/Linux

# 3. Reinstall dependencies
pip uninstall Flask Flask-SQLAlchemy openpyxl Werkzeug -y
pip install -r requirements.txt

# 4. Restart
python app.py
```

### Test with curl (Advanced)

Test API directly:
```bash
# Test time-in endpoint
curl -X POST http://127.0.0.1:5000/api/time-in \
  -H "Content-Type: application/json" \
  -d "{\"id_number\":\"20212345\"}"
```

---

## Still Having Issues?

If you're still experiencing problems:

1. **Check the version:**
   ```bash
   python --version
   pip --version
   ```

2. **Copy error messages** from:
   - Flask console (Command Prompt)
   - Browser console (F12 → Console tab)

3. **Report on GitHub:**
   - Go to: https://github.com/mightbeian/dlsud-cso-attendance/issues
   - Create new issue
   - Include:
     - Python version
     - Operating system
     - Full error messages
     - Steps to reproduce

4. **Email:** cabrera.cpaul@gmail.com

---

## Prevention Tips

### Regular Maintenance

1. **Backup database regularly:**
   ```bash
   # Run backup script
   backup_database.bat
   ```

2. **Keep dependencies updated:**
   ```bash
   pip install --upgrade -r requirements.txt
   ```

3. **Monitor Flask console:**
   - Watch for warnings
   - Check for unusual activity

### Best Practices

- Always run Flask from the project directory
- Don't close the Flask console while using the app
- Test after any code changes
- Keep backups of attendance.db

---

**Last Updated:** 2025-11-11
