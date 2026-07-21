from pymongo import MongoClient
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

load_dotenv()

class Database:
    def __init__(self):
        self.mongo_uri = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/market_price_db')
        self.client = None
        self.db = None
        self.connect()
    
    def connect(self):
        """Connect to MongoDB"""
        try:
            self.client = MongoClient(self.mongo_uri)
            self.db = self.client['market_price_db']
            # Test connection
            self.client.admin.command('ismaster')
            print("✅ Connected to MongoDB")
        except Exception as e:
            print(f"❌ MongoDB connection error: {e}")
    
    def get_training_data(self, days=90):
        """Get historical price data for training"""
        try:
            prices_collection = self.db['prices']
            
            # Get data from last 90 days
            start_date = datetime.now() - timedelta(days=days)
            
            query = {'date': {'$gte': start_date}}
            data = list(prices_collection.find(query, {'_id': 0}))
            
            if len(data) < 10:
                print(f"⚠️  Only {len(data)} training samples available")
                # Generate synthetic data if not enough
                return self.generate_synthetic_data(100)
            
            return data
        except Exception as e:
            print(f"❌ Error fetching training data: {e}")
            return []
    
    def generate_synthetic_data(self, count=100):
        """Generate synthetic training data"""
        import random
        from datetime import datetime, timedelta
        
        vegetables = ['tomato', 'onion', 'potato', 'cabbage', 'carrot']
        locations = ['Chennai', 'Bangalore', 'Madurai', 'Coimbatore', 'Salem']
        qualities = ['low', 'medium', 'high']
        
        data = []
        base_date = datetime.now() - timedelta(days=90)
        
        for i in range(count):
            data.append({
                'vegetableId': random.choice(vegetables),
                'location': random.choice(locations),
                'quality': random.choice(qualities),
                'price': random.uniform(20, 150),
                'date': base_date + timedelta(days=random.randint(0, 90))
            })
        
        return data
    
    def save_prediction(self, vegetable_id, location, predicted_price, confidence):
        """Save prediction to database"""
        try:
            predictions_collection = self.db['predictions']
            
            prediction_doc = {
                'vegetableId': str(vegetable_id),
                'location': location,
                'predictedPrice': predicted_price,
                'confidence': confidence,
                'date': datetime.now(),
                'createdAt': datetime.now(),
                'updatedAt': datetime.now()
            }
            
            result = predictions_collection.insert_one(prediction_doc)
            return str(result.inserted_id)
        except Exception as e:
            print(f"❌ Error saving prediction: {e}")
            return None
    
    def close(self):
        """Close database connection"""
        if self.client:
            self.client.close()
