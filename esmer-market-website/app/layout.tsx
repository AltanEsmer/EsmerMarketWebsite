"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "../lib/LanguageContext";
import { useEffect } from "react";
import "../lib/i18n";
import { useTranslation } from "react-i18next";
import FirebaseInit from "./components/FirebaseInit";
import Image from "next/image";
import { AuthProvider } from "./components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

function Navigation() {
  const { t } = useTranslation();
  
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
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-3">
              <Image
                src="/images/MarketLogo.jpeg"
                alt="Esmer Market Logo"
                width={80}
                height={80}
                className="rounded-md"
              />
              <span className="text-xl font-bold text-green-600">Esmer Market</span>
            </a>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">{t('navigation.home')}</a>
            <a href="/about" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">{t('navigation.about')}</a>
            <a href="/gallery" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">{t('navigation.gallery')}</a>
            <a href="/location" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">{t('navigation.location')}</a>
            <a href="/contact" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">{t('navigation.contact')}</a>
            <a href="/reviews" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">{t('navigation.reviews')}</a>
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
          <a href="/gallery" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600 rounded-md">{t('navigation.gallery')}</a>
          <a href="/location" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600 rounded-md">{t('navigation.location')}</a>
          <a href="/contact" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600 rounded-md">{t('navigation.contact')}</a>
          <a href="/reviews" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600 rounded-md">{t('navigation.reviews')}</a>
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
    <LanguageProvider>
      <AuthProvider>
        <html lang="tr">
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          </head>
          <body className={`${inter.className} bg-white text-gray-800`}>
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
                      <li><a href="/gallery" className="text-sm text-gray-600 hover:text-green-600">{t('footer.gallery')}</a></li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">{t('footer.company')}</h3>
                    <ul className="space-y-2">
                      <li><a href="/about" className="text-sm text-gray-600 hover:text-green-600">{t('footer.about_us')}</a></li>
                      <li><a href="/location" className="text-sm text-gray-600 hover:text-green-600">{t('footer.location_hours')}</a></li>
                      <li><a href="/contact" className="text-sm text-gray-600 hover:text-green-600">{t('footer.contact_us')}</a></li>
                      <li><a href="/reviews" className="text-sm text-gray-600 hover:text-green-600">{t('footer.reviews')}</a></li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">{t('footer.contact')}</h3>
                    <address className="text-sm not-italic text-gray-600">
                      <p>Yenikent Bulvarı</p>
                      <p>Yeni Boğaziçi</p>
                      <p className="mt-2">+905338214575</p>
                      <p>eralp@esmermarket.com</p>
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
      </AuthProvider>
    </LanguageProvider>
  );
}
