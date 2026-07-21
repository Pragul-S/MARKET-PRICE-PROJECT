# Project Structure

```
market-price-assistant/
│
├── backend/                          # Node.js/Express API
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts          # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── authController.ts    # Auth logic
│   │   │   ├── priceController.ts   # Price management
│   │   │   └── vegetableController.ts
│   │   ├── middleware/
│   │   │   └── auth.ts              # Authentication & Authorization
│   │   ├── models/
│   │   │   ├── User.ts              # User schema
│   │   │   ├── Price.ts             # Price schema
│   │   │   ├── Vegetable.ts         # Vegetable schema
│   │   │   └── Prediction.ts        # Prediction schema
│   │   ├── routes/
│   │   │   ├── authRoutes.ts
│   │   │   ├── priceRoutes.ts
│   │   │   └── vegetableRoutes.ts
│   │   ├── utils/
│   │   │   └── jwt.ts               # JWT utilities
│   │   └── server.ts                # Main server file
│   ├── package.json
│   ├── tsconfig.json
│   ├── Dockerfile
│   └── .env.example
│
├── frontend/                         # Next.js/React Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   ├── Layout.tsx
│   │   │   ├── InputField.tsx
│   │   │   ├── PriceCard.tsx
│   │   │   └── PriceTrendChart.tsx
│   │   ├── i18n/
│   │   │   └── translations.ts      # EN/TA translations
│   │   ├── pages/
│   │   │   ├── _app.tsx             # App wrapper
│   │   │   ├── index.tsx            # Home page
│   │   │   ├── login.tsx
│   │   │   ├── register.tsx
│   │   │   ├── dashboard.tsx
│   │   │   ├── prices.tsx
│   │   │   ├── predictions.tsx
│   │   │   ├── profile.tsx
│   │   │   └── 404.tsx
│   │   ├── store/
│   │   │   └── index.ts             # Zustand stores
│   │   ├── styles/
│   │   │   └── globals.css
│   │   └── utils/
│   │       └── api.ts               # API client
│   ├── public/                      # Static assets
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   ├── next.config.js
│   ├── Dockerfile
│   └── .env.example
│
├── ml-model/                         # Python ML Model
│   ├── models/
│   │   └── price_predictor.py       # ML prediction logic
│   ├── utils/
│   │   └── database.py              # Database operations
│   ├── app.py                       # Flask server
│   ├── requirements.txt
│   ├── Dockerfile
│   ├── .env.example
│   └── README.md
│
├── docs/                            # Documentation
│   ├── SETUP.md                     # Installation guide
│   ├── API.md                       # API documentation
│   └── ARCHITECTURE.md              # Architecture details
│
├── docker-compose.yml               # Docker orchestration
├── .gitignore
└── README.md                        # Project overview

```

## Directory Descriptions

### Backend (`/backend`)
Node.js/Express REST API serving as the main application backend.

**Key Files:**
- `src/server.ts` - Express app initialization and configuration
- `src/models/*.ts` - MongoDB schemas
- `src/controllers/*.ts` - Business logic
- `src/routes/*.ts` - API endpoints
- `src/middleware/auth.ts` - Authentication/authorization

### Frontend (`/frontend`)
Next.js React application for user interface.

**Key Files:**
- `src/pages/*.tsx` - Application pages
- `src/components/*.tsx` - Reusable UI components
- `src/store/index.ts` - Global state (Auth, Language)
- `src/utils/api.ts` - API client wrapper
- `src/i18n/translations.ts` - Bilingual translations

### ML Model (`/ml-model`)
Python Flask API for price prediction using scikit-learn.

**Key Files:**
- `models/price_predictor.py` - ML model implementation
- `utils/database.py` - MongoDB integration
- `app.py` - Flask server

### Docs (`/docs`)
Comprehensive documentation and guides.

**Files:**
- `SETUP.md` - Installation and setup instructions
- `API.md` - Complete API documentation
- `ARCHITECTURE.md` - System architecture and features

## File Naming Conventions

- **TypeScript files**: `camelCase.ts`
- **Components**: `PascalCase.tsx`
- **Utilities**: `camelCase.ts`
- **Configuration**: `camelCase.js`
- **Python files**: `snake_case.py`

## Environment Variables

### Backend (`.env`)
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://...
JWT_SECRET=your_secret
JWT_EXPIRE=7d
ML_MODEL_URL=http://localhost:5001
CORS_ORIGIN=http://localhost:3000
```

### Frontend (`.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### ML Model (`.env`)
```
FLASK_ENV=development
PORT=5001
MONGODB_URI=mongodb://...
```

## Installation Paths

### Clone Repository
```bash
git clone <repository-url>
cd market-price-assistant
```

### Install All Dependencies
```bash
# Backend
cd backend && npm install && cd ..

# Frontend
cd frontend && npm install && cd ..

# ML Model
cd ml-model && pip install -r requirements.txt && cd ..
```

### Start Development Servers
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev

# Terminal 3 - ML Model
cd ml-model && python app.py
```

## Build & Deployment

### Build for Production
```bash
# Backend
cd backend && npm run build

# Frontend
cd frontend && npm run build

# ML Model
cd ml-model && # No build needed
```

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up -d

# Stop services
docker-compose down
```

## Database Files

MongoDB stores its data in:
- Windows: `C:\Program Files\MongoDB\Server\<version>\data`
- macOS: `/usr/local/var/mongodb`
- Linux: `/var/lib/mongodb`
