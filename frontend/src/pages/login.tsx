import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/Layout';
import InputField from '@/components/InputField';
import { authAPI, setAuthToken } from '@/utils/api';
import { useAuthStore, useLanguageStore } from '@/store';
import { translations } from '@/i18n/translations';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { language } = useLanguageStore();
  const { setAuth } = useAuthStore();
  const t = translations[language];

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authAPI.login(formData);
      const { user, token } = response.data;

      setAuthToken(token);
      setAuth(user, token);

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-12">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-primary mb-2 text-center">{t.auth.login}</h1>
          <p className="text-gray-600 text-center mb-6">
            {t.auth.noAccount}{' '}
            <Link href="/register" className="text-primary font-semibold hover:underline">
              {t.nav.register}
            </Link>
          </p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <InputField
              label={t.auth.email}
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(value) => handleInputChange('email', value)}
              required
            />

            <InputField
              label={t.auth.password}
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(value) => handleInputChange('password', value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-secondary transition disabled:opacity-50"
            >
              {loading ? t.common.loading : t.auth.login}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
