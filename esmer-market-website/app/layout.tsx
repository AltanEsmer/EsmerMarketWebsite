import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Esmer Market - Fresh Groceries & Specialty Items",
  description: "Discover fresh produce, specialty items, and everyday groceries at Esmer Market. Visit us in-store or explore our offerings online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <a href="/" className="text-xl font-bold text-green-600">Esmer Market</a>
              </div>
              <nav className="hidden md:flex items-center space-x-8">
                <a href="/" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">Home</a>
                <a href="/about" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">About Us</a>
                <a href="/products" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">Products</a>
                <a href="/location" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">Location & Hours</a>
                <a href="/contact" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">Contact</a>
                <a href="/news" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">News & Promotions</a>
                <div className="relative inline-block text-left" id="language-switcher">
                  <button 
                    type="button" 
                    className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                    id="language-switcher-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span id="current-language">English</span>
                    <svg className="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div 
                    className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden" 
                    role="menu" 
                    aria-orientation="vertical" 
                    id="language-menu" 
                    aria-labelledby="language-switcher-button" 
                    tabIndex={-1}
                  >
                    <div className="py-1" role="none">
                      <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem" tabIndex={-1} id="lang-en">English</a>
                      <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem" tabIndex={-1} id="lang-tr">Türkçe</a>
                    </div>
                  </div>
                </div>
              </nav>
              <div className="md:hidden flex items-center space-x-4">
                <div className="relative inline-block text-left" id="mobile-language-switcher">
                  <button 
                    type="button" 
                    className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-1 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                    id="mobile-language-switcher-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span id="mobile-current-language">EN</span>
                    <svg className="ml-1 h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div 
                    className="absolute right-0 z-10 mt-2 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden" 
                    role="menu" 
                    aria-orientation="vertical" 
                    id="mobile-language-menu" 
                    aria-labelledby="mobile-language-switcher-button" 
                    tabIndex={-1}
                  >
                    <div className="py-1" role="none">
                      <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem" tabIndex={-1} id="mobile-lang-en">English</a>
                      <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem" tabIndex={-1} id="mobile-lang-tr">Türkçe</a>
                    </div>
                  </div>
                </div>
                <button 
                  className="text-gray-500 hover:text-gray-600 focus:outline-none"
                  id="mobile-menu-button"
                  aria-expanded="false"
                  aria-label="Toggle navigation menu"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {/* Mobile menu, hidden by default */}
          <div className="hidden border-t" id="mobile-menu">
            <div className="container mx-auto px-4 py-3 space-y-1">
              <a href="/" className="block py-2 px-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600 rounded-md">Home</a>
              <a href="/about" className="block py-2 px-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600 rounded-md">About Us</a>
              <a href="/products" className="block py-2 px-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600 rounded-md">Products</a>
              <a href="/location" className="block py-2 px-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600 rounded-md">Location & Hours</a>
              <a href="/contact" className="block py-2 px-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600 rounded-md">Contact</a>
              <a href="/news" className="block py-2 px-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600 rounded-md">News & Promotions</a>
            </div>
          </div>
        </header>
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

                // Language Switcher - Desktop
                const langButton = document.getElementById('language-switcher-button');
                const langMenu = document.getElementById('language-menu');
                const currentLang = document.getElementById('current-language');
                const langEn = document.getElementById('lang-en');
                const langTr = document.getElementById('lang-tr');
                
                if (langButton && langMenu) {
                  langButton.addEventListener('click', function() {
                    const expanded = langButton.getAttribute('aria-expanded') === 'true';
                    langButton.setAttribute('aria-expanded', !expanded);
                    langMenu.classList.toggle('hidden');
                  });
                  
                  // Close the menu when clicking outside
                  document.addEventListener('click', function(event) {
                    if (!langButton.contains(event.target) && !langMenu.contains(event.target)) {
                      langButton.setAttribute('aria-expanded', 'false');
                      langMenu.classList.add('hidden');
                    }
                  });
                  
                  // Language selection
                  if (langEn && langTr && currentLang) {
                    langEn.addEventListener('click', function(e) {
                      e.preventDefault();
                      currentLang.textContent = 'English';
                      langMenu.classList.add('hidden');
                      document.documentElement.lang = 'en';
                      setLanguage('en');
                    });
                    
                    langTr.addEventListener('click', function(e) {
                      e.preventDefault();
                      currentLang.textContent = 'Türkçe';
                      langMenu.classList.add('hidden');
                      document.documentElement.lang = 'tr';
                      setLanguage('tr');
                    });
                  }
                }
                
                // Language Switcher - Mobile
                const mobileLangButton = document.getElementById('mobile-language-switcher-button');
                const mobileLangMenu = document.getElementById('mobile-language-menu');
                const mobileCurrentLang = document.getElementById('mobile-current-language');
                const mobileLangEn = document.getElementById('mobile-lang-en');
                const mobileLangTr = document.getElementById('mobile-lang-tr');
                
                if (mobileLangButton && mobileLangMenu) {
                  mobileLangButton.addEventListener('click', function() {
                    const expanded = mobileLangButton.getAttribute('aria-expanded') === 'true';
                    mobileLangButton.setAttribute('aria-expanded', !expanded);
                    mobileLangMenu.classList.toggle('hidden');
                  });
                  
                  // Close the menu when clicking outside
                  document.addEventListener('click', function(event) {
                    if (!mobileLangButton.contains(event.target) && !mobileLangMenu.contains(event.target)) {
                      mobileLangButton.setAttribute('aria-expanded', 'false');
                      mobileLangMenu.classList.add('hidden');
                    }
                  });
                  
                  // Language selection
                  if (mobileLangEn && mobileLangTr && mobileCurrentLang) {
                    mobileLangEn.addEventListener('click', function(e) {
                      e.preventDefault();
                      mobileCurrentLang.textContent = 'EN';
                      mobileLangMenu.classList.add('hidden');
                      document.documentElement.lang = 'en';
                      setLanguage('en');
                    });
                    
                    mobileLangTr.addEventListener('click', function(e) {
                      e.preventDefault();
                      mobileCurrentLang.textContent = 'TR';
                      mobileLangMenu.classList.add('hidden');
                      document.documentElement.lang = 'tr';
                      setLanguage('tr');
                    });
                  }
                }
                
                // Function to set language and translate content
                function setLanguage(lang) {
                  const translations = {
                    en: {
                      home: 'Home',
                      about: 'About Us',
                      products: 'Products',
                      location: 'Location & Hours',
                      contact: 'Contact',
                      news: 'News & Promotions',
                      shop: 'Shop',
                      allProducts: 'All Products',
                      freshProduce: 'Fresh Produce',
                      bakery: 'Bakery',
                      dairyAndCheese: 'Dairy & Cheese',
                      company: 'Company',
                      aboutUs: 'About Us',
                      locationAndHours: 'Location & Hours',
                      contactUs: 'Contact Us',
                      newsAndEvents: 'News & Events',
                      contactInfo: 'Contact'
                    },
                    tr: {
                      home: 'Ana Sayfa',
                      about: 'Hakkımızda',
                      products: 'Ürünler',
                      location: 'Konum & Çalışma Saatleri',
                      contact: 'İletişim',
                      news: 'Haberler & Promosyonlar',
                      shop: 'Alışveriş',
                      allProducts: 'Tüm Ürünler',
                      freshProduce: 'Taze Ürünler',
                      bakery: 'Fırın',
                      dairyAndCheese: 'Süt Ürünleri & Peynir',
                      company: 'Şirket',
                      aboutUs: 'Hakkımızda',
                      locationAndHours: 'Konum & Çalışma Saatleri',
                      contactUs: 'İletişim',
                      newsAndEvents: 'Haberler & Etkinlikler',
                      contactInfo: 'İletişim'
                    }
                  };
                  
                  // Update navigation links
                  const t = translations[lang];
                  
                  // Desktop Menu
                  const navLinks = document.querySelectorAll('nav a');
                  if (navLinks.length >= 6) {
                    navLinks[0].textContent = t.home;
                    navLinks[1].textContent = t.about;
                    navLinks[2].textContent = t.products;
                    navLinks[3].textContent = t.location;
                    navLinks[4].textContent = t.contact;
                    navLinks[5].textContent = t.news;
                  }
                  
                  // Mobile Menu
                  const mobileNavLinks = document.querySelectorAll('#mobile-menu a');
                  if (mobileNavLinks.length >= 6) {
                    mobileNavLinks[0].textContent = t.home;
                    mobileNavLinks[1].textContent = t.about;
                    mobileNavLinks[2].textContent = t.products;
                    mobileNavLinks[3].textContent = t.location;
                    mobileNavLinks[4].textContent = t.contact;
                    mobileNavLinks[5].textContent = t.news;
                  }
                  
                  // Footer
                  const footerHeadings = document.querySelectorAll('footer h3');
                  if (footerHeadings.length >= 4) {
                    footerHeadings[1].textContent = t.shop;
                    footerHeadings[2].textContent = t.company;
                    footerHeadings[3].textContent = t.contactInfo;
                  }
                  
                  const footerShopLinks = document.querySelectorAll('footer ul:nth-of-type(1) a');
                  if (footerShopLinks.length >= 4) {
                    footerShopLinks[0].textContent = t.allProducts;
                    footerShopLinks[1].textContent = t.freshProduce;
                    footerShopLinks[2].textContent = t.bakery;
                    footerShopLinks[3].textContent = t.dairyAndCheese;
                  }
                  
                  const footerCompanyLinks = document.querySelectorAll('footer ul:nth-of-type(2) a');
                  if (footerCompanyLinks.length >= 4) {
                    footerCompanyLinks[0].textContent = t.aboutUs;
                    footerCompanyLinks[1].textContent = t.locationAndHours;
                    footerCompanyLinks[2].textContent = t.contactUs;
                    footerCompanyLinks[3].textContent = t.newsAndEvents;
                  }
                  
                  // Store language preference
                  localStorage.setItem('esmerMarketLang', lang);
                }
                
                // Initialize language from stored preference or default to English
                const storedLang = localStorage.getItem('esmerMarketLang');
                if (storedLang) {
                  if (storedLang === 'tr') {
                    document.getElementById('current-language').textContent = 'Türkçe';
                    document.getElementById('mobile-current-language').textContent = 'TR';
                    document.documentElement.lang = 'tr';
                    setLanguage('tr');
                  } else {
                    document.getElementById('current-language').textContent = 'English';
                    document.getElementById('mobile-current-language').textContent = 'EN';
                    document.documentElement.lang = 'en';
                    setLanguage('en');
                  }
                }
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
