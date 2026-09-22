@echo off
REM Expo Mobile App Starter - DEVELOPMENT CLIENT
cd /d "%~dp0expo-mobile"

cls
color 06
echo.
echo ╔════════════════════════════════════════╗
echo ║                                        ║
echo ║  AGRO-VISSION MOBILE APP - DEV CLIENT  ║
echo ║                                        ║
echo ║  📱 Open the installed AGROVISSION app ║
echo ║                                        ║
echo ║  ✓ Phone on same WiFi as PC          ║
echo ║  ✓ Auto LAN ^& Offline AI Ready        ║
echo ║                                        ║
echo ╚════════════════════════════════════════╝
echo.
echo Starting Metro for the development app...
echo.
timeout /t 2 /nobreak

echo.
echo ════════════════════════════════════════
echo Metro connection appears below:
echo ════════════════════════════════════════
echo.

npx expo start --dev-client --clear --lan --port 8082

pause
