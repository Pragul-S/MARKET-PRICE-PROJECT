import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import InputField from '@/components/InputField';
import { useAuthStore, useLanguageStore } from '@/store';
import { translations } from '@/i18n/translations';
import { authAPI } from '@/utils/api';

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated, user, setAuth } = useAuthStore();
  const { language } = useLanguageStore();
  const t = translations[language];

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    shopName: '',
    farmDetails: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        location: user.location || '',
        shopName: user.shopName || '',
        farmDetails: user.farmDetails || '',
      });
    }
    setLoading(false);
  }, [isAuthenticated, user, router]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const response = await authAPI.updateProfile(formData);
      setAuth(response.data.user, user.token);
      setMessage(t.profile.profileUpdated);
    } catch (error) {
      setMessage('Error updating profile');
    } finally {
      setSaving(false);
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
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-primary mb-6">{t.profile.myProfile}</h1>

          <div className="bg-primary text-white p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold">{user?.name}</h2>
            <p className="text-sm opacity-90">{user?.email}</p>
            <p className="text-sm opacity-90 capitalize">{user?.role}</p>
          </div>

          {message && (
            <div
              className={`mb-4 p-4 rounded-lg ${
                message.includes('updated') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label={t.auth.name}
                value={formData.name}
                onChange={(value) => handleInputChange('name', value)}
              />

              <InputField
                label={t.auth.phone}
                value={formData.phone}
                onChange={(value) => handleInputChange('phone', value)}
              />

              <InputField
                label={t.auth.location}
                value={formData.location}
                onChange={(value) => handleInputChange('location', value)}
              />

              {user?.role === 'dealer' && (
                <InputField
                  label={t.auth.shopName}
                  value={formData.shopName}
                  onChange={(value) => handleInputChange('shopName', value)}
                />
              )}

              {user?.role === 'farmer' && (
                <InputField
                  label={t.auth.farmDetails}
                  value={formData.farmDetails}
                  onChange={(value) => handleInputChange('farmDetails', value)}
                />
              )}
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-secondary transition disabled:opacity-50 mt-6"
            >
              {saving ? t.common.loading : t.profile.editProfile}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
