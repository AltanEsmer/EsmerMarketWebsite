"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import { LanguageProvider } from "../lib/LanguageContext";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { useEffect } from "react";
import "../lib/i18n";
import { useTranslation } from "react-i18next";
import FirebaseInit from "./components/FirebaseInit";

const inter = Inter({ subsets: ["latin"] });

function Navigation() {
  const { isSignedIn, isLoaded, userId } = useAuth();
  const { t } = useTranslation();
  
  // Admin check - same admin list as in admin/reservations/page.tsx
  const adminUserIds = ['user_2aO3r6V1BzvlMWQeXK8SFLlPoBX']; 
  const isAdmin = adminUserIds.includes(userId || '');
  
  useEffect(() => {
    // Mobile Menu Toggle
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuButton && mobileMenu) {
      menuButton.addEventListener('click', function() {
        const expanded = menuButton.getAttribute('aria-expanded') === 'true';
        menuButton.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        mobileMenu.classList.toggle('hidden');
      });
    }
    
    return () => {
      if (menuButton) {
        menuButton.removeEventListener('click', () => {});
      }
    };
  }, []);
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="text-xl font-bold text-green-600">Esmer Market</a>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">{t('navigation.home')}</a>
            <a href="/about" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">{t('navigation.about')}</a>
            {isSignedIn && (
              <>
                <a href="/products" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">{t('navigation.products')}</a>
                <a href="/reservations" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">{t('navigation.reservations')}</a>
                <a href="/reservations/lookup" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">{t('navigation.lookup')}</a>
                {isAdmin && (
                  <a href="/admin/reservations" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">{t('navigation.admin')}</a>
                )}
              </>
            )}
            <a href="/location" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">{t('navigation.location')}</a>
            <a href="/contact" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">{t('navigation.contact')}</a>
            {isSignedIn && (
              <a href="/news" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">{t('navigation.news')}</a>
            )}
            <div className="auth-buttons flex items-center">
              <UserButton afterSignOutUrl="/" />
              {!isSignedIn && (
                <SignInButton mode="modal">
                  <button className="ml-4 inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2">
                    {t('navigation.signin')}
                  </button>
                </SignInButton>
              )}
              <LanguageSwitcher />
            </div>
          </nav>
          <div className="md:hidden flex items-center">
            <div className="md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-600"
                id="mobile-menu-button"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="md:hidden hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <a href="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600 rounded-md">{t('navigation.home')}</a>
          <a href="/about" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600 rounded-md">{t('navigation.about')}</a>
          {isSignedIn && (
            <>
              <a href="/products" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600 rounded-md">{t('navigation.products')}</a>
              <a href="/reservations" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600 rounded-md">{t('navigation.reservations')}</a>
              <a href="/reservations/lookup" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600 rounded-md">{t('navigation.lookup')}</a>
              {isAdmin && (
                <a href="/admin/reservations" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600 rounded-md">{t('navigation.admin')}</a>
              )}
            </>
          )}
          <a href="/location" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600 rounded-md">{t('navigation.location')}</a>
          <a href="/contact" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600 rounded-md">{t('navigation.contact')}</a>
          {isSignedIn && (
            <a href="/news" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600 rounded-md">{t('navigation.news')}</a>
          )}
          <div className="px-3 py-2">
            <div className="auth-buttons flex items-center space-x-4">
              <UserButton afterSignOutUrl="/" />
              {!isSignedIn && (
                <SignInButton mode="modal">
                  <button className="inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2">
                    {t('navigation.signin')}
                  </button>
                </SignInButton>
              )}
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { t } = useTranslation();
  
  return (
    <ClerkProvider>
      <LanguageProvider>
        <html lang="en">
          <body className={inter.className}>
            <FirebaseInit />
            <Navigation />
            <main className="min-h-screen">{children}</main>
            <footer className="bg-white border-t">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-900">Esmer Market</h3>
                    <p className="text-sm text-gray-600">{t('footer.description')}</p>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">{t('footer.shop')}</h3>
                    <ul className="space-y-2">
                      <li><a href="/products" className="text-sm text-gray-600 hover:text-green-600">{t('footer.all_products')}</a></li>
                      <li><a href="/products#fresh-produce" className="text-sm text-gray-600 hover:text-green-600">{t('footer.fresh_produce')}</a></li>
                      <li><a href="/products#bakery" className="text-sm text-gray-600 hover:text-green-600">{t('footer.bakery')}</a></li>
                      <li><a href="/products#dairy-cheese" className="text-sm text-gray-600 hover:text-green-600">{t('footer.dairy_cheese')}</a></li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">{t('footer.company')}</h3>
                    <ul className="space-y-2">
                      <li><a href="/about" className="text-sm text-gray-600 hover:text-green-600">{t('footer.about_us')}</a></li>
                      <li><a href="/location" className="text-sm text-gray-600 hover:text-green-600">{t('footer.location_hours')}</a></li>
                      <li><a href="/contact" className="text-sm text-gray-600 hover:text-green-600">{t('footer.contact_us')}</a></li>
                      <li><a href="/news" className="text-sm text-gray-600 hover:text-green-600">{t('footer.news_events')}</a></li>
                      <li><a href="/reservations" className="text-sm text-gray-600 hover:text-green-600">{t('navigation.reservations')}</a></li>
                      <li><a href="/reservations/lookup" className="text-sm text-gray-600 hover:text-green-600">{t('navigation.lookup')}</a></li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">{t('footer.contact')}</h3>
                    <address className="text-sm not-italic text-gray-600">
                      <p>Yenikent Bulvarı</p>
                      <p>Yeni Boğaziçi</p>
                      <p className="mt-2">+905338257214</p>
                      <p>info@esmermarket.com</p>
                    </address>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <p className="text-sm text-gray-500 text-center">© {new Date().getFullYear()} Esmer Market. {t('footer.rights_reserved')}</p>
                </div>
              </div>
            </footer>
          </body>
        </html>
      </LanguageProvider>
    </ClerkProvider>
  );
}
