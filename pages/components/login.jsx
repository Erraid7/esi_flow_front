import { useState } from 'react';
import axios from 'axios';
import { useLanguage } from '../translations/contexts/languageContext';


export default function Login() {
  const { t, toggleLanguage } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, { email, password });
      // Save token, redirect, etc.
      console.log(res.data);
    } catch (err) {
      setError(t('login', 'error'));
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <button
        onClick={toggleLanguage}
        className="absolute top-4 right-4 px-3 py-1 bg-gray-200 text-gray-800 rounded text-sm"
      >
        {t('common', 'toggleLanguage')}
      </button>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <h2 className="text-2xl mb-4">{t('login', 'title')}</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          placeholder={t('login', 'emailPlaceholder')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
        />
        <input
          type="password"
          placeholder={t('login', 'passwordPlaceholder')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          {t('login', 'button')}
        </button>
      </form>
    </div>
  );
}