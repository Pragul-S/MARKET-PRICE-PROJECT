import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import InputField from '@/components/InputField';
import { useAuthStore, useLanguageStore } from '@/store';
import { translations } from '@/i18n/translations';
import { priceAPI, vegetableAPI } from '@/utils/api';

const PredictionsPage: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { language } = useLanguageStore();
  const t = translations[language];

  const [vegetables, setVegetables] = useState<any[]>([]);
  const [predictions, setPredictions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [predicting, setPredicting] = useState(false);

  const [formData, setFormData] = useState({
    vegetableId: '',
    location: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const [vegsRes, predsRes] = await Promise.all([
          vegetableAPI.getAllVegetables(),
          priceAPI.getPredictions(),
        ]);

        setVegetables(vegsRes.data.vegetables || []);
        setPredictions(predsRes.data.predictions || []);
      } catch (error) {
        console.error('Error fetching predictions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, router]);

  const handleRequestPrediction = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.vegetableId || !formData.location) {
      alert('Please fill all fields');
      return;
    }

    setPredicting(true);

    try {
      const response = await priceAPI.requestPrediction(formData);
      setPredictions([response.data.prediction, ...predictions]);
      setFormData({ vegetableId: '', location: '' });
    } catch (error) {
      console.error('Error requesting prediction:', error);
      alert('Failed to get prediction');
    } finally {
      setPredicting(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-12">{t.common.loading}</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-primary">{t.predictions.aiPredictions}</h1>

        {/* Prediction Form */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-accent">
          <h2 className="text-xl font-semibold mb-4">{t.predictions.requestPrediction}</h2>

          <form onSubmit={handleRequestPrediction} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.prices.vegetable} <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.vegetableId}
                onChange={(e) => setFormData({ ...formData, vegetableId: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="">Select a vegetable</option>
                {vegetables.map((veg) => (
                  <option key={veg._id} value={veg._id}>
                    {language === 'en' ? veg.name : veg.nameInTamil}
                  </option>
                ))}
              </select>
            </div>

            <InputField
              label={t.prices.location}
              placeholder="Location"
              value={formData.location}
              onChange={(value) => setFormData({ ...formData, location: value })}
              required
            />

            <button
              type="submit"
              disabled={predicting}
              className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition disabled:opacity-50 mt-6"
            >
              {predicting ? t.predictions.generatingPrediction : t.predictions.requestPrediction}
            </button>
          </form>
        </div>

        {/* Predictions List */}
        <div>
          <h2 className="text-2xl font-bold mb-4">{t.predictions.forecast}</h2>
          {predictions.length > 0 ? (
            <div className="space-y-4">
              {predictions.map((pred) => (
                <div key={pred._id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-primary">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-gray-600">{t.prices.vegetable}</p>
                      <p className="text-lg font-semibold">{pred.vegetableId?.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">{t.prices.location}</p>
                      <p className="text-lg font-semibold">{pred.location}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">{t.predictions.predictedPrice}</p>
                      <p className="text-xl font-bold text-primary">₹{pred.predictedPrice}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">{t.predictions.confidence}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-accent h-2 rounded-full"
                          style={{ width: `${pred.confidence}%` }}
                        ></div>
                      </div>
                      <p className="text-sm font-semibold mt-1">{pred.confidence}%</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-4">{new Date(pred.date).toLocaleString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-8">No predictions yet. Request one above!</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PredictionsPage;
