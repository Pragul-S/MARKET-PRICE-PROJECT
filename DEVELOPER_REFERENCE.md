# Developer Reference Guide

Quick reference for developers working on Market-Price Assistant.

## Project Overview

A full-stack application for tracking and predicting vegetable market prices with dual-role authentication (Farmer/Dealer) and bilingual support (English/Tamil).

## Tech Stack

- **Frontend**: Next.js 13, React, TypeScript, Tailwind CSS, Zustand
- **Backend**: Node.js, Express, TypeScript, MongoDB, Mongoose
- **ML/AI**: Python, Flask, scikit-learn, Pandas
- **Database**: MongoDB
- **Containerization**: Docker, Docker Compose

## Project Structure

```
market-price-assistant/
├── backend/           # Express REST API
├── frontend/          # Next.js React app
├── ml-model/          # Flask ML server
├── docs/              # Documentation
├── docker-compose.yml # Docker orchestration
├── QUICKSTART.md      # Quick start guide
├── TROUBLESHOOTING.md # Common issues
├── setup.sh/setup.bat # Automated setup
└── README.md          # Project overview
```

## Running the Project

### With Docker (Recommended)
```bash
docker-compose up -d
# Access: Frontend (3000), Backend API (5000), ML (5001)
```

### Manual Setup
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev

# Terminal 3 - ML Model
cd ml-model && python app.py
```

## Key Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/vegetables` | Get all vegetables |
| GET | `/api/prices/market` | Get market prices |
| POST | `/api/prices/add` | Add price (Dealer) |
| GET | `/api/prices/predictions` | Get predictions |
| POST | `/api/prices/predict` | Request prediction |

## Authentication

- **Token**: JWT stored in localStorage
- **Headers**: `Authorization: Bearer <token>`
- **Expiry**: 7 days (configurable)
- **Hash**: bcrypt 10 rounds

## Database Schemas

### User
```javascript
{
  name, email, password, phone, role,
  location, shopName/farmDetails,
  registrationNumber, timestamps
}
```

### Vegetable
```javascript
{
  name, nameInTamil, category,
  description, unit, timestamps
}
```

### Price
```javascript
{
  vegetableId, dealerId, price, location,
  quality, quantity, date, timestamps
}
```

### Prediction
```javascript
{
  vegetableId, location, predictedPrice,
  confidence, date, timestamps
}
```

## Common Tasks

### Add New Vegetable
```bash
curl -X POST http://localhost:5000/api/vegetables/add \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Vegetable",
    "nameInTamil": "பொருள்",
    "category": "Type",
    "unit": "kg"
  }'
```

### Get Price Predictions
```bash
curl http://localhost:5000/api/prices/predictions \
  -H "Authorization: Bearer TOKEN"
```

### Request AI Prediction
```bash
curl -X POST http://localhost:5000/api/prices/predict \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"vegetableId": "ID", "location": "City"}'
```

## Frontend Components

### Pages
- `index.tsx` - Home/Landing
- `login.tsx` - User login
- `register.tsx` - User registration
- `dashboard.tsx` - Main dashboard
- `prices.tsx` - Market prices view
- `predictions.tsx` - AI predictions
- `profile.tsx` - User profile

### Components
- `Header.tsx` - Navigation header
- `Layout.tsx` - Page wrapper
- `InputField.tsx` - Form input
- `PriceCard.tsx` - Price display
- `PriceTrendChart.tsx` - Chart visualization

### Stores (Zustand)
- `useAuthStore` - User auth state
- `useLanguageStore` - Language preference

## Backend Structure

### Controllers
- `authController.ts` - Auth logic
- `priceController.ts` - Price management
- `vegetableController.ts` - Vegetable operations

### Routes
- `authRoutes.ts` - Auth endpoints
- `priceRoutes.ts` - Price endpoints
- `vegetableRoutes.ts` - Vegetable endpoints

### Middleware
- `auth.ts` - JWT verification & role check

### Models
- `User.ts` - User schema
- `Vegetable.ts` - Vegetable schema
- `Price.ts` - Price schema
- `Prediction.ts` - Prediction schema

## ML Model

