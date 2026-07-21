import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import InputField from '@/components/InputField';
import { useAuthStore, useLanguageStore } from '@/store';
import { translations } from '@/i18n/translations';
import { priceAPI, vegetableAPI } from '@/utils/api';
import PriceCard from '@/components/PriceCard';

const PricesPage: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const { language } = useLanguageStore();
  const t = translations[language];

  const [prices, setPrices] = useState<any[]>([]);
  const [vegetables, setVegetables] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  const [formData, setFormData] = useState({
    vegetableId: '',
    price: '',
    location: '',
    quality: 'medium',
    quantity: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const [pricesRes, vegsRes] = await Promise.all([
          priceAPI.getMarketPrices(),
          vegetableAPI.getAllVegetables(),
        ]);

        setPrices(pricesRes.data.prices || []);
        setVegetables(vegsRes.data.vegetables || []);
      } catch (error) {
        console.error('Error fetching prices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, router]);

  const handleAddPrice = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await priceAPI.addPrice({
        ...formData,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity) || 0,
      });

      setFormData({ vegetableId: '', price: '', location: '', quality: 'medium', quantity: '' });
      setShowAddForm(false);

      // Refresh prices
      const response = await priceAPI.getMarketPrices();
      setPrices(response.data.prices || []);
    } catch (error) {
      console.error('Error adding price:', error);
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
        <h1 className="text-3xl font-bold text-primary">{t.nav.prices}</h1>

        {/* Add Price Form (Dealer only) */}
        {user?.role === 'dealer' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary transition mb-4"
            >
              {showAddForm ? t.common.cancel : t.prices.addNewPrice}
            </button>

            {showAddForm && (
              <form onSubmit={handleAddPrice} className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  label={t.prices.price}
                  type="number"
                  placeholder="Enter price"
                  value={formData.price}
                  onChange={(value) => setFormData({ ...formData, price: value })}
                  required
                />

                <InputField
                  label={t.prices.location}
                  placeholder="Location"
                  value={formData.location}
                  onChange={(value) => setFormData({ ...formData, location: value })}
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.prices.quality}</label>
                  <select
                    value={formData.quality}
                    onChange={(e) => setFormData({ ...formData, quality: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="high">{t.prices.high}</option>
                    <option value="medium">{t.prices.medium}</option>
                    <option value="low">{t.prices.low}</option>
                  </select>
                </div>

                <InputField
                  label={t.prices.quantity}
                  type="number"
                  placeholder="Quantity"
                  value={formData.quantity}
                  onChange={(value) => setFormData({ ...formData, quantity: value })}
                />

                <button
                  type="submit"
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary transition col-span-1 md:col-span-2"
                >
                  {t.common.save}
                </button>
              </form>
            )}
          </div>
        )}

        {/* Prices Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-4">{t.dashboard.todaysPrices}</h2>
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
            <p className="text-gray-600 text-center py-8">No prices available</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PricesPage;
