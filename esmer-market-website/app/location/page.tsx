"use client";

import IsOpenIndicator from "../components/IsOpenIndicator";
import { useTranslation } from "react-i18next";
import { getStoreStatus } from "../utils/hours";

export default function LocationPage() {
  // Location coordinates for Esmer Market (35°13'20.2"N 33°53'39.2"E)
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3261.2991744011166!2d33.89203387677729!3d35.22227797979391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDEzJzIwLjIiTiAzM8KwNTMnMzkuMiJF!5e0!3m2!1sen!2s!4v1615680000000!5m2!1sen!2s";
  const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=35.222278,33.894222";
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 bg-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-gray-900 mb-6">
              Konum & Çalışma Saatleri
            </h1>
            <p className="text-xl text-gray-700">
              Bizi mahallenizde bulun ve çalışma saatlerimizde ziyaret edin.
            </p>
          </div>
        </div>
      </section>
      
      <section className="w-full py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Location Info */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Adresimiz</h2>
                <address className="not-italic text-xl text-gray-700">
                  <p>Yenikent Bulvarı, Yeni Boğaziçi</p>
                </address>
                <div className="pt-4">
                  <p className="text-xl text-gray-700">
                    <strong>Telefon:</strong> +905338207214
                  </p>
                  <p className="text-xl text-gray-700">
                    <strong>E-posta:</strong> eralpesmer@hotmail.com
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Çalışma Saatleri</h2>
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">{t('store.hours')}</h3>
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100">
                      <IsOpenIndicator />
                    </div>
                  </div>
                  <table className="w-full text-gray-700">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 pr-4 text-lg font-medium">Her Gün</td>
                        <td className="py-3 text-lg">08:00 - 22:00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Ulaşım</h2>
                <div className="space-y-4">
                  <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Arabayla</h3>
                    <p className="text-gray-700">
                      Yeni Boğaziçi'de Yenikent Bulvarı üzerinde bulunmaktadır. Müşterilerimiz için yeterli otopark mevcuttur.
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <a 
                  href={directionsUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-md bg-green-600 px-8 text-base font-medium text-white shadow-sm transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
                >
                  Yol Tarifi Al
                </a>
              </div>
            </div>
            
            {/* Map */}
            <div className="space-y-6">
              <div className="aspect-video w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-md h-96">
                <iframe 
                  src={mapEmbedUrl}
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Esmer Market Konumu"
                ></iframe>
              </div>
              
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Yakın Çevre</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Yakında eczane
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Toplu taşıma erişimi
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Bölgede restoranlar ve kafeler
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Holiday Notice */}
      <section className="w-full py-8 bg-amber-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto rounded-xl border border-amber-200 bg-white p-6 shadow-sm">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-amber-800">Tatil Günleri Çalışma Saatleri</h3>
                <p className="mt-1 text-amber-700">
                  Tatil günleri ve özel etkinliklerde çalışma saatlerimiz değişiklik gösterebilir.
                  En güncel bilgiler için sosyal medya hesaplarımızı takip edin veya bizimle iletişime geçin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 