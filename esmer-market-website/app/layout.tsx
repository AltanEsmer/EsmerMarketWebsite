"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignInButton, UserButton, useAuth } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

function Navigation() {
  const { isSignedIn } = useAuth();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="text-xl font-bold text-green-600">Esmer Market</a>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">Home</a>
            <a href="/about" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">About Us</a>
            {isSignedIn && (
              <a href="/products" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">Products</a>
            )}
            <a href="/location" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">Location & Hours</a>
            <a href="/contact" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">Contact</a>
            {isSignedIn && (
              <a href="/news" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">News & Promotions</a>
            )}
            <div className="auth-buttons">
              <UserButton afterSignOutUrl="/" />
              {!isSignedIn && (
                <SignInButton mode="modal">
                  <button className="ml-4 inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2">
                    Sign In
                  </button>
                </SignInButton>
              )}
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
          <a href="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600 rounded-md">Home</a>
          <a href="/about" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600 rounded-md">About Us</a>
          {isSignedIn && (
            <a href="/products" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600 rounded-md">Products</a>
          )}
          <a href="/location" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600 rounded-md">Location & Hours</a>
          <a href="/contact" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600 rounded-md">Contact</a>
          {isSignedIn && (
            <a href="/news" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600 rounded-md">News & Promotions</a>
          )}
          <div className="px-3 py-2">
            <div className="auth-buttons flex items-center space-x-4">
              <UserButton afterSignOutUrl="/" />
              {!isSignedIn && (
                <SignInButton mode="modal">
                  <button className="inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2">
                    Sign In
                  </button>
                </SignInButton>
              )}
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
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <footer className="bg-white border-t">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">Esmer Market</h3>
                  <p className="text-sm text-gray-600">Your local grocery store for fresh produce, specialty items, and everyday essentials.</p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Shop</h3>
                  <ul className="space-y-2">
                    <li><a href="/products" className="text-sm text-gray-600 hover:text-green-600">All Products</a></li>
                    <li><a href="/products#fresh-produce" className="text-sm text-gray-600 hover:text-green-600">Fresh Produce</a></li>
                    <li><a href="/products#bakery" className="text-sm text-gray-600 hover:text-green-600">Bakery</a></li>
                    <li><a href="/products#dairy-cheese" className="text-sm text-gray-600 hover:text-green-600">Dairy & Cheese</a></li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Company</h3>
                  <ul className="space-y-2">
                    <li><a href="/about" className="text-sm text-gray-600 hover:text-green-600">About Us</a></li>
                    <li><a href="/location" className="text-sm text-gray-600 hover:text-green-600">Location & Hours</a></li>
                    <li><a href="/contact" className="text-sm text-gray-600 hover:text-green-600">Contact Us</a></li>
                    <li><a href="/news" className="text-sm text-gray-600 hover:text-green-600">News & Events</a></li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Contact</h3>
                  <address className="text-sm not-italic text-gray-600">
                    <p>Yenikent Bulvarı</p>
                    <p>Yeni Boğaziçi</p>
                    <p className="mt-2">+905338214575</p>
                    <p>info@esmermarket.com</p>
                  </address>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500 text-center">© {new Date().getFullYear()} Esmer Market. All rights reserved.</p>
              </div>
            </div>
          </footer>

          {/* Scripts */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                document.addEventListener('DOMContentLoaded', function() {
                  // Mobile Menu Toggle
                  const menuButton = document.getElementById('mobile-menu-button');
                  const mobileMenu = document.getElementById('mobile-menu');
                  
                  if (menuButton && mobileMenu) {
                    menuButton.addEventListener('click', function() {
                      const expanded = menuButton.getAttribute('aria-expanded') === 'true';
                      menuButton.setAttribute('aria-expanded', !expanded);
                      mobileMenu.classList.toggle('hidden');
                    });
                  }
                });
              `,
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
