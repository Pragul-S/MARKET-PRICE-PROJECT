# Architecture & Features

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (Next.js)                    │
│        - React Components                                    │
│        - i18n (English/Tamil)                               │
│        - State Management (Zustand)                         │
│        - Tailwind CSS Styling                               │
└────────────────────────┬────────────────────────────────────┘
                         │
                    HTTP/REST API
                         │
┌─────────────────────────────────────────────────────────────┐
│                  Backend API (Node.js/Express)              │
│        - RESTful Endpoints                                   │
│        - JWT Authentication                                 │
│        - Business Logic                                     │
│        - Data Validation                                    │
└────────────┬───────────────────────────────┬────────────────┘
             │                               │
      MongoDB Database           ML Model API (Flask/Python)
      - Users                    - Price Prediction
      - Vegetables              - Model Training
      - Prices                  - Statistical Analysis
      - Predictions
```

## Component Hierarchy

### Backend Services

```
Backend (Express.js)
├── Routes
│   ├── authRoutes.ts
│   ├── priceRoutes.ts
│   └── vegetableRoutes.ts
├── Controllers
│   ├── authController.ts
│   ├── priceController.ts
│   └── vegetableController.ts
├── Models
│   ├── User.ts
│   ├── Price.ts
│   ├── Vegetable.ts
│   └── Prediction.ts
├── Middleware
│   ├── auth.ts
│   └── errorHandler.ts
└── Utils
    └── jwt.ts
```

### Frontend Components

```
Frontend (Next.js/React)
├── Pages
│   ├── index.tsx (Home)
│   ├── login.tsx
│   ├── register.tsx
│   ├── dashboard.tsx
│   ├── prices.tsx
│   ├── predictions.tsx
│   └── profile.tsx
├── Components
│   ├── Header.tsx
│   ├── Layout.tsx
│   ├── InputField.tsx
│   ├── PriceCard.tsx
│   └── PriceTrendChart.tsx
├── Store
│   └── index.ts (Zustand stores)
├── Utils
│   └── api.ts (API client)
└── i18n
    └── translations.ts
```

### ML Model

```
ML Model (Python/Flask)
├── models/
│   └── price_predictor.py
├── utils/
│   └── database.py
└── app.py (Flask Server)
```

## Key Features

### 1. Dual Role System

**Farmer Role:**
- View current market prices
- Track historical price trends
- Receive AI price predictions
- Update farm profile
- Browse vegetable listings

**Dealer Role:**
- Set/update daily market prices
- View all market listings
- Manage price history
- Access analytics
- Update shop details

### 2. Authentication & Security

- JWT-based token authentication
- Password hashing with bcrypt
- Role-based access control (RBAC)
- Protected API endpoints
- Secure token storage in cookies

### 3. Bilingual Support

**Supported Languages:**
- English (en)
- Tamil (ta)

**Implementation:**
- i18next for internationalization
- Translation objects for all UI text
- Persistent language preference
- RTL support ready for Tamil

### 4. AI Price Prediction

**Algorithm:**
- Linear Regression with Polynomial Features
- Time-series analysis
- Feature engineering
- Confidence scoring

**Features Used:**
- Historical prices
- Seasonal patterns
- Location data
- Vegetable type
- Quality grades

**Accuracy:**
- ~85% confidence on recent data
- Automatic retraining capability
- Fallback predictions when insufficient data

### 5. Real-time Features

- Live price updates
- Price trends visualization
- Confidence indicators
- Historical data tracking
- Responsive charts (Recharts)

### 6. Database Design

**User Schema:**
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  role: 'farmer' | 'dealer',
  location: String,
  shopName: String (dealers),
  farmDetails: String (farmers),
  registrationNumber: String,
  createdAt: Date,
  updatedAt: Date
}
```

**Vegetable Schema:**
```javascript
{
  name: String (unique),
  nameInTamil: String,
  category: String,
  description: String,
  unit: String,
  createdAt: Date,
  updatedAt: Date
}
```

