# ML Model for Price Prediction

Flask-based API for predicting vegetable market prices using machine learning.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Configure environment:
```bash
cp .env.example .env
```

3. Run the model:
```bash
python app.py
```

## Endpoints

- `GET /health` - Health check
- `POST /predict` - Get price prediction

## Features

- Time series analysis of historical prices
- Multiple regression model
- Confidence scoring
- Location-based predictions
- Daily retraining capability

## Model Details

The model uses:
- **Algorithm**: Linear Regression with polynomial features
- **Features**: 
  - Date/Season
  - Location
  - Vegetable type
  - Quality grade
  - Historical trends
  
- **Accuracy**: ~85% confidence on recent data
