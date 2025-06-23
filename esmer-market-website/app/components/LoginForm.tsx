"use client";

import { useState, FormEvent } from 'react';
import { signIn } from '../../lib/firebase/auth';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    setDebugInfo(null);

    try {
      // Debug info
      let debug = `Attempting login with email: ${email}\n`;
      debug += `Time: ${new Date().toISOString()}\n`;

      // Attempt to sign in
      const { user, error } = await signIn(email, password);

      if (error) {
        setError(error);
        debug += `Error: ${error}\n`;
      } else if (user) {
        setSuccess('Giriş başarılı! Yönlendiriliyorsunuz...');
        debug += `Success! User: ${user.email}\n`;
        debug += `UID: ${user.uid}\n`;
        
        // Redirect to admin page
        setTimeout(() => {
          router.push('/admin');
        }, 1000);
      } else {
        setError('Bilinmeyen bir hata oluştu.');
        debug += 'Unknown error: No user and no error returned\n';
      }

      // Set debug info
      setDebugInfo(debug);
    } catch (err: any) {
      console.error('Login error:', err);
      setError(`Hata: ${err.message}`);
      setDebugInfo(`Caught exception: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Yönetici Girişi</h2>
      
      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-200 rounded-md text-green-800">
          {success}
        </div>
      )}
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-200 rounded-md text-red-800">
          {error}
        </div>
      )}
      
      {debugInfo && (
        <div className="mb-4 p-3 bg-yellow-100 border border-yellow-200 rounded-md text-yellow-800">
          <p>Debug Info:</p>
          <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
            {debugInfo}
          </pre>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            E-posta
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Şifre
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
            loading ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
        </button>
      </form>
    </div>
  );
} 