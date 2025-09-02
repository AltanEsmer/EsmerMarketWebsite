"use client";

import Link from "next/link";

export default function ProductsPage() {

  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 bg-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-gray-900 mb-6">
              Ürünlerimiz
            </h1>
            <p className="text-xl text-gray-700">
              Taze ürünler, özel ürünler ve günlük market ihtiyaçlarımızın geniş seçkisini keşfedin.
            </p>
          </div>
        </div>
      </section>
      
      {/* Product Categories */}
      <section className="w-full py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Kategoriler</h2>
            <p className="text-xl text-gray-600">İhtiyacınız olan ürünleri bulmak için kategorilere göz atın.</p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Fresh Produce Category */}
            <div className="group flex flex-col rounded-xl border border-gray-200 p-6 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
              <div className="aspect-square w-full overflow-hidden rounded-lg relative mb-4">
                <img 
                  src="/images/products/fresh-produce/fresh-produce-WA0006.jpg"
                  alt="Taze Ürünler"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-4 w-full">
                    <h3 className="text-xl font-bold text-white">Taze Ürünler</h3>
                  </div>
                </div>
              </div>
              <div className="flex flex-col flex-grow">
                <p className="text-gray-600 mb-4">Taze sebzeler, meyveler ve yeşillikler</p>
                <div className="mt-auto">
                  <Link href="#fresh-produce" className="inline-flex items-center text-green-600 font-medium hover:text-green-700">
                    Keşfet
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Bakery Category */}
            <div className="group flex flex-col rounded-xl border border-gray-200 p-6 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
              <div className="aspect-square w-full overflow-hidden rounded-lg relative mb-4">
                <img 
                  src="/images/products/bakery/bakery-WA0010.jpg"
                  alt="Fırın Ürünleri"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-4 w-full">
                    <h3 className="text-xl font-bold text-white">Fırın Ürünleri</h3>
                  </div>
                </div>
              </div>
              <div className="flex flex-col flex-grow">
                <p className="text-gray-600 mb-4">Taze ekmekler, pideler ve unlu mamuller</p>
                <div className="mt-auto">
                  <Link href="#bakery" className="inline-flex items-center text-green-600 font-medium hover:text-green-700">
                    Keşfet
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Dairy & Cheese Category */}
            <div className="group flex flex-col rounded-xl border border-gray-200 p-6 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
              <div className="aspect-square w-full overflow-hidden rounded-lg relative mb-4">
                <img 
                  src="/images/products/dairy-cheese/dairy-cheese-WA0012.jpg"
                  alt="Süt Ürünleri & Peynir"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-4 w-full">
                    <h3 className="text-xl font-bold text-white">Süt Ürünleri & Peynir</h3>
                  </div>
                </div>
              </div>
              <div className="flex flex-col flex-grow">
                <p className="text-gray-600 mb-4">Taze süt, peynir çeşitleri ve yoğurt</p>
                <div className="mt-auto">
                  <Link href="#dairy-cheese" className="inline-flex items-center text-green-600 font-medium hover:text-green-700">
                    Keşfet
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Meat & Seafood Category */}
            <div className="group flex flex-col rounded-xl border border-gray-200 p-6 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
              <div className="aspect-square w-full overflow-hidden rounded-lg relative mb-4">
                <img 
                  src="/images/products/meat-seafood/meat-seafood-WA0014.jpg"
                  alt="Et & Deniz Ürünleri"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-4 w-full">
                    <h3 className="text-xl font-bold text-white">Et & Deniz Ürünleri</h3>
                  </div>
                </div>
              </div>
              <div className="flex flex-col flex-grow">
                <p className="text-gray-600 mb-4">Kaliteli et çeşitleri ve taze deniz ürünleri</p>
                <div className="mt-auto">
                  <Link href="#meat-seafood" className="inline-flex items-center text-green-600 font-medium hover:text-green-700">
                    Keşfet
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Dried Goods Category */}
            <div className="group flex flex-col rounded-xl border border-gray-200 p-6 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
              <div className="aspect-square w-full overflow-hidden rounded-lg relative mb-4">
                <img 
                  src="/images/products/dried-goods/dried-goods-WA0016.jpg"
                  alt="Kuru Gıdalar"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-4 w-full">
                    <h3 className="text-xl font-bold text-white">Kuru Gıdalar</h3>
                  </div>
                </div>
              </div>
              <div className="flex flex-col flex-grow">
                <p className="text-gray-600 mb-4">Tahıllar, baklagiller ve kuru meyveler</p>
                <div className="mt-auto">
                  <Link href="#dried-goods" className="inline-flex items-center text-green-600 font-medium hover:text-green-700">
                    Keşfet
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Beverages Category */}
            <div className="group flex flex-col rounded-xl border border-gray-200 p-6 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
              <div className="aspect-square w-full overflow-hidden rounded-lg relative mb-4">
                <img 
                  src="/images/products/beverages/beverages-WA0023.jpg"
                  alt="İçecekler"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-4 w-full">
                    <h3 className="text-xl font-bold text-white">İçecekler</h3>
                  </div>
                </div>
              </div>
              <div className="flex flex-col flex-grow">
                <p className="text-gray-600 mb-4">Meyve suları, çay, kahve ve diğer içecekler</p>
                <div className="mt-auto">
                  <Link href="#beverages" className="inline-flex items-center text-green-600 font-medium hover:text-green-700">
                    Keşfet
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Snacks Category */}
            <div className="group flex flex-col rounded-xl border border-gray-200 p-6 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
              <div className="aspect-square w-full overflow-hidden rounded-lg relative mb-4">
                <img 
                  src="/images/products/snacks/snacks-WA0025.jpg"
                  alt="Atıştırmalıklar"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-4 w-full">
                    <h3 className="text-xl font-bold text-white">Atıştırmalıklar</h3>
                  </div>
                </div>
              </div>
              <div className="flex flex-col flex-grow">
                <p className="text-gray-600 mb-4">Tatlı ve tuzlu atıştırmalıklar, kuruyemişler</p>
                <div className="mt-auto">
                  <Link href="#snacks" className="inline-flex items-center text-green-600 font-medium hover:text-green-700">
                    Keşfet
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Specialty Items Category */}
            <div className="group flex flex-col rounded-xl border border-gray-200 p-6 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
              <div className="aspect-square w-full overflow-hidden rounded-lg relative mb-4">
                <img 
                  src="/images/products/specialty-items/specialty-items-WA0021.jpg"
                  alt="Özel Ürünler"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-4 w-full">
                    <h3 className="text-xl font-bold text-white">Özel Ürünler</h3>
                  </div>
                </div>
              </div>
              <div className="flex flex-col flex-grow">
                <p className="text-gray-600 mb-4">Zeytinyağları, bal, reçeller ve özel lezzetler</p>
                <div className="mt-auto">
                  <Link href="#specialty-items" className="inline-flex items-center text-green-600 font-medium hover:text-green-700">
                    Keşfet
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Fresh Produce Section */}
      <section id="fresh-produce" className="w-full py-16 md:py-20 bg-gray-50 scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">Taze Ürünler</h2>
            <div className="w-20 h-1 bg-green-600 rounded"></div>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden relative">
                <img 
                  src="/images/products/fresh-produce/fresh-produce-WA0006.jpg"
                  alt="Organik Sebzeler"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Organik Sebzeler</h3>
                <p className="text-gray-600">Yerel kaynaklı mevsimlik sebzeler</p>
              </div>
            </div>
            
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden relative">
                <img 
                  src="/images/products/fresh-produce/fresh-produce-WA0007.jpg"
                  alt="Taze Meyveler"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Taze Meyveler</h3>
                <p className="text-gray-600">Tatlı ve sulu mevsimlik meyveler</p>
              </div>
            </div>
            
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden relative">
                <img 
                  src="/images/products/fresh-produce/fresh-produce-WA0008.jpg"
                  alt="Otlar & Yeşillikler"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Otlar & Yeşillikler</h3>
                <p className="text-gray-600">Taze otlar ve besleyici yeşillikler</p>
              </div>
            </div>
            
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden relative">
                <img 
                  src="/images/products/fresh-produce/fresh-produce-WA0009.jpg"
                  alt="Organik Mantarlar"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Organik Mantarlar</h3>
                <p className="text-gray-600">Çeşitli yetiştirilmiş ve yabani mantarlar</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Bakery Section */}
      <section id="bakery" className="w-full py-16 md:py-20 scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">Fırın</h2>
            <div className="w-20 h-1 bg-amber-600 rounded"></div>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden relative">
                <img 
                  src="/images/products/bakery/bakery-WA0010.jpg"
                  alt="Köy Ekmeği"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Köy Ekmeği</h3>
                <p className="text-gray-600">Köylerimizden büyük ve lezzetli ekmek</p>
              </div>
            </div>
            
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden relative">
                <img 
                  src="/images/products/bakery/bakery-WA0011.jpg"
                  alt="Sandviç Ekmeği"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Sandviç Ekmeği</h3>
                <p className="text-gray-600">Sandviçleriniz için en iyi sandviç ekmeği</p>
              </div>
            </div>
            
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden relative">
                <img 
                  src="/images/products/bakery/bakery-WA0030.jpg"
                  alt="Pide"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Pide</h3>
                <p className="text-gray-600">Özel günlük Kıbrıs pidesi</p>
              </div>
            </div>
            
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden relative">
                <img 
                  src="/images/products/bakery/bakery-WA0010.jpg"
                  alt="Somun Ekmek"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Somun Ekmek</h3>
                <p className="text-gray-600">Lezzetli günlük somun ekmek</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Dairy & Cheese Section */}
      <section id="dairy-cheese" className="w-full py-16 md:py-20 bg-gray-50 scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">Süt & Peynir</h2>
            <div className="w-20 h-1 bg-yellow-600 rounded"></div>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden relative">
                <img 
                  src="/images/products/dairy-cheese/dairy-cheese-WA0012.jpg"
                  alt="El Yapımı Peynirler"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">El Yapımı Peynirler</h3>
                <p className="text-gray-600">Yerel ve ithal özel peynirler</p>
              </div>
            </div>
            
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden relative">
                <img 
                  src="/images/products/dairy-cheese/dairy-cheese-WA0013.jpg"
                  alt="Organik Süt"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Organik Süt</h3>
                <p className="text-gray-600">Yerel süt çiftliklerinden taze süt</p>
              </div>
            </div>
            
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden relative">
                <img 
                  src="/images/products/dairy-cheese/dairy-cheese-WA0032.jpg"
                  alt="Yoğurt"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Yoğurt</h3>
                <p className="text-gray-600">Türk, doğal ve aromalı çeşitler</p>
              </div>
            </div>
            
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden relative">
                <img 
                  src="/images/products/dairy-cheese/dairy-cheese-WA0012.jpg"
                  alt="Hellim"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Hellim</h3>
                <p className="text-gray-600">Sadece Kıbrıs'ta</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Meat & Seafood Section */}
      <section id="meat-seafood" className="w-full py-16 md:py-20 scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">Et & Deniz Ürünleri</h2>
            <div className="w-20 h-1 bg-red-600 rounded"></div>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden relative">
                <img 
                  src="/images/products/meat-seafood/meat-seafood-WA0014.jpg"
                  alt="Taze Et"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Taze Et</h3>
                <p className="text-gray-600">Yerel çiftliklerden kaliteli et</p>
              </div>
            </div>
            
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden relative">
                <img 
                  src="/images/products/meat-seafood/meat-seafood-WA0015.jpg"
                  alt="Deniz Ürünleri"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Deniz Ürünleri</h3>
                <p className="text-gray-600">Günlük taze deniz ürünleri</p>
              </div>
            </div>
            
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden relative">
                <img 
                  src="/images/products/meat-seafood/meat-seafood-WA0033.jpg"
                  alt="Özel Kesimler"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Özel Kesimler</h3>
                <p className="text-gray-600">Premium et kesim çeşitleri</p>
              </div>
            </div>
            
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden relative">
                <img 
                  src="/images/products/meat-seafood/meat-seafood-WA0014.jpg"
                  alt="Şarküteri"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Şarküteri</h3>
                <p className="text-gray-600">Özel şarküteri ürünleri</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Specialty Items Section */}
      <section id="specialty-items" className="w-full py-16 md:py-20 scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">Özel Ürünler</h2>
            <div className="w-20 h-1 bg-purple-600 rounded"></div>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden relative">
                <img 
                  src="/images/products/specialty-items/specialty-items-WA0021.jpg"
                  alt="Zeytinyağları"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Zeytinyağları</h3>
                <p className="text-gray-600">Premium sızma zeytinyağları</p>
              </div>
            </div>
            
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden relative">
                <img 
                  src="/images/products/specialty-items/specialty-items-WA0022.jpg"
                  alt="Bal & Reçeller"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Bal & Reçeller</h3>
                <p className="text-gray-600">Yerel bal ve el yapımı reçeller</p>
              </div>
            </div>
            
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden relative">
                <img 
                  src="/images/products/specialty-items/specialty-items-WA0027.jpg"
                  alt="Baharatlar & Çeşniler"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Baharatlar & Çeşniler</h3>
                <p className="text-gray-600">Global baharat koleksiyonu ve karışımları</p>
              </div>
            </div>
            
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden relative">
                <img 
                  src="/images/products/specialty-items/specialty-items-WA0028.jpg"
                  alt="İthal Lezzetler"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">İthal Lezzetler</h3>
                <p className="text-gray-600">Dünya'nın dört bir yanından özel yiyecekler</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Snacks Section */}
      <section id="snacks" className="w-full py-16 md:py-20 bg-gray-50 scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">Atıştırmalıklar</h2>
            <div className="w-20 h-1 bg-orange-600 rounded"></div>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden relative">
                <img 
                  src="/images/products/snacks/snacks-WA0025.jpg"
                  alt="Tatlı Atıştırmalıklar"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Tatlı Atıştırmalıklar</h3>
                <p className="text-gray-600">Çikolata, kurabiye ve tatlı atıştırmalıklar</p>
              </div>
            </div>
            
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden relative">
                <img 
                  src="/images/products/snacks/snacks-WA0026.jpg"
                  alt="Tuzlu Atıştırmalıklar"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Tuzlu Atıştırmalıklar</h3>
                <p className="text-gray-600">Cips, kraker ve tuzlu çeşitler</p>
              </div>
            </div>
            
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden relative">
                <img 
                  src="/images/products/snacks/snacks-WA0025.jpg"
                  alt="Kuruyemişler"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Kuruyemişler</h3>
                <p className="text-gray-600">Taze kavrulmuş kuruyemişler</p>
              </div>
            </div>
            
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden relative">
                <img 
                  src="/images/products/snacks/snacks-WA0026.jpg"
                  alt="Sağlıklı Atıştırmalıklar"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Sağlıklı Atıştırmalıklar</h3>
                <p className="text-gray-600">Protein barları ve sağlıklı alternatifler</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Beverages Section */}
      <section id="beverages" className="w-full py-16 md:py-20 scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">İçecekler</h2>
            <div className="w-20 h-1 bg-blue-600 rounded"></div>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden relative">
                <img 
                  src="/images/products/beverages/beverages-WA0023.jpg"
                  alt="Meyve Suları"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Meyve Suları</h3>
                <p className="text-gray-600">Taze sıkılmış ve organik meyve suları</p>
              </div>
            </div>
            
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden relative">
                <img 
                  src="/images/products/beverages/beverages-WA0024.jpg"
                  alt="Gazlı İçecekler"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Gazlı İçecekler</h3>
                <p className="text-gray-600">Yerel ve uluslararası markalar</p>
              </div>
            </div>
            
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden relative">
                <img 
                  src="/images/products/beverages/beverages-WA0023.jpg"
                  alt="Çay & Kahve"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Çay & Kahve</h3>
                <p className="text-gray-600">Özel harman çaylar ve kahveler</p>
              </div>
            </div>
            
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden relative">
                <img 
                  src="/images/products/beverages/beverages-WA0024.jpg"
                  alt="Su & Maden Suyu"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Su & Maden Suyu</h3>
                <p className="text-gray-600">Doğal kaynak ve maden suları</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Dried Goods Section */}
      <section id="dried-goods" className="w-full py-16 md:py-20 bg-gray-50 scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">Kuru Gıdalar</h2>
            <div className="w-20 h-1 bg-amber-800 rounded"></div>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden relative">
                <img 
                  src="/images/products/dried-goods/dried-goods-WA0016.jpg"
                  alt="Tahıllar"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Tahıllar</h3>
                <p className="text-gray-600">Pirinç, bulgur ve diğer tahıllar</p>
              </div>
            </div>
            
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden relative">
                <img 
                  src="/images/products/dried-goods/dried-goods-WA0020.jpg"
                  alt="Baklagiller"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Baklagiller</h3>
                <p className="text-gray-600">Fasulye, mercimek ve nohut çeşitleri</p>
              </div>
            </div>
            
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden relative">
                <img 
                  src="/images/products/dried-goods/dried-goods-WA0016.jpg"
                  alt="Kuru Meyveler"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Kuru Meyveler</h3>
                <p className="text-gray-600">Doğal kurutulmuş meyve çeşitleri</p>
              </div>
            </div>
            
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden relative">
                <img 
                  src="/images/products/dried-goods/dried-goods-WA0020.jpg"
                  alt="Un & Şeker"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Un & Şeker</h3>
                <p className="text-gray-600">Çeşitli unlar ve şekerler</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="w-full py-16 bg-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">Aradığınızı Bulamıyor musunuz?</h2>
            <p className="text-xl text-gray-700 mb-8">Şu anda stoklarımızda olmayan ürünler için özel sipariş hizmeti sunuyoruz. Ekibimiz tam olarak ihtiyacınız olanı bulmanıza yardımcı olmak için hazır.</p>
            <a
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-md bg-green-600 px-8 text-base font-medium text-white shadow-sm transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
            >
              Bize Ulaşın
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 