@echo off
REM Colors are not available in cmd, so we use simple text

echo.
echo ========================================
echo   Bombo Admin Backend - Complete Setup
echo ========================================
echo.

REM Check if server folder exists
if not exist "server" (
    echo Error: 'server' folder not found
    echo Make sure to run this script from the root of the project
    exit /b 1
)

echo 1. Installing server dependencies...
cd server

REM Check if package.json exists
if not exist "package.json" (
    echo Error: package.json not found in server folder
    exit /b 1
)

REM Check if pnpm is available
where pnpm >nul 2>nul
if %errorlevel% equ 0 (
    echo Using pnpm
    call pnpm install
) else (
    REM Check if npm is available
    where npm >nul 2>nul
    if %errorlevel% equ 0 (
        echo Using npm
        call npm install
    ) else (
        echo Error: npm or pnpm not found
        exit /b 1
    )
)

if %errorlevel% neq 0 (
    echo Error during server dependencies installation
    exit /b 1
)

echo.
echo Installed server dependencies
echo.

REM Check if .env exists
if not exist ".env" (
    echo Creating .env file...
    copy .env.example .env
    echo File .env created (use default values for dev)
    echo.
) else (
    echo .env file found
    echo.
)

cd ..

echo 2. Installing frontend dependencies...

REM Check if pnpm is available
where pnpm >nul 2>nul
if %errorlevel% equ 0 (
    echo Using pnpm
    call pnpm install
) else (
    REM Check if npm is available
    where npm >nul 2>nul
    if %errorlevel% equ 0 (
        echo Using npm
        call npm install
    ) else (
        echo Error: npm or pnpm not found
        exit /b 1
    )
)

if %errorlevel% neq 0 (
    echo Error during frontend dependencies installation
    exit /b 1
)

echo.
echo ========================================
echo Setup complete!
echo ========================================
echo.

echo To start the application:
echo.
echo Window 1 - Start the backend server:
echo   cd server && npm run dev
echo.
echo Window 2 - Start the frontend:
echo   npm run dev
echo.
echo Then access the application at:
echo   http://localhost:5173
echo.
echo Important notes:
echo   - Backend server runs on http://localhost:3001
echo   - Default admin password is: bombo-admin
echo   - Logs are saved in server/logs/
echo   - For production, change JWT_SECRET in server/.env
echo.
