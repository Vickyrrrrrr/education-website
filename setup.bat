@echo off
echo.
echo 🚀 ClassHub Installation Setup
echo ==============================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed.
    echo Please install Node.js v14 or higher from https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js is installed:
node --version

echo ✅ npm is installed:
npm --version

echo.
echo 📦 Installing dependencies...
call npm install

if errorlevel 1 (
    echo ❌ Installation failed. Please check the error messages above.
    pause
    exit /b 1
)

echo.
echo ✅ Installation complete!
echo.
echo 🎉 To start the development server, run:
echo    npm start
echo.
echo 📚 To build for production, run:
echo    npm run build
echo.
echo 📖 For more information, see README_CLASSHUB.md
echo.
pause
