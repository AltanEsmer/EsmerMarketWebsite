"use client";

import { SignInButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProductsPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      // Redirect to home if not signed in
      router.push('/');
    }
  }, [isSignedIn, isLoaded, router]);
  
  if (!isLoaded) {
    return <div className="container mx-auto px-4 py-16 text-center">Loading...</div>;
  }
  
  if (!isSignedIn) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-6">Access Required</h1>
        <p className="mb-6 text-gray-600">
          Please sign in to view our product catalog.
        </p>
        <SignInButton mode="modal">
          <button className="inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2">
            Sign In
          </button>
        </SignInButton>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 bg-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-gray-900 mb-6">
              Our Products
            </h1>
            <p className="text-xl text-gray-700">
              Explore our wide selection of fresh produce, specialty items, and everyday groceries.
            </p>
          </div>
        </div>
      </section>
      
      {/* Product Categories */}
      <section className="w-full py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Categories</h2>
            <p className="text-xl text-gray-600">Browse our products by category to find exactly what you need.</p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <a href="#fresh-produce" className="group flex flex-col items-center rounded-xl border border-gray-200 p-6 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md hover:border-green-600">
              <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 relative mb-4">
                <Image
                  src="/images/freshProduce.jpg"
                  alt="Fresh Produce"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600">Fresh Produce</h3>
            </a>
            <a href="#bakery" className="group flex flex-col items-center rounded-xl border border-gray-200 p-6 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md hover:border-green-600">
              <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 relative mb-4">
                <Image
                  src="/images/bakery.jpg"
                  alt="Bakery"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600">Bakery</h3>
            </a>
            <a href="#dairy-cheese" className="group flex flex-col items-center rounded-xl border border-gray-200 p-6 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md hover:border-green-600">
              <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 relative mb-4">
                <Image
                  src="/images/dairy&cheese.jpg"
                  alt="Dairy & Cheese"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600">Dairy & Cheese</h3>
            </a>
            <a href="#specialty-items" className="group flex flex-col items-center rounded-xl border border-gray-200 p-6 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md hover:border-green-600">
              <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 relative mb-4">
                <Image
                  src="/images/special.jpg"
                  alt="Specialty Items"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600">Specialty Items</h3>
            </a>
          </div>
        </div>
      </section>
      
      {/* Fresh Produce Section */}
      <section id="fresh-produce" className="w-full py-16 md:py-20 bg-gray-50 scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">Fresh Produce</h2>
            <div className="w-20 h-1 bg-green-600 rounded"></div>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
                <Image
                  src="/images/vegetables.jpg"
                  alt="Organic Vegetables"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Organic Vegetables</h3>
                <p className="text-gray-600">Locally sourced seasonal vegetables</p>
                <div className="pt-2">
                  <span className="inline-block text-sm font-medium text-green-600">$2.99 - $5.99 / lb</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
                <Image
                  src="/images/fruits.jpg"
                  alt="Fresh Fruits"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Fresh Fruits</h3>
                <p className="text-gray-600">Sweet and juicy seasonal fruits</p>
                <div className="pt-2">
                  <span className="inline-block text-sm font-medium text-green-600">$3.49 - $6.99 / lb</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
                <Image
                  src="/images/greens.jpeg"
                  alt="Herbs & Leafy Greens"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Herbs & Leafy Greens</h3>
                <p className="text-gray-600">Fresh herbs and nutritious greens</p>
                <div className="pt-2">
                  <span className="inline-block text-sm font-medium text-green-600">$1.99 - $4.99 / bunch</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
                <Image
                  src="/images/mushrooms.jpg"
                  alt="Organic Mushrooms"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Organic Mushrooms</h3>
                <p className="text-gray-600">Variety of cultivated and wild mushrooms</p>
                <div className="pt-2">
                  <span className="inline-block text-sm font-medium text-green-600">$4.99 - $12.99 / lb</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Bakery Section */}
      <section id="bakery" className="w-full py-16 md:py-20 scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">Bakery</h2>
            <div className="w-20 h-1 bg-amber-600 rounded"></div>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
                <Image
                  src="/images/köyekmek.jpg"
                  alt="Village Bread"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Village Bread</h3>
                <p className="text-gray-600">Big and delicious bread from our villages</p>
                <div className="pt-2">
                  <span className="inline-block text-sm font-medium text-green-600">₺20 / 1 kg</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
                <Image
                  src="/images/sandwichekmek.jpg"
                  alt="Sandwich Bread"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Sandwich Bread</h3>
                <p className="text-gray-600">Best sandwich bread for your sandwiches</p>
                <div className="pt-2">
                  <span className="inline-block text-sm font-medium text-green-600">₺15 / 1 kg</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
                <Image
                  src="/images/pide.jpeg"
                  alt="Pide"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Pide</h3>
                <p className="text-gray-600">Special daily cypriot pide</p>
                <div className="pt-2">
                  <span className="inline-block text-sm font-medium text-green-600">₺30 / 1 kg</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
                <Image
                  src="/images/somunekmek.jpg"
                  alt="Loaf bread"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Loaf bread</h3>
                <p className="text-gray-600">Delicious daily loaf bread</p>
                <div className="pt-2">
                  <span className="inline-block text-sm font-medium text-green-600">₺10 / 1 kg</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Dairy & Cheese Section */}
      <section id="dairy-cheese" className="w-full py-16 md:py-20 bg-gray-50 scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">Dairy & Cheese</h2>
            <div className="w-20 h-1 bg-yellow-600 rounded"></div>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
                <Image
                  src="/images/cheese.jpeg"
                  alt="Artisanal Cheeses"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Artisanal Cheeses</h3>
                <p className="text-gray-600">Local and imported specialty cheeses</p>
                <div className="pt-2">
                  <span className="inline-block text-sm font-medium text-green-600">₺50 / 1 kg</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
                <Image
                  src="/images/milk.jpg"
                  alt="Organic Milk"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Organic Milk</h3>
                <p className="text-gray-600">Fresh milk from local dairy farms</p>
                <div className="pt-2">
                  <span className="inline-block text-sm font-medium text-green-600">₺70 / half gallon</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
                <Image
                  src="/images/yogurt.jpg"
                  alt="Yogurt"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Yogurt</h3>
                <p className="text-gray-600">Turkish, natural, and flavored varieties</p>
                <div className="pt-2">
                  <span className="inline-block text-sm font-medium text-green-600">₺50 - ₺80 / 1 kg</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
                <Image
                  src="/images/hellim.jpeg"
                  alt="Halloumi"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Halloumi</h3>
                <p className="text-gray-600">Only in Cyprus</p>
                <div className="pt-2">
                  <span className="inline-block text-sm font-medium text-green-600">₺60 - ₺100 / 1 kg</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Specialty Items Section */}
      <section id="specialty-items" className="w-full py-16 md:py-20 scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">Specialty Items</h2>
            <div className="w-20 h-1 bg-purple-600 rounded"></div>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
                  <span className="text-green-800 text-sm">Image Placeholder</span>
                </div>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Olive Oils</h3>
                <p className="text-gray-600">Premium extra virgin olive oils</p>
                <div className="pt-2">
                  <span className="inline-block text-sm font-medium text-green-600">$12.99 - $39.99</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center">
                  <span className="text-amber-800 text-sm">Image Placeholder</span>
                </div>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Honey & Preserves</h3>
                <p className="text-gray-600">Local honey and artisanal preserves</p>
                <div className="pt-2">
                  <span className="inline-block text-sm font-medium text-green-600">$6.99 - $15.99</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
                  <span className="text-red-800 text-sm">Image Placeholder</span>
                </div>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Spices & Seasonings</h3>
                <p className="text-gray-600">Global spice collection and blends</p>
                <div className="pt-2">
                  <span className="inline-block text-sm font-medium text-green-600">$4.99 - $12.99</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center">
                  <span className="text-purple-800 text-sm">Image Placeholder</span>
                </div>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Imported Delicacies</h3>
                <p className="text-gray-600">Specialty foods from around the world</p>
                <div className="pt-2">
                  <span className="inline-block text-sm font-medium text-green-600">$8.99 - $49.99</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="w-full py-16 bg-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">Can't Find What You're Looking For?</h2>
            <p className="text-xl text-gray-700 mb-8">We offer special ordering for items not currently in stock. Our team is ready to help you find exactly what you need.</p>
            <a
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-md bg-green-600 px-8 text-base font-medium text-white shadow-sm transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 