import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Esmer Market - Yönetici Paneli",
  description: "Esmer Market yönetici paneli - içerik ve kampanyaları yönetin.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-16 lg:py-20 bg-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-gray-900 mb-6">
              Yönetici Paneli
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Esmer Market web sitesi içeriklerini ve kampanyalarını yönetin.
            </p>
          </div>
        </div>
      </section>
      
      <section className="w-full py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-6 md:grid-cols-2">
              <Link href="/admin/campaigns" className="block p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Kampanyalar</h2>
                <p className="text-gray-600">Kampanya ve promosyonları görüntüle, düzenle ve yeni kampanyalar ekle.</p>
              </Link>
              
              <Link href="/admin/products" className="block p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Ürünler</h2>
                <p className="text-gray-600">Ürün kategorilerini ve ürünleri yönet.</p>
              </Link>
              
              <Link href="/admin/reservations" className="block p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Rezervasyonlar</h2>
                <p className="text-gray-600">Müşteri rezervasyonlarını görüntüle ve yönet.</p>
              </Link>
              
              <Link href="/admin/settings" className="block p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Ayarlar</h2>
                <p className="text-gray-600">Site ayarlarını ve kullanıcı hesaplarını yönet.</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 