@echo off
REM Market-Price Assistant Setup Script for Windows
REM This script automates the setup of the entire project

echo 🌾 Market-Price Assistant Setup
echo =================================
echo.

REM Check Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js not found. Please install Node.js v18+
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✓ Node.js %NODE_VERSION%

REM Check npm
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ npm not found. Please install npm
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo ✓ npm %NPM_VERSION%

REM Check Python
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Python not found. Please install Python 3.9+
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('python --version') do set PYTHON_VERSION=%%i
echo ✓ %PYTHON_VERSION%

echo.
echo 📦 Installing dependencies...
echo.

REM Backend setup
echo Setting up Backend...
cd backend
if not exist "node_modules" (
    call npm install
    echo ✓ Backend dependencies installed
) else (
    echo ✓ Backend dependencies already installed
)

if not exist ".env" (
    copy .env.example .env
    echo ✓ Created .env file
)
cd ..

REM Frontend setup
echo Setting up Frontend...
cd frontend
if not exist "node_modules" (
    call npm install
    echo ✓ Frontend dependencies installed
) else (
    echo ✓ Frontend dependencies already installed
)

if not exist ".env.local" (
    copy .env.example .env.local
    echo ✓ Created .env.local file
)
cd ..

REM ML Model setup
echo Setting up ML Model...
cd ml-model
if not exist "venv" (
    python -m venv venv
    call venv\Scripts\activate.bat
    pip install -r requirements.txt
    echo ✓ ML Model dependencies installed
) else (
    echo ✓ ML Model environment already exists
)

if not exist ".env" (
    copy .env.example .env
    echo ✓ Created .env file for ML Model
)
cd ..

echo.
echo ✅ Setup complete!
echo.
echo 📝 Next steps:
echo.
echo 1. Update configuration files:
echo    - backend\.env
echo    - frontend\.env.local
echo    - ml-model\.env
echo.
echo 2. Start MongoDB (if not using Docker):
echo    - Open Services and start MongoDB
echo    - Or use MongoDB Atlas (cloud)
echo.
echo 3. Start development servers in separate terminals:
echo.
echo    Terminal 1 (Backend):
echo    cd backend
echo    npm run dev
echo.
echo    Terminal 2 (Frontend):
echo    cd frontend
echo    npm run dev
echo.
echo    Terminal 3 (ML Model):
echo    cd ml-model
echo    venv\Scripts\activate.bat
echo    python app.py
echo.
echo 4. Access the application:
echo    - Frontend: http://localhost:3000
echo    - Backend API: http://localhost:5000
echo    - ML API: http://localhost:5001
echo.
echo 📖 For detailed instructions, see docs/SETUP.md
echo.
pause
