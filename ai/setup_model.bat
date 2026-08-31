@echo off
echo ===================================================
echo   CREATING AGRO-VISSION OLLAMA AGRICULTURAL MODEL
echo ===================================================
echo.
ollama create agrovission-agronomist -f "%~dp0Modelfile.agronomist"
echo.
echo Done! Model "agrovission-agronomist" is ready.
pause
