"use client";

import Image from "next/image";
import IsOpenIndicator from "./components/IsOpenIndicator";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-6 text-center">
            <div className="space-y-4 max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-green-600">
                Esmer Market'e Hoşgeldiniz
              </h1>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                Taze ürünler, özel ürünler ve günlük ihtiyaçlar için yerel marketiniz.
              </p>
              
              {/* Store Status Indicator */}
              <div className="mt-6 flex justify-center">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white shadow-sm">
                  <IsOpenIndicator />
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <a
                href="/products"
                className="inline-flex h-12 items-center justify-center rounded-md bg-green-600 px-8 text-base font-medium text-white shadow-sm transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
              >
                Ürünlere Göz At
              </a>
              <a
                href="/gallery"
                className="inline-flex h-12 items-center justify-center rounded-md border border-gray-300 bg-white px-8 text-base font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
              >
                Mağaza Galerisi
              </a>
              <a
                href="/location"
                className="inline-flex h-12 items-center justify-center rounded-md border border-gray-300 bg-white px-8 text-base font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
              >
                Mağazamızı Bul
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center space-y-8 text-center">
            <div className="space-y-3 max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-gray-900">Öne Çıkan Ürünler</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Taze ürün ve özel ürün seçkimizi keşfedin.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-8 w-full max-w-6xl">
              {/* Product Card 1 */}
              <div className="flex flex-col rounded-lg border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
                <div className="aspect-square w-full overflow-hidden rounded-t-lg bg-gray-100 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
                  <Image
                  src="/images/VegetablesMain.jpg"
                  alt="Sebze Ana"
                  fill
                  className="object-cover"
                />                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">Taze Organik Sebzeler</h3>
                  <p className="text-gray-600">Yerel kaynaklı ve organik</p>
                  <div className="pt-2">
                    <a href="/products#fresh-produce" className="text-sm font-medium text-green-600 hover:text-green-700">Şimdi Keşfet →</a>
                  </div>
                </div>
              </div>
              
              {/* Product Card 2 */}
              <div className="flex flex-col rounded-lg border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
                <div className="aspect-square w-full overflow-hidden rounded-t-lg bg-gray-100 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-yellow-100 flex items-center justify-center">
                  <Image
                  src="/images/CheeseMain.jpg"
                  alt="Peynir Ana"
                  fill
                  className="object-cover"
                />                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">El Yapımı Peynirler</h3>
                  <p className="text-gray-600">Yerel ve uluslararası üreticilerden</p>
                  <div className="pt-2">
                    <a href="/products#dairy-cheese" className="text-sm font-medium text-green-600 hover:text-green-700">Şimdi Keşfet →</a>
                  </div>
                </div>
              </div>
              
              {/* Product Card 3 */}
              <div className="flex flex-col rounded-lg border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
                <div className="aspect-square w-full overflow-hidden rounded-t-lg bg-gray-100 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center">
                  <Image
                  src="/images/BreadMain.jpg"
                  alt="Fırın Ana"
                  fill
                  className="object-cover"
                />
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">Taze Fırın Ürünleri</h3>
                  <p className="text-gray-600">Mağazamızda her gün pişirilir</p>
                  <div className="pt-2">
                    <a href="/products#bakery" className="text-sm font-medium text-green-600 hover:text-green-700">Şimdi Keşfet →</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <a
                href="/products"
                className="inline-flex h-10 items-center justify-center rounded-md bg-white border border-gray-300 px-8 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
              >
                Tüm Ürünleri Gör
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
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-gray-900">Mağazamızı Ziyaret Edin</h2>
                <p className="text-lg text-gray-600">
                  Geniş taze ürün ve özel ürün seçimimizi deneyimlemek için bizi ziyaret edin.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <a
                  href="/location"
                  className="inline-flex h-12 items-center justify-center rounded-md bg-green-600 px-8 text-base font-medium text-white shadow-sm transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
                >
                  Yol Tarifi Al
                </a>
                <a
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center rounded-md border border-gray-300 bg-white px-8 text-base font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
                >
                  Bize Ulaşın
                </a>
              </div>
              <div className="mt-4 space-y-4 text-gray-600">
                <div className="flex items-start space-x-3">
                  <svg className="h-6 w-6 text-green-600 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <h3 className="font-medium text-gray-900">Adres</h3>
                    <p>Yenikent Bulvarı, Yeni Boğaziçi GaziMağusa</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="h-6 w-6 text-green-600 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-medium text-gray-900">Çalışma Saatleri</h3>
                    <p>Pazartesi-Pazar: 08:00 - 24:00</p>
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
                <p className="text-sm text-gray-500 mt-1">Mağazamızı ziyaret edin veya yol tarifi için bize ulaşın</p>
                <a href="/contact" className="mt-4 inline-flex h-9 items-center justify-center rounded-md bg-green-600 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-700">
                  Yol Tarifi Al
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
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-gray-900">Son Haberler & Promosyonlar</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                En son ürünlerimiz ve özel tekliflerimizden haberdar olun.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-8 w-full max-w-6xl">
              {/* News Card 1 */}
              <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
                <div className="aspect-video w-full overflow-hidden bg-gray-100 relative">
                  {/* Replace with actual image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
                    <span className="text-red-800 text-sm">Görsel Yer Tutucu</span>
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                      Özel Teklif
                    </span>
                    <span className="text-xs text-gray-500">15 Nisan 2023</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600">Hafta Sonu Özel: Taze Meyvelerde %20 İndirim</h3>
                  <p className="text-sm text-gray-600">Sadece bu hafta sonu tüm taze meyvelerde %20 indirim!</p>
                  <div className="pt-2">
                    <a href="/news#promotions" className="text-sm font-medium text-green-600 hover:text-green-700">Daha fazla →</a>
                  </div>
                </div>
              </div>
              
              {/* News Card 2 */}
              <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
                <div className="aspect-video w-full overflow-hidden bg-gray-100 relative">
                  {/* Replace with actual image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                    <span className="text-blue-800 text-sm">Görsel Yer Tutucu</span>
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      Haber
                    </span>
                    <span className="text-xs text-gray-500">10 Nisan 2023</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600">Yeni Organik Bölümümüz Açıldı</h3>
                  <p className="text-sm text-gray-600">Organik bölümümüzü yeni ürünlerle genişlettik.</p>
                  <div className="pt-2">
                    <a href="/news#organic-section" className="text-sm font-medium text-green-600 hover:text-green-700">Daha fazla →</a>
                  </div>
                </div>
              </div>
              
              {/* News Card 3 */}
              <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
                <div className="aspect-video w-full overflow-hidden bg-gray-100 relative">
                  {/* Replace with actual image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
                    <span className="text-green-800 text-sm">Görsel Yer Tutucu</span>
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      Etkinlik
                    </span>
                    <span className="text-xs text-gray-500">5 Nisan 2023</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600">Yerel Üreticiler Günü: 20 Nisan</h3>
                  <p className="text-sm text-gray-600">Yerel üreticilerimizle tanışın ve ürünlerini tadın.</p>
                  <div className="pt-2">
                    <a href="/news#local-producers" className="text-sm font-medium text-green-600 hover:text-green-700">Daha fazla →</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <a
                href="/news"
                className="inline-flex h-10 items-center justify-center rounded-md bg-white border border-gray-300 px-8 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
              >
                Tüm Haberleri Gör
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
