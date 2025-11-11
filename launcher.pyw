import subprocess
import os
import sys

# Silent launcher for Windows auto-start
# This script runs without showing a console window

# Get the directory where this script is located
script_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(script_dir)

# Start the Flask application without showing console
subprocess.Popen(
    [sys.executable, 'app.py'],
    creationflags=subprocess.CREATE_NO_WINDOW if sys.platform == 'win32' else 0
)