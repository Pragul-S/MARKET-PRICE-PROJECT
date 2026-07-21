import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { useAuthStore, useLanguageStore } from '@/store';
import { translations } from '@/i18n/translations';
import { priceAPI } from '@/utils/api';
import PriceCard from '@/components/PriceCard';

const DashboardPage: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const { language } = useLanguageStore();
  const t = translations[language];

  const [prices, setPrices] = useState<any[]>([]);
  const [predictions, setPredictions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const [pricesRes, predictionsRes] = await Promise.all([
          priceAPI.getMarketPrices({ limit: 6 }),
          priceAPI.getPredictions({ limit: 3 }),
        ]);

        setPrices(pricesRes.data.prices || []);
        setPredictions(predictionsRes.data.predictions || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, router]);

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
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-2">
            {t.dashboard.welcome}, {user?.name}! 👋
          </h1>
          <p className="text-lg opacity-90">
            {user?.role === 'farmer'
              ? 'Monitor market prices for your products'
              : 'Update prices for your customers'}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {user?.role === 'dealer' && (
            <button
              onClick={() => router.push('/prices?action=add')}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition border-2 border-primary"
            >
              <div className="text-4xl mb-2">➕</div>
              <h3 className="font-semibold text-lg">{t.prices.addNewPrice}</h3>
            </button>
          )}

          <button
            onClick={() => router.push('/prices')}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition border-2 border-primary"
          >
            <div className="text-4xl mb-2">📊</div>
            <h3 className="font-semibold text-lg">{t.dashboard.todaysPrices}</h3>
          </button>

          <button
            onClick={() => router.push('/predictions')}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition border-2 border-primary"
          >
            <div className="text-4xl mb-2">🔮</div>
            <h3 className="font-semibold text-lg">{t.predictions.pricePredict}</h3>
          </button>
        </div>

        {/* Recent Prices */}
        <div>
          <h2 className="text-2xl font-bold mb-4">{t.prices.recentPrices}</h2>
          {prices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {prices.map((price) => (
                <PriceCard
                  key={price._id}
                  vegetable={price.vegetableId?.name || 'Unknown'}
                  vegetableTa={price.vegetableId?.nameInTamil}
                  price={price.price}
                  location={price.location}
                  quality={price.quality}
                  date={price.date}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-8">No prices available yet</p>
          )}
        </div>

        {/* AI Predictions */}
        <div>
          <h2 className="text-2xl font-bold mb-4">{t.predictions.aiPredictions}</h2>
          {predictions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {predictions.map((pred) => (
                <div key={pred._id} className="bg-white p-4 rounded-lg shadow-md border-l-4 border-accent">
                  <h3 className="font-semibold">{pred.vegetableId?.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{pred.location}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-600">{t.predictions.predictedPrice}</p>
                      <p className="text-2xl font-bold text-primary">₹{pred.predictedPrice}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">{t.predictions.confidence}</p>
                      <p className="text-2xl font-bold text-accent">{pred.confidence}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-8">No predictions available</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
