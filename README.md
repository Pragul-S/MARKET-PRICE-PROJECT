# Market-Price Assistant for Local Vegetable Traders

A comprehensive full-stack application designed to help vegetable traders track and predict market prices using AI/ML. The platform supports two types of users: Farmers (producers) and Dealers (price setters).

## 🌟 Features

- **Dual Role System**: Separate interfaces for Farmers and Dealers
- **AI Price Prediction**: Machine learning model to predict daily market prices
- **Bilingual Support**: English and Tamil language support
- **Real-time Price Tracking**: Monitor and update vegetable prices
- **Responsive Design**: Mobile-friendly and user-friendly interface
- **Secure Authentication**: JWT-based authentication system
- **Historical Data Analysis**: Track price trends over time

## 🏗️ Project Structure

```
market-price-assistant/
├── backend/              # Node.js/Express REST API
├── frontend/             # Next.js/React frontend
├── ml-model/             # Python ML price prediction model
├── docs/                 # Documentation
├── docker-compose.yml    # Docker configuration
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- Python (v3.9+)
- MongoDB
- Docker & Docker Compose (optional)

### Installation

1. **Clone and navigate to project**
```bash
cd market-price-assistant
```

2. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
npm start
```

3. **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

4. **ML Model Setup**
```bash
cd ml-model
pip install -r requirements.txt
python app.py
```

## 🔐 User Roles

### Farmer
- Register/Login with farm details
- View market prices for different vegetables
- Check price predictions
- List products available
- Track price trends

### Dealer
- Register/Login with shop details
- Set/update daily market prices
- View farmer listings
- Manage product inventory
- View price history and trends

## 📱 Technology Stack

### Frontend
- **Next.js** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **i18n** - Bilingual support (English/Tamil)
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing

### ML/AI
- **Python** - Language
- **Flask** - Web framework
- **scikit-learn** - Machine learning
- **Pandas** - Data manipulation
- **NumPy** - Numerical computing

## 🗄️ Database Models

- **Users** (Farmer/Dealer)
- **Vegetables** (Product catalog)
- **Prices** (Daily market prices)
- **PriceHistory** (Historical prices)
- **Predictions** (AI predictions)

## 📝 License

MIT License

## 👥 Support

For issues and questions, please open an issue in the repository.
