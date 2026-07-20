# Quick Start Guide

Get the Market-Price Assistant running in minutes!

## For Windows Users ⊞

### Quick Setup (5 minutes)

1. **Open Command Prompt** or PowerShell
2. **Navigate to project folder**:
   ```bash
   cd market-price-assistant
   ```
3. **Run setup script**:
   ```bash
   setup.bat
   ```
4. **Start services in 3 terminals**:
   - Terminal 1: `cd backend && npm run dev`
   - Terminal 2: `cd frontend && npm run dev`
   - Terminal 3: `cd ml-model && venv\Scripts\activate.bat && python app.py`

5. **Open browser**: http://localhost:3000

---

## For macOS/Linux Users 🐧

### Quick Setup (5 minutes)

1. **Open Terminal**
2. **Navigate to project folder**:
   ```bash
   cd market-price-assistant
   ```
3. **Make script executable**:
   ```bash
   chmod +x setup.sh
   ```
4. **Run setup script**:
   ```bash
   ./setup.sh
   ```
5. **Start services in 3 terminals**:
   - Terminal 1: `cd backend && npm run dev`
   - Terminal 2: `cd frontend && npm run dev`
   - Terminal 3: `cd ml-model && source venv/bin/activate && python app.py`

6. **Open browser**: http://localhost:3000

---

## Using Docker (All Platforms) 🐳

If you have Docker installed:

```bash
# Navigate to project
cd market-price-assistant

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

---

## First Steps in the App

### 1. **Create Account**
- Click "Register" on home page
- Choose role: Farmer or Dealer
- Fill in your details
- Click "Register"

### 2. **Login**
- Enter your credentials
- You'll be redirected to dashboard

### 3. **For Farmers:**
- View current market prices
- Check AI price predictions
- Track price trends
- Update your profile

### 4. **For Dealers:**
- Add new prices for vegetables
- Update existing prices
- View market overview
- Manage your shop details

### 5. **Use Bilingual Support**
- Click the language toggle (EN/TA) in header
- Interface switches between English and Tamil

---

## Sample Test Data

### Test Farmer Account
```
Email: farmer@example.com
Password: password123
Role: Farmer
```

### Test Dealer Account
```
Email: dealer@example.com
Password: password123
Role: Dealer
```

To create these accounts, register through the app or use the API directly.

---

## Default Admin Credentials (MongoDB)

```
Username: admin
Password: admin123
Database: market_price_db
```

---

## Port Reference

| Service | Port | URL |
|---------|------|-----|
| Frontend | 3000 | http://localhost:3000 |
| Backend API | 5000 | http://localhost:5000 |
| ML Model | 5001 | http://localhost:5001 |
| MongoDB | 27017 | mongodb://localhost:27017 |

---

## Common Issues & Solutions

### "Port already in use"
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

### "MongoDB connection refused"
1. Check if MongoDB is running
2. Verify connection string in `.env` files
3. Try using MongoDB Atlas instead

### "CORS Error"
- Check `CORS_ORIGIN` in `backend/.env`
- Should match frontend URL

### Stuck on Loading
- Check browser console (F12) for errors
- Check terminal logs for backend/ML errors
- Ensure all services are running

---

## Environment Setup Checklist

- [ ] Node.js installed (v18+)
- [ ] Python installed (v3.9+)
- [ ] MongoDB running or Atlas configured
- [ ] `.env` files created and configured
- [ ] Dependencies installed (npm/pip)
- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] ML Model running on port 5001

---

## Next Steps

1. **Read Full Documentation**: See `docs/SETUP.md`
2. **API Documentation**: See `docs/API.md`
3. **Architecture**: See `docs/ARCHITECTURE.md`
4. **Add Sample Data**: Use admin panel or API
5. **Customize**: Update styling, add features

---

## Getting Help

1. **Check logs in terminal**
2. **Review documentation in `/docs`**
3. **Check error messages in browser console**
4. **Restart services and try again**

---

## What's Next?

### Add More Vegetables
```bash
curl -X POST http://localhost:5000/api/vegetables/add \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tomato",
    "nameInTamil": "தக்காளி",
    "category": "Vegetables",
    "unit": "kg"
  }'
```

### Request Price Predictions
Navigate to "Predictions" page and request AI prediction for any vegetable

### View Price Trends
Click on a vegetable card to see historical price trends

---

## Performance Tips

1. **Clear browser cache** if UI looks weird
2. **Restart all services** if something breaks
3. **Check MongoDB** if data isn't saving
4. **View browser console** (F12) for JavaScript errors
5. **Check terminal logs** for backend/ML errors

---

## That's It! 🎉

You should now have a fully functional Market-Price Assistant!

**Happy trading! 🌾**

For more detailed information, see the complete documentation in the `/docs` folder.
