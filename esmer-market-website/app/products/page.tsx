"use client";

import Image from "next/image";
import ProductList from "../components/ProductList";

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
            <a href="#fresh-produce" className="group flex flex-col items-center rounded-xl border border-gray-200 p-6 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md hover:border-green-600">
              <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 relative mb-4">
                <Image
                  src="/images/freshProduce.jpg"
                  alt="Taze Ürünler"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600">Taze Ürünler</h3>
            </a>
            <a href="#bakery" className="group flex flex-col items-center rounded-xl border border-gray-200 p-6 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md hover:border-green-600">
              <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 relative mb-4">
                <Image
                  src="/images/bakery.jpg"
                  alt="Fırın"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600">Fırın</h3>
            </a>
            <a href="#dairy-cheese" className="group flex flex-col items-center rounded-xl border border-gray-200 p-6 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md hover:border-green-600">
              <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 relative mb-4">
                <Image
                  src="/images/dairy&cheese.jpg"
                  alt="Süt & Peynir"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600">Süt & Peynir</h3>
            </a>
            <a href="#specialty-items" className="group flex flex-col items-center rounded-xl border border-gray-200 p-6 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md hover:border-green-600">
              <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 relative mb-4">
                <Image
                  src="/images/special.jpg"
                  alt="Özel Ürünler"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600">Özel Ürünler</h3>
            </a>
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
              <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
                <Image
                  src="/images/vegetables.jpg"
                  alt="Organik Sebzeler"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Organik Sebzeler</h3>
                <p className="text-gray-600">Yerel kaynaklı mevsimlik sebzeler</p>
                <div className="pt-2">
                  <span className="inline-block text-sm font-medium text-green-600">₺50 - ₺100 / kg</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
                <Image
                  src="/images/fruits.jpg"
                  alt="Taze Meyveler"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Taze Meyveler</h3>
                <p className="text-gray-600">Tatlı ve sulu mevsimlik meyveler</p>
                <div className="pt-2">
                  <span className="inline-block text-sm font-medium text-green-600">₺60 - ₺120 / kg</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
                <Image
                  src="/images/greens.jpeg"
                  alt="Otlar & Yeşillikler"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Otlar & Yeşillikler</h3>
                <p className="text-gray-600">Taze otlar ve besleyici yeşillikler</p>
                <div className="pt-2">
                  <span className="inline-block text-sm font-medium text-green-600">₺30 - ₺80 / demet</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
                <Image
                  src="/images/mushrooms.jpg"
                  alt="Organik Mantarlar"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Organik Mantarlar</h3>
                <p className="text-gray-600">Çeşitli yetiştirilmiş ve yabani mantarlar</p>
                <div className="pt-2">
                  <span className="inline-block text-sm font-medium text-green-600">₺80 - ₺220 / kg</span>
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
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">Fırın</h2>
            <div className="w-20 h-1 bg-amber-600 rounded"></div>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
                <Image
                  src="/images/köyekmek.jpg"
                  alt="Köy Ekmeği"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Köy Ekmeği</h3>
                <p className="text-gray-600">Köylerimizden büyük ve lezzetli ekmek</p>
                <div className="pt-2">
                  <span className="inline-block text-sm font-medium text-green-600">₺20 / 1 kg</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
                <Image
                  src="/images/sandwichekmek.jpg"
                  alt="Sandviç Ekmeği"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Sandviç Ekmeği</h3>
                <p className="text-gray-600">Sandviçleriniz için en iyi sandviç ekmeği</p>
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
                <p className="text-gray-600">Özel günlük Kıbrıs pidesi</p>
                <div className="pt-2">
                  <span className="inline-block text-sm font-medium text-green-600">₺30 / 1 kg</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
                <Image
                  src="/images/somunekmek.jpg"
                  alt="Somun Ekmek"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Somun Ekmek</h3>
                <p className="text-gray-600">Lezzetli günlük somun ekmek</p>
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
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">Süt & Peynir</h2>
            <div className="w-20 h-1 bg-yellow-600 rounded"></div>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
                <Image
                  src="/images/cheese.jpeg"
                  alt="El Yapımı Peynirler"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">El Yapımı Peynirler</h3>
                <p className="text-gray-600">Yerel ve ithal özel peynirler</p>
                <div className="pt-2">
                  <span className="inline-block text-sm font-medium text-green-600">₺50 / 1 kg</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
                <Image
                  src="/images/milk.jpg"
                  alt="Organik Süt"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Organik Süt</h3>
                <p className="text-gray-600">Yerel süt çiftliklerinden taze süt</p>
                <div className="pt-2">
                  <span className="inline-block text-sm font-medium text-green-600">₺70 / yarım galon</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
                <Image
                  src="/images/yogurt.jpg"
                  alt="Yoğurt"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Yoğurt</h3>
                <p className="text-gray-600">Türk, doğal ve aromalı çeşitler</p>
                <div className="pt-2">
                  <span className="inline-block text-sm font-medium text-green-600">₺50 - ₺80 / 1 kg</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
                <Image
                  src="/images/hellim.jpeg"
                  alt="Hellim"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Hellim</h3>
                <p className="text-gray-600">Sadece Kıbrıs'ta</p>
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
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">Özel Ürünler</h2>
            <div className="w-20 h-1 bg-purple-600 rounded"></div>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
                  <span className="text-green-800 text-sm">Görsel Yer Tutucu</span>
                </div>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Zeytinyağları</h3>
                <p className="text-gray-600">Premium sızma zeytinyağları</p>
                <div className="pt-2">
                  <span className="inline-block text-sm font-medium text-green-600">₺220 - ₺680</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center">
                  <span className="text-amber-800 text-sm">Görsel Yer Tutucu</span>
                </div>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Bal & Reçeller</h3>
                <p className="text-gray-600">Yerel bal ve el yapımı reçeller</p>
                <div className="pt-2">
                  <span className="inline-block text-sm font-medium text-green-600">₺120 - ₺270</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
                  <span className="text-red-800 text-sm">Görsel Yer Tutucu</span>
                </div>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Baharatlar & Çeşniler</h3>
                <p className="text-gray-600">Global baharat koleksiyonu ve karışımları</p>
                <div className="pt-2">
                  <span className="inline-block text-sm font-medium text-green-600">₺80 - ₺220</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center">
                  <span className="text-purple-800 text-sm">Görsel Yer Tutucu</span>
                </div>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">İthal Lezzetler</h3>
                <p className="text-gray-600">Dünya'nın dört bir yanından özel yiyecekler</p>
                <div className="pt-2">
                  <span className="inline-block text-sm font-medium text-green-600">₺150 - ₺850</span>
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