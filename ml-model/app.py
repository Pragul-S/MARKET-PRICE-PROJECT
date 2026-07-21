from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv
from models.price_predictor import PricePredictionModel
from utils.database import Database
from datetime import datetime, timedelta

load_dotenv()

app = Flask(__name__)
PORT = int(os.getenv('PORT', 5001))

# Initialize model and database
price_model = PricePredictionModel()
db = Database()

# Train model on startup with available data
training_data = db.get_training_data()
if training_data and len(training_data) >= 10:
    price_model.train(training_data)
else:
    print("⚠️  Insufficient data for training, using default model")


@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'OK',
        'message': 'ML Model API is running',
        'timestamp': datetime.now().isoformat()
    })


@app.route('/predict', methods=['POST'])
def predict():
    """
    Predict price for a vegetable
    
    Request body:
    {
        "vegetableId": "id",
        "location": "Chennai",
        "quality": "medium",
        "days_ahead": 1
    }
    """
    try:
        data = request.get_json()
        
        if not data or 'vegetableId' not in data or 'location' not in data:
            return jsonify({'error': 'Missing required fields'}), 400
        
        vegetable_id = data.get('vegetableId')
        location = data.get('location')
        quality = data.get('quality', 'medium')
        days_ahead = data.get('days_ahead', 1)
        
        # Get prediction
        prediction = price_model.predict_with_default(
            vegetable_id, location, quality
        )
        
        if not prediction:
            return jsonify({'error': 'Prediction failed'}), 500
        
        # Save to database
        db.save_prediction(
            vegetable_id,
            location,
            prediction['predicted_price'],
            prediction['confidence']
        )
        
        return jsonify(prediction)
    
    except Exception as e:
        print(f"❌ Prediction error: {e}")
        return jsonify({'error': str(e)}), 500


@app.route('/train', methods=['POST'])
def retrain():
    """
    Retrain the model with latest data
    """
    try:
        # Fetch latest training data
        training_data = db.get_training_data(days=90)
        
        if not training_data or len(training_data) < 10:
            return jsonify({
                'error': 'Insufficient training data',
                'samples': len(training_data)
            }), 400
        
        # Train model
        result = price_model.train(training_data)
        
        if result:
            return jsonify({
                'message': 'Model retrained successfully',
                'metrics': result,
                'samples_used': len(training_data)
            })
        else:
            return jsonify({'error': 'Training failed'}), 500
    
    except Exception as e:
        print(f"❌ Retraining error: {e}")
        return jsonify({'error': str(e)}), 500


@app.route('/stats', methods=['GET'])
def get_stats():
    """Get model statistics"""
    try:
        return jsonify({
            'model_status': 'active' if price_model.model else 'inactive',
            'encoders': {
                'vegetables': len(price_model.vegetable_encoder),
                'locations': len(price_model.location_encoder)
            },
            'timestamp': datetime.now().isoformat()
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404


@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500


if __name__ == '__main__':
    print(f"🚀 ML Model API starting on port {PORT}")
    app.run(host='0.0.0.0', port=PORT, debug=False)
