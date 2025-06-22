"use client";

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../components/AuthProvider';

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  // No client-side redirects - rely on middleware
  
  // If still checking auth state, show loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Esmer Market
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Yönetici paneline erişmek için giriş yapın
          </p>
        </div>
        
        <LoginForm />
      </div>
    </div>
  );
} 