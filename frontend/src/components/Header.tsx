import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuthStore, useLanguageStore } from '@/store';
import { translations } from '@/i18n/translations';
import { FiLogOut, FiGlobe } from 'react-icons/fi';

const Header: React.FC = () => {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuthStore();
  const { language, setLanguage } = useLanguageStore();
  const t = translations[language];

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleLanguageChange = () => {
    setLanguage(language === 'en' ? 'ta' : 'en');
  };

  return (
    <header className="bg-white shadow-md border-b-4 border-primary">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-3xl font-bold text-primary">🥬</div>
          <div className="hidden sm:block">
            <h1 className="text-2xl font-bold text-primary">MarketPrice</h1>
            <p className="text-xs text-gray-600">Vegetable Price Assistant</p>
          </div>
        </Link>

        <nav className="hidden md:flex gap-6">
          {isAuthenticated ? (
            <>
              <Link href="/dashboard" className="text-gray-700 hover:text-primary font-medium">
                {t.nav.dashboard}
              </Link>
              <Link href="/prices" className="text-gray-700 hover:text-primary font-medium">
                {t.nav.prices}
              </Link>
              <Link href="/predictions" className="text-gray-700 hover:text-primary font-medium">
                {t.nav.predictions}
              </Link>
              <Link href="/profile" className="text-gray-700 hover:text-primary font-medium">
                {t.nav.profile}
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-700 hover:text-primary font-medium">
                {t.nav.login}
              </Link>
              <Link href="/register" className="text-gray-700 hover:text-primary font-medium">
                {t.nav.register}
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={handleLanguageChange}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
            title="Toggle language"
          >
            <FiGlobe className="text-xl" />
            <span className="text-sm font-medium">{language.toUpperCase()}</span>
          </button>

          {isAuthenticated && (
            <>
              <span className="text-sm text-gray-600 hidden sm:inline">{user?.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                <FiLogOut className="text-xl" />
                <span className="text-sm font-medium">{t.common.logout}</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