**Price Schema:**
```javascript
{
  vegetableId: ObjectId (ref: Vegetable),
  dealerId: ObjectId (ref: User),
  price: Number,
  location: String,
  quality: 'low' | 'medium' | 'high',
  quantity: Number,
  date: Date,
  createdAt: Date,
  updatedAt: Date
}
```

**Prediction Schema:**
```javascript
{
  vegetableId: ObjectId (ref: Vegetable),
  location: String,
  predictedPrice: Number,
  confidence: Number (0-100),
  date: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Tech Stack Details

### Frontend Technologies

| Technology | Purpose |
|------------|---------|
| Next.js 13 | React framework with SSR |
| TypeScript | Type safety |
| Tailwind CSS | Utility-first CSS framework |
| Zustand | State management |
| Axios | HTTP client |
| Recharts | Data visualization |
| i18next | Internationalization |
| React Icons | Icon library |

### Backend Technologies

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express.js | Web framework |
| TypeScript | Type safety |
| MongoDB | NoSQL database |
| Mongoose | ODM for MongoDB |
| JWT | Authentication tokens |
| bcryptjs | Password hashing |
| CORS | Cross-origin handling |

### ML Technologies

| Technology | Purpose |
|------------|---------|
| Python 3.9 | Programming language |
| Flask | Web framework |
| scikit-learn | Machine learning |
| Pandas | Data manipulation |
| NumPy | Numerical computing |
| MongoDB | Data persistence |

## Data Flow

### Authentication Flow
```
1. User submits login/register form
2. Frontend calls API endpoint
3. Backend validates credentials/data
4. Backend generates JWT token
5. Frontend stores token in localStorage/cookie
6. Frontend sets Authorization header for future requests
```

### Price Prediction Flow
```
1. Farmer/Dealer requests prediction
2. Frontend sends request with vegetableId & location
3. Backend fetches historical prices from MongoDB
4. Backend calls ML Model API
5. ML Model:
   - Prepares features
   - Applies transformations
   - Runs prediction
   - Returns predicted price & confidence
6. Backend saves prediction to MongoDB
7. Frontend displays result with confidence score
```

### Price Update Flow
```
1. Dealer submits new price
2. Frontend validates input
3. Backend authenticates request
4. Backend creates Price document
5. Database indexes by vegetableId, date, location
6. Frontend refreshes price list
7. Price appears in Farmer dashboards
```

## Security Measures

1. **Authentication:**
   - JWT tokens for stateless auth
   - Token expiration (7 days)
   - Secure token storage

2. **Authorization:**
   - Role-based access control
   - Route protection middleware
   - Resource ownership validation

3. **Data Protection:**
   - Password hashing (bcrypt, 10 rounds)
   - Input validation
   - CORS configuration
   - SQL injection prevention (Mongoose)

4. **API Security:**
   - Rate limiting (in production)
   - HTTPS in production
   - Request validation
   - Error message sanitization

## Performance Optimizations

1. **Frontend:**
   - Code splitting with Next.js
   - Image optimization
   - Lazy loading
   - Caching with Zustand

2. **Backend:**
   - Database indexing
   - Query optimization
   - Connection pooling
   - API response caching

3. **ML Model:**
   - Model persistence with joblib
   - Batch predictions
   - Efficient feature engineering

## Scalability Considerations

1. **Horizontal Scaling:**
   - Stateless backend design
   - Load balancing ready
   - Containerized deployment

2. **Database Scaling:**
   - MongoDB sharding support
   - Index optimization
   - Query efficiency

3. **Cache Layer:**
   - Redis integration (optional)
   - Frontend caching
   - API response caching

## Future Enhancements

1. **Features:**
   - Real-time WebSocket notifications
   - SMS/Email alerts
   - Advanced analytics dashboard
   - Mobile app (React Native)
   - Farmer network/collaboration

2. **ML Improvements:**
   - Deep learning models
   - Weather data integration
   - Supply-demand analysis
   - Price elasticity modeling

3. **Infrastructure:**
   - Kubernetes deployment
   - CI/CD pipeline
   - Advanced monitoring
   - Automated backups

4. **Integrations:**
   - Payment gateway
   - SMS notifications
   - Weather API
   - Market news feeds
