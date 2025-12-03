@echo off
title DLSU-D CSO Attendance System

:: ============================================
:: DLSU-D CSO Attendance System Startup Script
:: ============================================
:: This script starts the attendance system
:: and opens the browser automatically.
::
:: INSTRUCTIONS:
:: 1. Edit the path below if your installation
::    is in a different location
:: 2. Add a shortcut to this file in:
::    shell:startup (type in Run dialog)
:: ============================================

:: Set your installation path here
set INSTALL_PATH=C:\CSO-Attendance

:: Change to installation directory
cd /d %INSTALL_PATH%

:: Wait a moment for system to be ready
timeout /t 3 /nobreak > nul

:: Open browser to the application
start "" "http://localhost:5000"

:: Start the Flask application
echo.
echo ====================================================
echo   DLSU-D CSO Attendance System
echo ====================================================
echo.
echo   Server starting...
echo   Open your browser to: http://localhost:5000
echo.
echo   Press Ctrl+C to stop the server
echo.
echo ====================================================
echo.

python app.py

:: If python exits, pause to show any errors
pause