### Architecture
- Input: Vegetable ID, Location, Quality, Season
- Processing: Feature engineering, normalization
- Output: Predicted price, confidence score

### Training Data
- Minimum 10 samples required
- Uses historical prices from database
- Synthetic data generated if insufficient

### Accuracy
- ~85% confidence on recent data
- Automatic retraining via `/train` endpoint
- Fallback predictions available

## Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://...
JWT_SECRET=secret_key
JWT_EXPIRE=7d
ML_MODEL_URL=http://localhost:5001
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### ML Model (.env)
```
FLASK_ENV=development
PORT=5001
MONGODB_URI=mongodb://...
```

## Debugging

### View Backend Logs
```bash
cd backend && npm run dev
```

### View Frontend Logs
```bash
# Browser DevTools: F12 → Console
```

### View ML Logs
```bash
cd ml-model && python app.py
```

### Test API Endpoints
```bash
# Test health
curl http://localhost:5000/health

# Test with authentication
curl -H "Authorization: Bearer TOKEN" \
  http://localhost:5000/api/auth/profile
```

## Common Ports

| Service | Port | Use |
|---------|------|-----|
| Frontend | 3000 | React app |
| Backend | 5000 | REST API |
| ML Model | 5001 | Prediction API |
| MongoDB | 27017 | Database |

## Build & Deploy

### Build for Production
```bash
# Backend
cd backend && npm run build

# Frontend
cd frontend && npm run build

# ML Model
cd ml-model  # No build needed
```

### Docker Build
```bash
docker-compose build
docker-compose up -d
```

## Testing

### Sample Login
```
Email: farmer@example.com
Password: password123
```

### Add Test Price
```bash
curl -X POST http://localhost:5000/api/prices/add \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "vegetableId": "ID",
    "price": 50.00,
    "location": "Chennai",
    "quality": "high"
  }'
```

## Performance Tips

1. **Use MongoDB indexes** for frequently queried fields
2. **Cache API responses** on frontend with Zustand
3. **Lazy load components** in Next.js
4. **Optimize images** in public folder
5. **Monitor database performance** with MongoDB Compass

## Security Checklist

- [ ] JWT_SECRET changed in production
- [ ] CORS_ORIGIN configured correctly
- [ ] MongoDB credentials secured
- [ ] Environment variables not in git
- [ ] API validation on all endpoints
- [ ] Password hashing enabled
- [ ] HTTPS enabled in production
- [ ] Rate limiting implemented
- [ ] Input sanitization active

## File Upload Support

Currently, the project uses form data without file uploads. To add file support:

1. **Frontend**: Use `FormData` with `multipart/form-data`
2. **Backend**: Add `multer` middleware
3. **Storage**: Use AWS S3 or local storage

## Internationalization (i18n)

Add new language:
1. Create translations object in `src/i18n/translations.ts`
2. Add language option to language switcher
3. Update store with new language code

## Future Enhancements

1. Real-time WebSocket updates
2. Mobile app (React Native)
3. Advanced analytics dashboard
4. SMS/Email notifications
5. Payment gateway integration
6. Farmer collaboration features
7. Weather integration
8. Supply-demand analysis

## Code Style

- **TypeScript**: Type everything
- **Naming**: camelCase for vars, PascalCase for components
- **Imports**: Group by external, internal, relative
- **Formatting**: Prettier (auto-format on save)
- **Linting**: ESLint rules applied

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/feature-name

# Make changes and commit
git add .
git commit -m "feat: Add new feature"

# Push and create PR
git push origin feature/feature-name
```

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Express Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [scikit-learn Docs](https://scikit-learn.org/)
- [Tailwind CSS Docs](https://tailwindcss.com/)

## Support & Documentation

- **Setup Guide**: See `docs/SETUP.md`
- **API Reference**: See `docs/API.md`
- **Architecture**: See `docs/ARCHITECTURE.md`
- **Troubleshooting**: See `TROUBLESHOOTING.md`
- **Quick Start**: See `QUICKSTART.md`

## License

MIT License - Free for commercial and personal use

---

**Last Updated**: 2024  
**Version**: 1.0.0  
**Maintainer**: Your Team
