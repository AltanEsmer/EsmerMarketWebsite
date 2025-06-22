"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../components/AuthProvider";
import { signOut } from "../../lib/firebase/auth";

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  // No client-side redirects - rely on middleware
  
  const handleSignOut = async () => {
    await signOut();
    // After sign out, do a full page reload
    window.location.href = '/login';
  };
  
  // If still checking auth state, show loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }
  
  // If not logged in, show a message
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Yetkilendirme Gerekli</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">Bu sayfaya erişmek için giriş yapmanız gerekmektedir.</p>
          <a 
            href="/login" 
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 inline-block"
          >
            Giriş Sayfasına Git
          </a>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-16 lg:py-20 bg-green-50 dark:bg-green-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-gray-900 dark:text-gray-100">
                Yönetici Paneli
              </h1>
              <button
                onClick={handleSignOut}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Çıkış Yap
              </button>
            </div>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">
              Esmer Market web sitesi içeriklerini ve kampanyalarını yönetin.
            </p>
            <p className="text-md text-gray-600 dark:text-gray-400">
              Hoş geldiniz, {user.email}
            </p>
          </div>
        </div>
      </section>
      
      <section className="w-full py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-6 md:grid-cols-2">
              <Link href="/admin/campaigns" className="block p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Kampanyalar</h2>
                <p className="text-gray-600 dark:text-gray-300">Kampanya ve promosyonları görüntüle, düzenle ve yeni kampanyalar ekle.</p>
              </Link>
              
              <Link href="/admin/products" className="block p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Ürünler</h2>
                <p className="text-gray-600 dark:text-gray-300">Ürün kategorilerini ve ürünleri yönet.</p>
              </Link>
              
              <Link href="/admin/reservations" className="block p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Rezervasyonlar</h2>
                <p className="text-gray-600 dark:text-gray-300">Müşteri rezervasyonlarını görüntüle ve yönet.</p>
              </Link>
              
              <Link href="/admin/settings" className="block p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Ayarlar</h2>
                <p className="text-gray-600 dark:text-gray-300">Site ayarlarını ve kullanıcı hesaplarını yönet.</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 