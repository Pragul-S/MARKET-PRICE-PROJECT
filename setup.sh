#!/bin/bash

# Market-Price Assistant Setup Script
# This script automates the setup of the entire project

set -e

echo "🌾 Market-Price Assistant Setup"
echo "================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check prerequisites
echo "📋 Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js not found. Please install Node.js v18+${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js $(node --version)${NC}"

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm not found. Please install npm${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm $(npm --version)${NC}"

# Check Python
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Python 3 not found. Please install Python 3.9+${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Python $(python3 --version)${NC}"

# Check MongoDB
if ! command -v mongod &> /dev/null; then
    echo -e "${YELLOW}⚠ MongoDB not found locally. Make sure MongoDB is running or use Docker${NC}"
else
    echo -e "${GREEN}✓ MongoDB is installed${NC}"
fi

echo ""
echo "📦 Installing dependencies..."
echo ""

# Backend setup
echo "Setting up Backend..."
cd backend
if [ ! -d "node_modules" ]; then
    npm install
    echo -e "${GREEN}✓ Backend dependencies installed${NC}"
else
    echo -e "${GREEN}✓ Backend dependencies already installed${NC}"
fi

# Copy env file if not exists
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo -e "${GREEN}✓ Created .env file (update with your values)${NC}"
fi
cd ..

# Frontend setup
echo "Setting up Frontend..."
cd frontend
if [ ! -d "node_modules" ]; then
    npm install
    echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
else
    echo -e "${GREEN}✓ Frontend dependencies already installed${NC}"
fi

# Copy env file if not exists
if [ ! -f ".env.local" ]; then
    cp .env.example .env.local
    echo -e "${GREEN}✓ Created .env.local file${NC}"
fi
cd ..

# ML Model setup
echo "Setting up ML Model..."
cd ml-model
if [ ! -d "venv" ]; then
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    echo -e "${GREEN}✓ ML Model dependencies installed${NC}"
else
    echo -e "${GREEN}✓ ML Model environment already exists${NC}"
fi

# Copy env file if not exists
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo -e "${GREEN}✓ Created .env file for ML Model${NC}"
fi
cd ..

echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "📝 Next steps:"
echo ""
echo "1. Update configuration files:"
echo "   - backend/.env"
echo "   - frontend/.env.local"
echo "   - ml-model/.env"
echo ""
echo "2. Start MongoDB (if not using Docker):"
echo "   - Windows: Start MongoDB Service"
echo "   - macOS: brew services start mongodb-community"
echo "   - Linux: sudo systemctl start mongod"
echo ""
echo "3. Start development servers in separate terminals:"
echo ""
echo "   Terminal 1 (Backend):"
echo "   cd backend && npm run dev"
echo ""
echo "   Terminal 2 (Frontend):"
echo "   cd frontend && npm run dev"
echo ""
echo "   Terminal 3 (ML Model):"
echo "   cd ml-model && source venv/bin/activate && python app.py"
echo ""
echo "4. Access the application:"
echo "   - Frontend: http://localhost:3000"
echo "   - Backend API: http://localhost:5000"
echo "   - ML API: http://localhost:5001"
echo ""
echo "📖 For detailed setup instructions, see docs/SETUP.md"
echo ""
