"use client";

import { useState, FormEvent, useEffect } from 'react';
import { signIn } from '../../lib/firebase/auth';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [configError, setConfigError] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Check if Firebase environment variables are set
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
    
    if (!apiKey || !authDomain) {
      setConfigError(true);
      setError('Firebase yapılandırması eksik. Lütfen .env.local dosyasını kontrol edin.');
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (configError) {
      setError('Firebase yapılandırması eksik. Lütfen .env.local dosyasını kontrol edin.');
      return;
    }
    
    if (!email || !password) {
      setError('Lütfen e-posta ve şifre girin.');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const { user, error: loginError } = await signIn(email, password);
      
      if (user) {
        console.log("Login successful, reloading page...");
        setLoginSuccess(true);
        
        // Simple reload approach - middleware will handle redirection
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        setError(loginError || 'Giriş yapılırken bir hata oluştu.');
        setLoading(false);
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError('Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.');
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 max-w-md w-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Yönetici Girişi</h2>
      
      {loginSuccess && (
        <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-800 rounded-md text-green-800 dark:text-green-200">
          Giriş başarılı! Yönlendiriliyorsunuz...
        </div>
      )}
      
      {error && !loginSuccess && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 border border-red-200 dark:border-red-800 rounded-md text-red-800 dark:text-red-200">
          {error}
        </div>
      )}
      
      {configError ? (
        <div className="mb-4 p-3 bg-yellow-100 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-800 rounded-md text-yellow-800 dark:text-yellow-200">
          <p className="font-bold mb-1">Firebase yapılandırması eksik</p>
          <p>Lütfen .env.local dosyasını oluşturun ve Firebase yapılandırma değerlerini ekleyin:</p>
          <pre className="mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs overflow-auto">
            {`NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id`}
          </pre>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              E-posta
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
              placeholder="ornek@esmermarket.com"
              disabled={loading || loginSuccess}
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Şifre
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
              disabled={loading || loginSuccess}
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading || loginSuccess}
            className={`w-full py-2 px-4 rounded-md font-medium text-white ${
              loading || loginSuccess
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
            }`}
          >
            {loading ? 'Giriş yapılıyor...' : loginSuccess ? 'Giriş başarılı!' : 'Giriş Yap'}
          </button>
        </form>
      )}
    </div>
  );
} 