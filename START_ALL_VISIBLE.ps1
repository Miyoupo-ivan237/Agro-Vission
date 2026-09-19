# Agro-Vission Ecosystem Launcher - With Visible Terminals & QR Code
Write-Host "╔══════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║  STARTING AGRO-VISSION ECOSYSTEM               ║" -ForegroundColor Green
Write-Host "║  Backend + Mobile + AI Services                ║" -ForegroundColor Green
Write-Host "╚══════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""

$rootDir = Split-Path -Parent $MyInvocation.MyCommand.Path
if (-not $rootDir) { $rootDir = "C:\Users\FixUser\Desktop\Agro-Vission" }

Write-Host "📍 Detected Root: $rootDir" -ForegroundColor Cyan
Write-Host ""

# Start Ollama AI Service
Write-Host "🦙 [1/3] Starting Ollama Local AI Service..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoProfile -ExecutionPolicy Bypass -NoExit -Command `"Write-Host '═════════════════════════════════════════' -ForegroundColor Magenta; Write-Host '  OLLAMA LOCAL AI SERVICE' -ForegroundColor Magenta; Write-Host '═════════════════════════════════════════' -ForegroundColor Magenta; Write-Host ''; ollama serve`"" -WindowStyle Normal
Start-Sleep -Seconds 3

# Start Backend Server
Write-Host "🖥️  [2/3] Starting Backend Server (Port 5000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoProfile -ExecutionPolicy Bypass -NoExit -Command `"Set-Location '$rootDir\backend'; Write-Host '═════════════════════════════════════════' -ForegroundColor Green; Write-Host '  AGRO-VISSION BACKEND SERVER' -ForegroundColor Green; Write-Host '═════════════════════════════════════════' -ForegroundColor Green; Write-Host 'Database: PostgreSQL' -ForegroundColor Cyan; Write-Host 'API URL: http://192.168.42.199:5000' -ForegroundColor Cyan; Write-Host ''; node src/index.js`"" -WindowStyle Normal
Start-Sleep -Seconds 2

# Start Expo Mobile App
Write-Host "📱 [3/3] Launching Expo Mobile App with QR Code..." -ForegroundColor Yellow
Write-Host ""
Start-Process powershell -ArgumentList "-NoProfile -ExecutionPolicy Bypass -NoExit -Command `"Set-Location '$rootDir\expo-mobile'; Write-Host ''; Write-Host '╔════════════════════════════════════════╗' -ForegroundColor Cyan; Write-Host '║                                        ║' -ForegroundColor Cyan; Write-Host '║  AGRO-VISSION MOBILE APP - EXPO QR     ║' -ForegroundColor Cyan; Write-Host '║                                        ║' -ForegroundColor Cyan; Write-Host '║  📱 Scan QR Code with Expo Go App      ║' -ForegroundColor Cyan; Write-Host '║                                        ║' -ForegroundColor Cyan; Write-Host '║  ✓ Phone on same WiFi as PC            ║' -ForegroundColor Cyan; Write-Host '║  ✓ Auto LAN & Offline AI Ready         ║' -ForegroundColor Cyan; Write-Host '║                                        ║' -ForegroundColor Cyan; Write-Host '╚════════════════════════════════════════╝' -ForegroundColor Cyan; Write-Host ''; npm start`"" -WindowStyle Normal

# Display Status
Write-Host ""
Write-Host "╔══════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   ✓ AGRO-VISSION SERVICES LAUNCHING...          ║" -ForegroundColor Cyan
Write-Host "║                                                  ║" -ForegroundColor Cyan
Write-Host "║   Three terminal windows will open:             ║" -ForegroundColor Cyan
Write-Host "║                                                  ║" -ForegroundColor Cyan
Write-Host "║   🦙 Window 1: Ollama AI Service               ║" -ForegroundColor Cyan
Write-Host "║      (Local LLM for agronomist questions)       ║" -ForegroundColor Cyan
Write-Host "║                                                  ║" -ForegroundColor Cyan
Write-Host "║   🖥️  Window 2: Backend Server                 ║" -ForegroundColor Cyan
Write-Host "║      (Port 5000 + PostgreSQL Database)         ║" -ForegroundColor Cyan
Write-Host "║                                                  ║" -ForegroundColor Cyan
Write-Host "║   📱 Window 3: Expo Mobile App (QR CODE)       ║" -ForegroundColor Cyan
Write-Host "║      🔍 LOOK FOR THE QR CODE HERE!            ║" -ForegroundColor Cyan
Write-Host "║      Scan with Expo Go mobile app              ║" -ForegroundColor Cyan
Write-Host "║                                                  ║" -ForegroundColor Cyan
Write-Host "╠══════════════════════════════════════════════════╣" -ForegroundColor Cyan
Write-Host "║   QUICK START ON PHONE:                          ║" -ForegroundColor Cyan
Write-Host "║                                                  ║" -ForegroundColor Cyan
Write-Host "║   1. Install Expo Go app (iOS/Android)         ║" -ForegroundColor Cyan
Write-Host "║   2. Connect phone to same WiFi network        ║" -ForegroundColor Cyan
Write-Host "║   3. Open Expo Go and scan the QR code         ║" -ForegroundColor Cyan
Write-Host "║   4. App loads from 192.168.42.199:5000        ║" -ForegroundColor Cyan
Write-Host "║                                                  ║" -ForegroundColor Cyan
Write-Host "╠══════════════════════════════════════════════════╣" -ForegroundColor Cyan
Write-Host "║   KEYBOARD SHORTCUTS:                            ║" -ForegroundColor Cyan
Write-Host "║                                                  ║" -ForegroundColor Cyan
Write-Host "║   In Expo Window:                                ║" -ForegroundColor Cyan
Write-Host "║   - Press 'r' to reload app                     ║" -ForegroundColor Cyan
Write-Host "║   - Press 'c' to clear cache                    ║" -ForegroundColor Cyan
Write-Host "║   - Press 'q' to quit                            ║" -ForegroundColor Cyan
Write-Host "║                                                  ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 Press Ctrl+C in any window to stop that service" -ForegroundColor Yellow
Write-Host ""
