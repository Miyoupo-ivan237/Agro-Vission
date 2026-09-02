@echo off
REM Expo Mobile App Starter - SHOWS QR CODE
cd /d "%~dp0expo-mobile"

cls
color 06
echo.
echo ╔════════════════════════════════════════╗
echo ║                                        ║
echo ║  PACNOVA MOBILE APP - EXPO QR CODE    ║
echo ║                                        ║
echo ║  📱 Scan QR Code with Expo Go App     ║
echo ║                                        ║
echo ║  ✓ Phone on same WiFi as PC          ║
echo ║  ✓ Connection via LAN (192.168.1.81) ║
echo ║                                        ║
echo ╚════════════════════════════════════════╝
echo.
echo Starting Expo in a few seconds...
echo.
timeout /t 2 /nobreak

echo.
echo ════════════════════════════════════════
echo QR CODE APPEARS BELOW:
echo ════════════════════════════════════════
echo.

set REACT_NATIVE_PACKAGER_HOSTNAME=192.168.1.81

npm start

pause
