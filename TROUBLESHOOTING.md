# Troubleshooting Guide

Common issues and their solutions.

## Installation Issues

### "npm: command not found"
**Problem**: Node.js not installed  
**Solution**:
- Download and install Node.js v18+ from https://nodejs.org/
- Restart terminal/IDE after installation
- Verify: `node --version`

### "python: command not found"
**Problem**: Python not installed  
**Solution**:
- Download and install Python 3.9+ from https://www.python.org/
- Make sure "Add Python to PATH" is checked during installation
- Verify: `python --version` or `python3 --version`

### npm install fails
**Problem**: Dependency installation errors  
**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Remove lock file and node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### pip install fails
**Problem**: Python package installation errors  
**Solution**:
```bash
# Upgrade pip
python -m pip install --upgrade pip

# Install specific version
pip install -r requirements.txt --force-reinstall
```

---

## Connection Issues

### MongoDB connection refused
**Problem**: `Error: connect ECONNREFUSED 127.0.0.1:27017`

**Solutions**:
1. **Start MongoDB service**:
   - Windows: Services > MongoDB Server > Start
   - macOS: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongod`

2. **Check MongoDB status**:
   ```bash
   mongosh
   ```

3. **Use MongoDB Atlas instead**:
   - Sign up at https://www.mongodb.com/cloud/atlas
   - Get connection string
   - Update `MONGODB_URI` in `.env` files

### Backend API not responding
**Problem**: `http://localhost:5000` returns connection refused

**Solutions**:
1. Check if backend is running:
   ```bash
   cd backend
   npm run dev
   ```

2. Verify Node version:
   ```bash
   node --version  # Should be v18+
   ```

3. Check port:
   - Windows: `netstat -ano | findstr :5000`
   - macOS/Linux: `lsof -i :5000`

4. Kill existing process:
   ```bash
   # Windows
   taskkill /PID <PID> /F
   
   # macOS/Linux
   kill -9 <PID>
   ```

### Frontend not loading
**Problem**: `http://localhost:3000` shows error

**Solutions**:
1. Check if frontend is running:
   ```bash
   cd frontend
   npm run dev
   ```

2. Clear cache:
   - Hard refresh: Ctrl+Shift+R or Cmd+Shift+R
   - Delete `.next` folder: `rm -rf .next`
   - Rebuild: `npm run build`

3. Check API URL in `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

---

## Authentication Issues

### Login fails with "Invalid credentials"
**Problem**: Can't login after registration

**Solutions**:
1. Verify email/password are correct
2. Check database has the user:
   ```bash
   mongosh
   use market_price_db
   db.users.findOne({email: "your@email.com"})
   ```

3. Try registering a new account
4. Check backend logs for errors

### "No token provided" error
**Problem**: API returns 401 Unauthorized

**Solutions**:
1. Login again to get new token
2. Clear browser localStorage:
   ```javascript
   // In browser console
   localStorage.clear()
   ```

3. Verify Authorization header:
   ```bash
   curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:5000/api/auth/profile
   ```

### CORS errors in browser
**Problem**: `Cross-Origin Request Blocked`

**Solutions**:
1. Check backend `.env`:
   ```
   CORS_ORIGIN=http://localhost:3000
   ```

2. Verify frontend URL matches
3. Restart backend after changing CORS_ORIGIN
4. Check browser console for exact error

---

## Port Issues

### "Port 3000 already in use"
**Problem**: Can't start frontend because port is busy

**Solutions**:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>

# Or use different port
PORT=3001 npm run dev
```

### Multiple ports busy
**Problem**: Services won't start due to port conflicts

**Solutions**:
1. Kill all node processes:
   ```bash
   # Windows
   taskkill /F /IM node.exe
   
   # macOS/Linux
   killall node
   ```

2. Use different ports in `.env`:
   ```
   # Backend
   PORT=5001
   
   # Frontend (update .env.local)
   NEXT_PUBLIC_API_URL=http://localhost:5001
   ```

---

## Database Issues

### "Database not found" error
**Problem**: Collections don't exist

**Solutions**:
1. MongoDB creates collections automatically on first write
2. Add sample data through API or admin panel
3. Check MongoDB is connected

### "Duplicate key error"
**Problem**: `E11000 duplicate key error`

**Solutions**:
1. Clear duplicate data:
   ```bash
   mongosh
   use market_price_db
   db.users.deleteMany({email: "duplicate@email.com"})
   ```

2. Drop and recreate collection:
   ```bash
   db.users.drop()
   ```

### Data not saving
**Problem**: Changes don't persist in database

**Solutions**:
1. Verify MongoDB is running
2. Check connection string in `.env`
3. Review backend logs for errors
4. Check user role permissions (Dealer vs Farmer)

---

## Frontend Issues

### UI looks broken or misaligned
**Problem**: Styling issues after update

**Solutions**:
1. Clear browser cache:
   - Open DevTools (F12)
   - Right-click refresh button > Empty cache and hard refresh

