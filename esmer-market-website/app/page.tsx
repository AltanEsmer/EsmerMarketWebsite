"use client";

import Image from "next/image";
import NotificationPermission from "./components/NotificationPermission";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-6 text-center">
            <div className="space-y-4 max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-green-600">
                Welcome to Esmer Market
              </h1>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                Your local grocery store for fresh produce, specialty items, and everyday essentials.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <a
                href="/products"
                className="inline-flex h-12 items-center justify-center rounded-md bg-green-600 px-8 text-base font-medium text-white shadow-sm transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
              >
                Browse Products
              </a>
              <a
                href="/location"
                className="inline-flex h-12 items-center justify-center rounded-md border border-gray-300 bg-white px-8 text-base font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
              >
                Find Our Store
              </a>
            </div>
            <div className="mt-4">
              <NotificationPermission className="p-4 bg-white rounded-md shadow-sm" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center space-y-8 text-center">
            <div className="space-y-3 max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-gray-900">Featured Products</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover our selection of fresh produce and specialty items.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-8 w-full max-w-6xl">
              {/* Product Card 1 */}
              <div className="flex flex-col rounded-lg border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
                <div className="aspect-square w-full overflow-hidden rounded-t-lg bg-gray-100 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
                  <Image
                  src="/images/VegetablesMain.jpg"
                  alt="Vegetable Main"
                  fill
                  className="object-cover"
                />                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">Fresh Organic Vegetables</h3>
                  <p className="text-gray-600">Locally sourced and organic</p>
                  <div className="pt-2">
                    <a href="/products#fresh-produce" className="text-sm font-medium text-green-600 hover:text-green-700">Explore now →</a>
                  </div>
                </div>
              </div>
              
              {/* Product Card 2 */}
              <div className="flex flex-col rounded-lg border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
                <div className="aspect-square w-full overflow-hidden rounded-t-lg bg-gray-100 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-yellow-100 flex items-center justify-center">
                  <Image
                  src="/images/CheeseMain.jpg"
                  alt="Cheese Main"
                  fill
                  className="object-cover"
                />                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">Artisanal Cheeses</h3>
                  <p className="text-gray-600">From local and international producers</p>
                  <div className="pt-2">
                    <a href="/products#dairy-cheese" className="text-sm font-medium text-green-600 hover:text-green-700">Explore now →</a>
                  </div>
                </div>
              </div>
              
              {/* Product Card 3 */}
              <div className="flex flex-col rounded-lg border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
                <div className="aspect-square w-full overflow-hidden rounded-t-lg bg-gray-100 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center">
                  <Image
                  src="/images/BreadMain.jpg"
                  alt="Bakery Main"
                  fill
                  className="object-cover"
                />
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">Fresh Baked Goods</h3>
                  <p className="text-gray-600">Baked daily in our store</p>
                  <div className="pt-2">
                    <a href="/products#bakery" className="text-sm font-medium text-green-600 hover:text-green-700">Explore now →</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <a
                href="/products"
                className="inline-flex h-10 items-center justify-center rounded-md bg-white border border-gray-300 px-8 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
              >
                View All Products
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Store Info Section */}
      <section className="w-full py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:gap-12 lg:grid-cols-2 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-gray-900">Visit Our Store</h2>
                <p className="text-lg text-gray-600">
                  Come visit us to experience our wide selection of fresh groceries and specialty items.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <a
                  href="/location"
                  className="inline-flex h-12 items-center justify-center rounded-md bg-green-600 px-8 text-base font-medium text-white shadow-sm transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
                >
                  Get Directions
                </a>
                <a
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center rounded-md border border-gray-300 bg-white px-8 text-base font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
                >
                  Contact Us
                </a>
              </div>
              <div className="mt-4 space-y-4 text-gray-600">
                <div className="flex items-start space-x-3">
                  <svg className="h-6 w-6 text-green-600 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <h3 className="font-medium text-gray-900">Address</h3>
                    <p>Yenikent Bulvarı, Yeni Boğaziçi GaziMağusa</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="h-6 w-6 text-green-600 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-medium text-gray-900">Hours</h3>
                    <p>Monday-Sunday: 8:00 AM - 12:00 AM (Midnight)</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="aspect-video overflow-hidden rounded-xl bg-gray-100 shadow-md relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col items-center justify-center p-6 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-gray-600 font-medium">Yenikent Bulvarı, Yeni Boğaziçi GaziMağusa</p>
                <p className="text-sm text-gray-500 mt-1">Visit us in store or contact us for directions</p>
                <a href="/contact" className="mt-4 inline-flex h-9 items-center justify-center rounded-md bg-green-600 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-700">
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center space-y-8 text-center">
            <div className="space-y-3 max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-gray-900">Latest News & Promotions</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Stay updated with our latest offerings and special deals.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-8 w-full max-w-6xl">
              {/* News Card 1 */}
              <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
                <div className="aspect-video w-full overflow-hidden bg-gray-100 relative">
                  {/* Replace with actual image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
                    <span className="text-red-800 text-sm">Image Placeholder</span>
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                      Special Offer
                    </span>
                    <span className="text-xs text-gray-500">April 15, 2023</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600">Weekend Special: 20% Off Fresh Fruits</h3>
                  <p className="text-sm text-gray-600">Enjoy 20% off all fresh fruits this weekend only!</p>
                  <div className="pt-2">
                    <a href="/news#promotions" className="text-sm font-medium text-green-600 hover:text-green-700">Read more →</a>
                  </div>
                </div>
              </div>
              
              {/* News Card 2 */}
              <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
                <div className="aspect-video w-full overflow-hidden bg-gray-100 relative">
                  {/* Replace with actual image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                    <span className="text-blue-800 text-sm">Image Placeholder</span>
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      News
                    </span>
                    <span className="text-xs text-gray-500">April 10, 2023</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600">New Organic Section Now Open</h3>
                  <p className="text-sm text-gray-600">We've expanded our organic section with new products.</p>
                  <div className="pt-2">
                    <a href="/news#organic-section" className="text-sm font-medium text-green-600 hover:text-green-700">Read more →</a>
                  </div>
                </div>
              </div>
              
              {/* News Card 3 */}
              <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
                <div className="aspect-video w-full overflow-hidden bg-gray-100 relative">
                  {/* Replace with actual image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center">
                    <span className="text-amber-800 text-sm">Image Placeholder</span>
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                      Event
                    </span>
                    <span className="text-xs text-gray-500">April 5, 2023</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600">Cooking Workshop: Mediterranean Cuisine</h3>
                  <p className="text-sm text-gray-600">Join our chef for a cooking workshop next Saturday!</p>
                  <div className="pt-2">
                    <a href="/news#cooking-workshop" className="text-sm font-medium text-green-600 hover:text-green-700">Read more →</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <a
                href="/news"
                className="inline-flex h-10 items-center justify-center rounded-md bg-green-600 px-8 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
              >
                View All News
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
