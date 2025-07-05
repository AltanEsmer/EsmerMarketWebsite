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
                Yeni Boğaziçi'nin kalbinde, sıcak atmosferi ile hizmetinizdeyiz.
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
                href="/gallery"
                className="inline-flex h-12 items-center justify-center rounded-md bg-green-600 px-8 text-base font-medium text-white shadow-sm transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
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

      {/* Market Experience Section */}
      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center space-y-8 text-center">
            <div className="space-y-3 max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-gray-900">Esmer Market Deneyimi</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Sıcak atmosfer ve samimi hizmet anlayışımızla fark yaratıyoruz
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-8 w-full max-w-6xl">
              {/* Experience Card 1 - Tradition */}
              <div className="flex flex-col rounded-lg border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
                <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
                  <Image
                    src="/images/team.jpg"
                    alt="Esmer Market Ekibi"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-white">Aile Geleneği</h3>
                    </div>
                  </div>
                </div>
                <div className="p-5 space-y-2 flex-grow">
                  <p className="text-gray-600">Yıllardır sürdürdüğümüz aile geleneğimiz ile yerel halkımıza en iyi hizmeti sunuyoruz.</p>
                  <div className="pt-2 mt-auto">
                    <a href="/about" className="text-sm font-medium text-green-600 hover:text-green-700">Hikayemizi Keşfet →</a>
                  </div>
                </div>
              </div>
              
              {/* Experience Card 2 - Community */}
              <div className="flex flex-col rounded-lg border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
                <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
                  <Image
                    src="/images/market.png"
                    alt="Market Topluluk"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-white">Topluluk Merkezi</h3>
                    </div>
                  </div>
                </div>
                <div className="p-5 space-y-2 flex-grow">
                  <p className="text-gray-600">Sadece bir market değil, aynı zamanda komşularınızla buluşabileceğiniz bir topluluk merkeziyiz.</p>
                  <div className="pt-2 mt-auto">
                    <a href="/reviews" className="text-sm font-medium text-green-600 hover:text-green-700">Müşteri Deneyimleri →</a>
                  </div>
                </div>
              </div>
              
              {/* Experience Card 3 - Location */}
              <div className="flex flex-col rounded-lg border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden">
                <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
                  <Image
                    src="/images/map.png"
                    alt="Konum"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-white">Merkezi Konum</h3>
                    </div>
                  </div>
                </div>
                <div className="p-5 space-y-2 flex-grow">
                  <p className="text-gray-600">Yeni Boğaziçi'nin kalbinde, kolay ulaşılabilir bir konumda hizmet veriyoruz.</p>
                  <div className="pt-2 mt-auto">
                    <a href="/location" className="text-sm font-medium text-green-600 hover:text-green-700">Konumumuzu Gör →</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Atmosphere Section */}
      <section className="w-full py-16 md:py-24 bg-amber-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center space-y-8">
            <div className="space-y-3 max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-gray-900">Market Atmosferi</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Sıcak ve samimi bir ortamda alışveriş deneyimi
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
              <div className="bg-white rounded-xl shadow-sm border border-amber-100 p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Güler Yüzlü Ekip</h3>
                <p className="text-gray-600">Her zaman yardıma hazır, güler yüzlü çalışanlarımız</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-amber-100 p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Rahat Ortam</h3>
                <p className="text-gray-600">Ferah ve düzenli market ortamı</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-amber-100 p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Uzun Çalışma Saatleri</h3>
                <p className="text-gray-600">Her gün 07:00 - 01:00 arası hizmetinizdeyiz</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-amber-100 p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Kolay Ulaşım</h3>
                <p className="text-gray-600">Yeterli otopark ve merkezi konum</p>
              </div>
            </div>
            
            <div className="mt-8">
              <a
                href="/gallery"
                className="inline-flex h-12 items-center justify-center rounded-md bg-amber-600 px-8 text-base font-medium text-white shadow-sm transition-colors hover:bg-amber-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
              >
                Mağazamızı Keşfet
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
                  Sıcak atmosferimizi ve samimi hizmetimizi deneyimlemek için bizi ziyaret edin.
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
                    <p>Pazartesi-Pazar: 07:00 - 01:00</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="aspect-video overflow-hidden rounded-xl bg-gray-100 shadow-md relative">
              <Image
                src="/images/map.png"
                alt="Esmer Market Harita"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col items-center justify-end p-6 text-center">
                <p className="text-white font-medium">Yenikent Bulvarı, Yeni Boğaziçi GaziMağusa</p>
                <p className="text-sm text-gray-200 mt-1">Mağazamızı ziyaret edin veya yol tarifi için bize ulaşın</p>
                <a href="/location" className="mt-4 inline-flex h-9 items-center justify-center rounded-md bg-green-600 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-700">
                  Yol Tarifi Al
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
