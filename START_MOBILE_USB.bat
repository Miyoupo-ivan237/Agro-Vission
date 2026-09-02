@echo off
cd /d "%~dp0expo-mobile"
set EXPO_OFFLINE=1
set EXPO_PUBLIC_API_URL=http://127.0.0.1:5000
call npx --no-install expo start --localhost --port 8082
pause
