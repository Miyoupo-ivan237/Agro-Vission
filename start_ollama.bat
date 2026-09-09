@echo off
REM Ollama Local AI Server Starter
cls
color 0D
echo.
echo =========================================
echo   AGRO-VISSION OLLAMA LOCAL AI SERVICE
echo =========================================
echo.
echo Checking Ollama status...
curl -s http://127.0.0.1:11434/api/tags >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo.
    echo  [OK] Ollama is ALREADY running and active in the background!
    echo.
    echo  Loaded Models:
    ollama list
    echo.
    echo  AI Agronomist is ready to respond.
    echo.
) else (
    echo Starting Ollama serve...
    ollama serve
)
pause
