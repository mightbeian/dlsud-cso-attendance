@echo off
REM ========================================
REM DLSU-D CSO Attendance Database Backup
REM ========================================

REM Configuration
set PROJECT_PATH=%~dp0
set BACKUP_PATH=%PROJECT_PATH%backups
set TIMESTAMP=%date:~10,4%%date:~4,2%%date:~7,2%_%time:~0,2%%time:~3,2%%time:~6,2%
set TIMESTAMP=%TIMESTAMP: =0%

REM Create backup directory if it doesn't exist
if not exist "%BACKUP_PATH%" (
    mkdir "%BACKUP_PATH%"
    echo Created backup directory: %BACKUP_PATH%
)

REM Check if database exists
if not exist "%PROJECT_PATH%attendance.db" (
    echo ERROR: Database file not found!
    echo Looking for: %PROJECT_PATH%attendance.db
    pause
    exit /b 1
)

REM Create backup
echo Backing up database...
copy "%PROJECT_PATH%attendance.db" "%BACKUP_PATH%\attendance_%TIMESTAMP%.db" > nul

if %ERRORLEVEL% EQU 0 (
    echo SUCCESS: Backup created successfully!
    echo File: attendance_%TIMESTAMP%.db
    echo Location: %BACKUP_PATH%
) else (
    echo ERROR: Backup failed!
    pause
    exit /b 1
)

REM Optional: Delete backups older than 30 days
REM Uncomment the following line to enable auto-deletion
REM forfiles /P "%BACKUP_PATH%" /M *.db /D -30 /C "cmd /c del @path" 2>nul

echo.
echo Backup completed at %date% %time%
echo.

REM Uncomment to keep window open
REM pause
