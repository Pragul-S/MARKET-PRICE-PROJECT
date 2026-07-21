import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/Layout';
import InputField from '@/components/InputField';
import { authAPI, setAuthToken } from '@/utils/api';
import { useAuthStore, useLanguageStore } from '@/store';
import { translations } from '@/i18n/translations';

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const { language } = useLanguageStore();
  const { setAuth } = useAuthStore();
  const t = translations[language];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'farmer',
    location: '',
    shopName: '',
    farmDetails: '',
    registrationNumber: '',
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
      const response = await authAPI.register(formData);
      const { user, token } = response.data;

      setAuthToken(token);
      setAuth(user, token);

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto mt-8">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-primary mb-2 text-center">{t.auth.register}</h1>
          <p className="text-gray-600 text-center mb-6">
            {t.auth.accountExists}{' '}
            <Link href="/login" className="text-primary font-semibold hover:underline">
              {t.auth.login}
            </Link>
          </p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label={t.auth.name}
                placeholder="Full Name"
                value={formData.name}
                onChange={(value) => handleInputChange('name', value)}
                required
              />

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

              <InputField
                label={t.auth.phone}
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(value) => handleInputChange('phone', value)}
                required
              />

              <InputField
                label={t.auth.registrationNumber}
                placeholder="Registration Number"
                value={formData.registrationNumber}
                onChange={(value) => handleInputChange('registrationNumber', value)}
                required
              />

              <InputField
                label={t.auth.location}
                placeholder="City/Village"
                value={formData.location}
                onChange={(value) => handleInputChange('location', value)}
                required
              />

              {formData.role === 'dealer' && (
                <InputField
                  label={t.auth.shopName}
                  placeholder="Shop Name"
                  value={formData.shopName}
                  onChange={(value) => handleInputChange('shopName', value)}
                />
              )}

              {formData.role === 'farmer' && (
                <InputField
                  label={t.auth.farmDetails}
                  placeholder="Farm Details"
                  value={formData.farmDetails}
                  onChange={(value) => handleInputChange('farmDetails', value)}
                />
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.auth.role} <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="farmer">{t.auth.farmer}</option>
                <option value="dealer">{t.auth.dealer}</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-secondary transition disabled:opacity-50"
            >
              {loading ? t.common.loading : t.auth.register}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;
