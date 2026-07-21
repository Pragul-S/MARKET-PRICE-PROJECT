import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { useAuthStore, useLanguageStore } from '@/store';
import { translations } from '@/i18n/translations';

const HomePage: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { language } = useLanguageStore();
  const t = translations[language];

  return (
    <Layout>
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-secondary text-white py-16 px-8 rounded-lg shadow-lg">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4">🥬 Market-Price Assistant</h1>
            <p className="text-xl mb-8 opacity-90">
              {language === 'en'
                ? 'Smart market price predictions for vegetable traders'
                : 'காய்கறி வர்த்தகர்களுக்கான ஸ்மார்ட் சந்தை விலை முன்னறிவிப்புகள்'}
            </p>

            {!isAuthenticated ? (
              <div className="flex gap-4 justify-center flex-wrap">
                <Link
                  href="/login"
                  className="bg-white text-primary px-8 py-3 font-semibold rounded-lg hover:bg-gray-100 transition"
                >
                  {t.nav.login}
                </Link>
                <Link
                  href="/register"
                  className="bg-accent text-white px-8 py-3 font-semibold rounded-lg hover:bg-yellow-600 transition"
                >
                  {t.nav.register}
                </Link>
              </div>
            ) : (
              <Link
                href="/dashboard"
                className="bg-white text-primary px-8 py-3 font-semibold rounded-lg hover:bg-gray-100 transition inline-block"
              >
                {t.nav.dashboard}
              </Link>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary">
            {language === 'en' ? 'Key Features' : 'முக்கிய பண்புகள்'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '📊',
                en: 'Real-time Market Prices',
                ta: 'நிகழ்நேர சந்தை விலைகள்',
              },
              {
                icon: '🤖',
                en: 'AI Price Predictions',
                ta: 'AI விலை முன்னறிவிப்புகள்',
              },
              {
                icon: '👨‍🌾',
                en: 'Farmer Dashboard',
                ta: 'விவசாயி டாஷ்போர்ட்',
              },
              {
                icon: '🏪',
                en: 'Dealer Portal',
                ta: 'வியாபாரி போர்টல்',
              },
              {
                icon: '📱',
                en: 'Mobile Friendly',
                ta: 'மொபைல் நட்பு',
              },
              {
                icon: '🌐',
                en: 'Bilingual Support (EN/TA)',
                ta: 'இரு மொழி ஆதரவு (EN/TA)',
              },
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">
                  {language === 'en' ? feature.en : feature.ta}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="py-12 bg-gray-100 px-8 rounded-lg">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary">
            {language === 'en' ? 'How It Works' : 'எப்படி வேலை செய்கிறது'}
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl font-bold text-primary mb-3">1️⃣</div>
                <h3 className="text-xl font-semibold mb-2">
                  {language === 'en' ? 'Register as Farmer or Dealer' : 'விவசாயி அல்லது வியாபாரியாக பதிவுசெய்யவும்'}
                </h3>
                <p className="text-gray-600">
                  {language === 'en'
                    ? 'Create your account with your role and location details'
                    : 'உங்கள் பாத்திரம் மற்றும் இருப்பிட விவரங்களுடன் உங்கள் கணக்கை உருவாக்கவும்'}
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl font-bold text-primary mb-3">2️⃣</div>
                <h3 className="text-xl font-semibold mb-2">
                  {language === 'en' ? 'View Market Prices' : 'சந்தை விலைகளைக் காண்க'}
                </h3>
                <p className="text-gray-600">
                  {language === 'en'
                    ? 'Browse real-time prices for different vegetables in your area'
                    : 'உங்கள் பகுதியில் பல்வேறு காய்கறிகளுக்கான நிகழ்நேர விலைகளைப் பbrowse செய்யவும்'}
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl font-bold text-primary mb-3">3️⃣</div>
                <h3 className="text-xl font-semibold mb-2">
                  {language === 'en' ? 'Get AI Predictions' : 'AI முன்னறிவிப்புகளைப் பெறுங்கள்'}
                </h3>
                <p className="text-gray-600">
                  {language === 'en'
                    ? 'Use AI to predict future prices and make informed decisions'
                    : 'எதிர்கால விலைகளை முன்னறிவிக்க AI ஐப் பயன்படுத்தி தகவல் அடிப்படையிலான முடிவுகளை எடுக்கவும்'}
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl font-bold text-primary mb-3">4️⃣</div>
                <h3 className="text-xl font-semibold mb-2">
                  {language === 'en' ? 'Optimize Your Business' : 'உங்கள் ব্যবসাকে অপ്টিমাইজ করুন'}
                </h3>
                <p className="text-gray-600">
                  {language === 'en'
                    ? 'Set competitive prices and maximize profits'
                    : 'போட்டিமுள்ள விலைகளை நির்ধारித்து லாபத்தை அधिकतम செய்யவும்'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        {!isAuthenticated && (
          <section className="text-center py-12">
            <h2 className="text-3xl font-bold mb-4 text-primary">
              {language === 'en'
                ? 'Ready to Get Started?'
                : 'தொடங்கத் প্রস்துતமா?'}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {language === 'en'
                ? 'Join thousands of farmers and dealers managing their market prices efficiently'
                : 'ஆயிரக்கணக்கான விவசாயிகள் மற்றும் வியாபாரிகளுடன் சேர்ந்து তাদের சந்தை விலைகளை திறமையாக நிர்வகிக்கவும்'}
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/register"
                className="bg-primary text-white px-8 py-3 font-semibold rounded-lg hover:bg-secondary transition"
              >
                {t.auth.register}
              </Link>
              <Link
                href="/login"
                className="bg-gray-300 text-gray-800 px-8 py-3 font-semibold rounded-lg hover:bg-gray-400 transition"
              >
                {t.auth.login}
              </Link>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default HomePage;
