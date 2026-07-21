# API Documentation

Complete API reference for Market-Price Assistant

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```bash
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### Register User
```
POST /auth/register
```

**Request Body:**
```json
{
  "name": "John Farmer",
  "email": "farmer@example.com",
  "password": "password123",
  "phone": "9876543210",
  "role": "farmer",
  "location": "Chennai",
  "shopName": "optional for dealers",
  "farmDetails": "optional for farmers",
  "registrationNumber": "FARM001"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "name": "John Farmer",
    "email": "farmer@example.com",
    "role": "farmer"
  },
  "token": "jwt_token"
}
```

### Login
```
POST /auth/login
```

**Request Body:**
```json
{
  "email": "farmer@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": "user_id",
    "name": "John Farmer",
    "email": "farmer@example.com",
    "role": "farmer",
    "location": "Chennai"
  },
  "token": "jwt_token"
}
```

### Get Profile
```
GET /auth/profile
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "user": {
    "_id": "user_id",
    "name": "John Farmer",
    "email": "farmer@example.com",
    "phone": "9876543210",
    "role": "farmer",
    "location": "Chennai",
    "farmDetails": "5 acres of vegetables",
    "registrationNumber": "FARM001"
  }
}
```

### Update Profile
```
PUT /auth/profile
```

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Farmer",
  "phone": "9876543210",
  "location": "Chennai",
  "farmDetails": "10 acres now"
}
```

**Response:**
```json
{
  "message": "Profile updated successfully",
  "user": { ... }
}
```

---

## Vegetable Endpoints

### Get All Vegetables
```
GET /vegetables
```

**Query Parameters:**
- `limit` (optional): Number of results (default: 50)

**Response:**
```json
{
  "vegetables": [
    {
      "_id": "veg_id",
      "name": "Tomato",
      "nameInTamil": "தக்காளி",
      "category": "Vegetables",
      "description": "Fresh red tomatoes",
      "unit": "kg"
    }
  ]
}
```

### Get Vegetable by ID
```
GET /vegetables/:id
```

**Response:**
```json
{
  "vegetable": {
    "_id": "veg_id",
    "name": "Tomato",
    "nameInTamil": "தக்காளி",
    "category": "Vegetables",
    "unit": "kg"
  }
}
```

### Search Vegetables
```
GET /vegetables/search?query=tomato
```

**Query Parameters:**
- `query` (required): Search term

**Response:**
```json
{
  "vegetables": [
    { ... vegetable objects ... }
  ]
}
```

### Add Vegetable
```
POST /vegetables/add
```

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Tomato",
  "nameInTamil": "தக்காளி",
  "category": "Vegetables",
  "description": "Fresh tomatoes",
  "unit": "kg"
}
```

**Response:**
```json
{
  "message": "Vegetable added successfully",
  "vegetable": { ... }
}
```

---

## Price Endpoints

### Get Market Prices
```
GET /prices/market
```

**Query Parameters:**
- `vegetableId` (optional): Filter by vegetable
- `location` (optional): Filter by location
- `limit` (optional): Number of results (default: 50)

**Response:**
```json
{
  "prices": [
    {
      "_id": "price_id",
      "vegetableId": { ... vegetable object ... },
      "dealerId": "dealer_id",
      "price": 45.50,
      "location": "Chennai",
      "quality": "high",
      "quantity": 100,
      "date": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### Get Price Trend
```
GET /prices/trend?vegetableId=X&days=30
```

**Query Parameters:**
- `vegetableId` (required): Vegetable ID
- `location` (optional): Location filter
- `days` (optional): Number of days (default: 30)

**Response:**
```json
{
  "prices": [ ... ],
  "stats": {
    "min": 30,
    "max": 60,
    "avg": 45.5
  }
}
```

### Add Price (Dealer Only)
```
POST /prices/add
```

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "vegetableId": "veg_id",
  "price": 45.50,
  "location": "Chennai",
  "quality": "high",
  "quantity": 100
}
```

**Response:**
```json
{
  "message": "Price added successfully",
  "price": { ... }
}
```

### Get Predictions
```
GET /prices/predictions
```

**Query Parameters:**
- `vegetableId` (optional): Filter by vegetable
- `location` (optional): Filter by location

**Response:**
```json
{
  "predictions": [
    {
      "_id": "pred_id",
      "vegetableId": { ... },
      "location": "Chennai",
      "predictedPrice": 52.00,
      "confidence": 85,
      "date": "2024-01-16T00:00:00Z"
    }
  ]
}
```

### Request Price Prediction
```
POST /prices/predict
```

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "vegetableId": "veg_id",
  "location": "Chennai"
}
```

**Response:**
```json
{
  "message": "Prediction generated successfully",
  "prediction": {
    "_id": "pred_id",
    "vegetableId": "veg_id",
    "location": "Chennai",
    "predictedPrice": 52.00,
    "confidence": 85,
    "date": "2024-01-16T00:00:00Z"
  }
}
```

---

## Error Responses

### Unauthorized (401)
```json
{
  "message": "Invalid token"
}
```

### Forbidden (403)
```json
{
  "message": "Insufficient permissions"
}
```

### Bad Request (400)
```json
{
  "message": "Missing required fields"
}
```

### Not Found (404)
```json
{
  "message": "Resource not found"
}
```

### Internal Server Error (500)
```json
{
  "message": "Internal server error"
}
```

---

## Rate Limiting

Currently no rate limiting is implemented. In production, consider adding:
- API key-based rate limiting
- IP-based throttling
- Per-user request quotas

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 500 | Server Error - Internal error |

---

## Examples

### Complete Login & Predict Workflow

```bash
#!/bin/bash

API_URL="http://localhost:5000/api"

# 1. Register
TOKEN=$(curl -s -X POST $API_URL/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Farmer",
    "email": "test@example.com",
    "password": "test123",
    "phone": "9876543210",
    "role": "farmer",
    "location": "Chennai",
    "registrationNumber": "TEST001"
  }' | jq -r '.token')

# 2. Get vegetables
curl -s -X GET "$API_URL/vegetables" \
  -H "Authorization: Bearer $TOKEN" | jq

# 3. Request prediction
curl -s -X POST $API_URL/prices/predict \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "vegetableId": "veg_id",
    "location": "Chennai"
  }' | jq
```

---

## Versioning

Current API Version: 1.0

Future versions will maintain backward compatibility or include version headers.