2. Rebuild frontend:
   ```bash
   cd frontend
   rm -rf .next
   npm run build
   npm run dev
   ```

3. Check Tailwind CSS compilation

### Language toggle doesn't work
**Problem**: UI doesn't switch to Tamil

**Solutions**:
1. Check i18n translations file
2. Verify language is saved in localStorage
3. Hard refresh page
4. Check console for errors (F12)

### Charts/graphs not showing
**Problem**: Recharts not rendering

**Solutions**:
1. Verify price data exists in database
2. Check browser console for errors
3. Ensure Recharts library is installed
4. Try refreshing the page

---

## Backend Issues

### "TypeError: Cannot read property 'vegetableId'"
**Problem**: Undefined object errors

**Solutions**:
1. Check request payload is correct
2. Verify field names match schema
3. Look at error logs for full error message
4. Test API with Postman or curl

### Express server crashes
**Problem**: Server exits unexpectedly

**Solutions**:
1. Check terminal logs for error
2. Verify .env file has all required variables
3. Check for unhandled promise rejections
4. Restart with: `npm run dev`

### API returns 500 error
**Problem**: Internal server error

**Solutions**:
1. Check backend terminal for detailed error
2. Verify database is connected
3. Check MongoDB logs for issues
4. Try clearing and restarting services

---

## ML Model Issues

### ML predictions always fail
**Problem**: `http://localhost:5001/predict` returns error

**Solutions**:
1. Check ML model is running:
   ```bash
   cd ml-model
   python app.py
   ```

2. Verify Python version:
   ```bash
   python --version  # Should be 3.9+
   ```

3. Check dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Check MongoDB connection string in `.env`

### Model takes too long to train
**Problem**: Prediction requests are slow

**Solutions**:
1. Train model manually:
   ```bash
   curl -X POST http://localhost:5001/train
   ```

2. Use synthetic data (model generates if not enough data)
3. Reduce training data size (days parameter)

### "Insufficient training data" warning
**Problem**: Model can't generate accurate predictions

**Solutions**:
1. Add more price data through API
2. Model uses synthetic data as fallback
3. Add historical prices via MongoDB
4. Check database has price records

---

## Docker Issues

### Docker Compose won't start
**Problem**: `docker-compose up` fails

**Solutions**:
1. Check Docker is installed:
   ```bash
   docker --version
   docker-compose --version
   ```

2. Start Docker daemon/Desktop
3. Check docker-compose.yml syntax
4. View detailed error:
   ```bash
   docker-compose up --verbose
   ```

### Container exits immediately
**Problem**: Service crashes right after starting

**Solutions**:
1. View logs:
   ```bash
   docker-compose logs <service-name>
   ```

2. Check environment variables in docker-compose.yml
3. Verify ports aren't already in use
4. Rebuild images:
   ```bash
   docker-compose build --no-cache
   ```

---

## Performance Issues

### App is slow
**Problem**: Pages take long to load

**Solutions**:
1. Check network in browser DevTools (F12)
2. Verify MongoDB is indexed properly
3. Check backend terminal for slow queries
4. Use browser's performance profiler

### High CPU/Memory usage
**Problem**: System resources being consumed

**Solutions**:
1. Restart services
2. Clear browser cache and cookies
3. Stop background processes
4. Use lighter ML model or fewer predictions

---

## General Troubleshooting Steps

1. **Read the error message carefully** - it often contains the solution
2. **Check terminal/console logs** - run command with verbose mode if available
3. **Restart all services** - often fixes temporary issues
4. **Clear caches** - browser, npm, pip, file system
5. **Verify configurations** - all `.env` files have correct values
6. **Reinstall dependencies** - if updates cause issues
7. **Search documentation** - check docs/SETUP.md and docs/API.md
8. **Test with curl** - verify API works before debugging frontend

---

## Getting Help

When asking for help, provide:
1. **Error message** - exact text from terminal/console
2. **OS and versions** - Node.js, Python, MongoDB versions
3. **Steps to reproduce** - what you were doing when error occurred
4. **Terminal logs** - output from running services
5. **Screenshots** - of errors or broken UI

---

## Advanced Debugging

### Enable verbose logging
```bash
# Backend
DEBUG=* npm run dev

# Frontend
NODE_DEBUG=* npm run dev
```

### MongoDB debugging
```bash
# Check current connections
db.currentOp()

# View collection info
db.users.getIndexes()
db.prices.find().limit(5)

# Check database size
db.stats()
```

### API debugging with curl
```bash
# Test endpoint with verbose output
curl -v http://localhost:5000/api/health

# Post with headers
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -v \
  -d '{"email":"test@test.com","password":"test"}'
```

---

## Still Having Issues?

1. Check all documentation in `/docs` folder
2. Review your `.env` configuration files
3. Ensure all services are running on correct ports
4. Verify MongoDB has data using MongoDB Compass
5. Check browser DevTools (F12) for JavaScript errors
6. Review backend terminal logs for server errors

**Remember**: Most issues are configuration-related. Take time to verify your `.env` files!
