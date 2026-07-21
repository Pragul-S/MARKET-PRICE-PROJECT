# Installation & Setup Guide

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **Python** (v3.9 or higher) - [Download](https://www.python.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Docker & Docker Compose** (Optional) - [Download](https://www.docker.com/)
- **Git** - [Download](https://git-scm.com/)

## Quick Start with Docker (Recommended)

### 1. Clone and Navigate to Project
```bash
cd market-price-assistant
```

### 2. Start All Services with Docker Compose
```bash
docker-compose up -d
```

This will start:
- MongoDB on `localhost:27017`
- Backend API on `localhost:5000`
- Frontend on `localhost:3000`
- ML Model API on `localhost:5001`

### 3. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **ML API**: http://localhost:5001

### 4. Stop Services
```bash
docker-compose down
```

---

## Manual Setup

### Backend Setup

#### 1. Install Dependencies
```bash
cd backend
npm install
```

#### 2. Configure Environment
```bash
cp .env.example .env
```

Edit `.env` file:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/market_price_db
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
ML_MODEL_URL=http://localhost:5001
CORS_ORIGIN=http://localhost:3000
```

#### 3. Build TypeScript
```bash
npm run build
```

#### 4. Start Backend
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

---

### Frontend Setup

#### 1. Install Dependencies
```bash
cd frontend
npm install
```

#### 2. Configure Environment
```bash
cp .env.example .env
```

Edit `.env` file:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

#### 3. Start Frontend
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

---

### ML Model Setup

#### 1. Install Python Dependencies
```bash
cd ml-model
pip install -r requirements.txt
```

#### 2. Configure Environment
```bash
cp .env.example .env
```

Edit `.env` file:
```
FLASK_ENV=development
PORT=5001
MONGODB_URI=mongodb://localhost:27017/market_price_db
```

#### 3. Start ML Model API
```bash
python app.py
```

ML API will run on `http://localhost:5001`

---

## Database Setup

### Option 1: MongoDB Local Installation

1. **Install MongoDB**:
   - Follow official MongoDB installation guide for your OS
   - Ensure MongoDB service is running

2. **Create Database and User**:
```bash
# Start MongoDB shell
mongosh

# Create database
use market_price_db

# Create admin user (if needed)
db.createUser({
  user: "admin",
  pwd: "admin123",
  roles: ["dbOwner"]
})

# Exit shell
exit
```

### Option 2: MongoDB Atlas (Cloud)

1. **Create Account**: https://www.mongodb.com/cloud/atlas
2. **Create Cluster**: Follow Atlas setup wizard
3. **Get Connection String**: Copy from Atlas dashboard
4. **Update `.env` files**:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/market_price_db
```

---

## Initial Data Setup

### Add Sample Vegetables to Database

Use the backend API to add vegetables:

```bash
curl -X POST http://localhost:5000/api/vegetables/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Tomato",
    "nameInTamil": "தக்காளி",
    "category": "Vegetables",
    "description": "Fresh red tomatoes",
    "unit": "kg"
  }'
```

Or use the React frontend to add them through the UI.

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (Requires auth)
- `PUT /api/auth/profile` - Update profile (Requires auth)

### Vegetables
- `GET /api/vegetables` - Get all vegetables
- `GET /api/vegetables/:id` - Get vegetable by ID
- `GET /api/vegetables/search?query=tomato` - Search vegetables
- `POST /api/vegetables/add` - Add new vegetable (Requires auth)

### Prices
- `GET /api/prices/market` - Get market prices
- `GET /api/prices/trend?vegetableId=X&days=30` - Get price trend
- `POST /api/prices/add` - Add new price (Dealer only)
- `GET /api/prices/predictions` - Get price predictions
- `POST /api/prices/predict` - Request AI prediction

### ML Model
- `GET /predict` - Get price prediction
- `POST /train` - Retrain model with latest data
- `GET /stats` - Get model statistics

---

## Testing

### Test Login Workflow

```bash
# 1. Register as Farmer
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Farmer",
    "email": "farmer@example.com",
    "password": "password123",
    "phone": "9876543210",
    "role": "farmer",
    "location": "Chennai",
    "farmDetails": "5 acres of mixed vegetables",
    "registrationNumber": "FARM001"
  }'

# 2. Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "farmer@example.com",
    "password": "password123"
  }'

# Response will include token - save it for next requests
```

---

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port
# On Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# On macOS/Linux
lsof -i :5000
kill -9 <PID>
```

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
# Windows: Check Services
# macOS: brew services list
# Linux: systemctl status mongod

# Test connection
mongosh "mongodb://admin:admin123@localhost:27017"
```

### CORS Issues
- Ensure `CORS_ORIGIN` in backend `.env` matches frontend URL
- Clear browser cache and cookies

### Module Not Found Errors
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# For Python
pip install --upgrade pip
pip install -r requirements.txt
```

---

## Production Deployment

### Environment Variables
Update all `.env` files with production values:
```
NODE_ENV=production
JWT_SECRET=<strong-secret>
MONGODB_URI=<production-mongodb-uri>
NEXT_PUBLIC_API_URL=<production-api-url>
ML_MODEL_URL=<production-ml-url>
```

### Deploy with Docker
```bash
# Build images
docker-compose build

# Deploy
docker-compose -f docker-compose.prod.yml up -d
```

### SSL/TLS
- Use Let's Encrypt for HTTPS
- Configure reverse proxy (Nginx/Apache)
- Update CORS and API URLs to use HTTPS

---

## Support

For issues or questions:
1. Check the README.md in each folder
2. Review error logs in console
3. Check MongoDB logs for database issues
4. Ensure all services are running on correct ports

---

## License

MIT License - See LICENSE file for details
