import React from 'react';
import { useLanguageStore } from '@/store';
import { translations } from '@/i18n/translations';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

interface PriceCardProps {
  vegetable: string;
  vegetableTa?: string;
  price: number;
  location: string;
  quality: string;
  date: string;
  trend?: 'up' | 'down' | 'neutral';
}

const PriceCard: React.FC<PriceCardProps> = ({
  vegetable,
  vegetableTa,
  price,
  location,
  quality,
  date,
  trend,
}) => {
  const { language } = useLanguageStore();
  const t = translations[language];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-lg">
            {language === 'en' ? vegetable : vegetableTa || vegetable}
          </h3>
          <p className="text-sm text-gray-600">{location}</p>
        </div>
        {trend && (
          <div className={`text-2xl ${trend === 'up' ? 'text-red-500' : 'text-green-500'}`}>
            {trend === 'up' ? <FiTrendingUp /> : <FiTrendingDown />}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div>
          <p className="text-xs text-gray-600">{t.prices.price}</p>
          <p className="text-xl font-bold text-primary">₹{price}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600">{t.prices.quality}</p>
          <p className="text-sm font-medium capitalize">{quality}</p>
        </div>
      </div>

      <div className="text-xs text-gray-500 text-right">{new Date(date).toLocaleDateString()}</div>
    </div>
  );
};

export default PriceCard;
