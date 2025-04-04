"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NewsPage() {
  const router = useRouter();
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 bg-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-gray-900 mb-6">
              News & Promotions
            </h1>
            <p className="text-xl text-gray-700">
              Stay up to date with the latest happenings and special offers at Esmer Market.
            </p>
          </div>
        </div>
      </section>
      
      {/* Content Sections */}
      <section id="promotions" className="w-full py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8">
            {/* Featured Promotion */}
            <div className="rounded-lg bg-green-50 p-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                    Current Promotion
                  </span>
                  <h2 className="text-2xl font-bold text-green-900">Weekend Special: 20% Off Fresh Fruits</h2>
                  <p className="text-green-800">
                    Enjoy 20% off all fresh fruits this weekend only! Stock up on seasonal favorites 
                    including strawberries, blueberries, peaches, and more.
                  </p>
                  <p className="text-sm text-green-700">Valid: April 15-16, 2023</p>
                  <div>
                    <a
                      href="/products"
                      className="inline-flex h-10 items-center justify-center rounded-md bg-green-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-700"
                    >
                      Explore Now
                    </a>
                  </div>
                </div>
                <div className="aspect-video overflow-hidden rounded-lg bg-gray-100">
                  {/* Featured image would go here */}
                </div>
              </div>
            </div>
            
            {/* News & Updates */}
            <div className="space-y-6">
              <h2 id="latest-news" className="text-2xl font-bold">Latest News</h2>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* News Item 1 */}
                <div id="organic-section" className="group overflow-hidden rounded-lg border">
                  <div className="aspect-video w-full bg-gray-100">
                    {/* News image would go here */}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                        News
                      </span>
                      <span className="text-xs text-gray-500">April 10, 2023</span>
                    </div>
                    <h3 className="mt-2 font-semibold">New Organic Section Now Open</h3>
                    <p className="mt-2 text-sm text-gray-700">
                      We're excited to announce the opening of our expanded organic section, featuring 
                      a wider selection of organic produce, pantry staples, and specialty items.
                    </p>
                    <a
                      href="/products"
                      className="mt-3 inline-block text-sm font-medium text-green-600 hover:underline"
                    >
                      Explore More
                    </a>
                  </div>
                </div>
                
                {/* News Item 2 */}
                <div id="cooking-workshop" className="group overflow-hidden rounded-lg border">
                  <div className="aspect-video w-full bg-gray-100">
                    {/* News image would go here */}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                        Event
                      </span>
                      <span className="text-xs text-gray-500">April 5, 2023</span>
                    </div>
                    <h3 className="mt-2 font-semibold">Cooking Workshop: Mediterranean Cuisine</h3>
                    <p className="mt-2 text-sm text-gray-700">
                      Join our chef for a hands-on cooking workshop focused on Mediterranean cuisine. 
                      Learn new recipes and cooking techniques while enjoying delicious samples.
                    </p>
                    <a
                      href="#"
                      className="mt-3 inline-block text-sm font-medium text-green-600 hover:underline"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
                
                {/* News Item 3 */}
                <div id="farmer-spotlight" className="group overflow-hidden rounded-lg border">
                  <div className="aspect-video w-full bg-gray-100">
                    {/* News image would go here */}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800">
                        Community
                      </span>
                      <span className="text-xs text-gray-500">March 28, 2023</span>
                    </div>
                    <h3 className="mt-2 font-semibold">Local Farmer Spotlight: Green Acres Farm</h3>
                    <p className="mt-2 text-sm text-gray-700">
                      This month, we're highlighting Green Acres Farm, a family-owned organic farm that has 
                      been supplying us with fresh, seasonal produce for over five years.
                    </p>
                    <a
                      href="#"
                      className="mt-3 inline-block text-sm font-medium text-green-600 hover:underline"
                    >
                      Read More
                    </a>
                  </div>
                </div>
                
                {/* News Item 4 */}
                <div id="extended-hours" className="group overflow-hidden rounded-lg border">
                  <div className="aspect-video w-full bg-gray-100">
                    {/* News image would go here */}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
                        Announcement
                      </span>
                      <span className="text-xs text-gray-500">March 20, 2023</span>
                    </div>
                    <h3 className="mt-2 font-semibold">Extended Hours Starting Next Month</h3>
                    <p className="mt-2 text-sm text-gray-700">
                      Beginning May 1st, we'll be extending our weekday hours to better serve our community. 
                      The store will now be open from 7:00 AM to 9:00 PM Monday through Friday.
                    </p>
                    <a
                      href="#"
                      className="mt-3 inline-block text-sm font-medium text-green-600 hover:underline"
                    >
                      Read More
                    </a>
                  </div>
                </div>
                
                {/* News Item 5 */}
                <div id="new-arrivals" className="group overflow-hidden rounded-lg border">
                  <div className="aspect-video w-full bg-gray-100">
                    {/* News image would go here */}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                        Products
                      </span>
                      <span className="text-xs text-gray-500">March 15, 2023</span>
                    </div>
                    <h3 className="mt-2 font-semibold">New Arrivals: International Gourmet Selection</h3>
                    <p className="mt-2 text-sm text-gray-700">
                      We've added an exciting new selection of international gourmet products, including 
                      specialty spices, sauces, and hard-to-find ingredients from around the world.
                    </p>
                    <a
                      href="/products"
                      className="mt-3 inline-block text-sm font-medium text-green-600 hover:underline"
                    >
                      Explore More
                    </a>
                  </div>
                </div>
                
                {/* News Item 6 */}
                <div id="tasting-event" className="group overflow-hidden rounded-lg border">
                  <div className="aspect-video w-full bg-gray-100">
                    {/* News image would go here */}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                        Event
                      </span>
                      <span className="text-xs text-gray-500">March 8, 2023</span>
                    </div>
                    <h3 className="mt-2 font-semibold">Cheese & Wine Tasting Event</h3>
                    <p className="mt-2 text-sm text-gray-700">
                      Join us for an evening of cheese and wine tasting featuring local artisanal cheeses 
                      paired with a selection of wines from our collection.
                    </p>
                    <a
                      href="#"
                      className="mt-3 inline-block text-sm font-medium text-green-600 hover:underline"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 