"use client";

export default function NewsPage() {
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 bg-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-gray-900 mb-6">
              Haberler & Promosyonlar
            </h1>
            <p className="text-xl text-gray-700">
              Esmer Market'teki en son gelişmeler ve özel tekliflerden haberdar olun.
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
                    Güncel Promosyon
                  </span>
                  <h2 className="text-2xl font-bold text-green-900">Hafta Sonu Özel: Taze Meyvelerde %20 İndirim</h2>
                  <p className="text-green-800">
                    Sadece bu hafta sonu tüm taze meyvelerde %20 indirim! Çilek, yaban mersini, şeftali ve 
                    daha fazlası gibi mevsimlik favorilerinizi stoklayın.
                  </p>
                  <p className="text-sm text-green-700">Geçerlilik: 15-16 Nisan 2023</p>
                  <div>
                    <a
                      href="/products"
                      className="inline-flex h-10 items-center justify-center rounded-md bg-green-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-700"
                    >
                      Şimdi Keşfet
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
              <h2 id="latest-news" className="text-2xl font-bold">Son Haberler</h2>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* News Item 1 */}
                <div id="organic-section" className="group overflow-hidden rounded-lg border">
                  <div className="aspect-video w-full bg-gray-100">
                    {/* News image would go here */}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                        Haber
                      </span>
                      <span className="text-xs text-gray-500">10 Nisan 2023</span>
                    </div>
                    <h3 className="mt-2 font-semibold">Yeni Organik Bölümümüz Açıldı</h3>
                    <p className="mt-2 text-sm text-gray-700">
                      Genişletilmiş organik bölümümüzün açılışını duyurmaktan heyecan duyuyoruz. 
                      Daha geniş bir organik ürün, mutfak temel malzemeleri ve özel ürün seçkisi sunuyoruz.
                    </p>
                    <a
                      href="/products"
                      className="mt-3 inline-block text-sm font-medium text-green-600 hover:underline"
                    >
                      Daha Fazla Keşfet
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
                        Etkinlik
                      </span>
                      <span className="text-xs text-gray-500">5 Nisan 2023</span>
                    </div>
                    <h3 className="mt-2 font-semibold">Yemek Atölyesi: Akdeniz Mutfağı</h3>
                    <p className="mt-2 text-sm text-gray-700">
                      Şefimizle birlikte Akdeniz mutfağına odaklanan uygulamalı bir yemek atölyesine katılın. 
                      Lezzetli örneklerin tadını çıkarırken yeni tarifler ve pişirme teknikleri öğrenin.
                    </p>
                    <a
                      href="#"
                      className="mt-3 inline-block text-sm font-medium text-green-600 hover:underline"
                    >
                      Daha Fazla Bilgi
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
                        Topluluk
                      </span>
                      <span className="text-xs text-gray-500">28 Mart 2023</span>
                    </div>
                    <h3 className="mt-2 font-semibold">Yerel Çiftçi Tanıtımı: Yeşil Tarlalar Çiftliği</h3>
                    <p className="mt-2 text-sm text-gray-700">
                      Bu ay, beş yılı aşkın süredir bize taze, mevsimlik ürünler sağlayan aile işletmesi 
                      organik çiftlik olan Yeşil Tarlalar Çiftliği'ni tanıtıyoruz.
                    </p>
                    <a
                      href="#"
                      className="mt-3 inline-block text-sm font-medium text-green-600 hover:underline"
                    >
                      Daha Fazla Oku
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
                        Duyuru
                      </span>
                      <span className="text-xs text-gray-500">20 Mart 2023</span>
                    </div>
                    <h3 className="mt-2 font-semibold">Gelecek Ay Uzatılmış Çalışma Saatleri</h3>
                    <p className="mt-2 text-sm text-gray-700">
                      1 Mayıs'tan itibaren, topluluğumuza daha iyi hizmet vermek için hafta içi çalışma saatlerimizi 
                      uzatıyoruz. Mağaza artık Pazartesi'den Cuma'ya 07:00 - 21:00 saatleri arasında açık olacak.
                    </p>
                    <a
                      href="#"
                      className="mt-3 inline-block text-sm font-medium text-green-600 hover:underline"
                    >
                      Daha Fazla Oku
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
                        Ürünler
                      </span>
                      <span className="text-xs text-gray-500">15 Mart 2023</span>
                    </div>
                    <h3 className="mt-2 font-semibold">Yeni Gelenler: Uluslararası Gurme Seçkisi</h3>
                    <p className="mt-2 text-sm text-gray-700">
                      Dünyanın dört bir yanından özel baharatlar, soslar ve bulunması zor malzemeler dahil 
                      heyecan verici yeni bir uluslararası gurme ürün seçkisi ekledik.
                    </p>
                    <a
                      href="/products"
                      className="mt-3 inline-block text-sm font-medium text-green-600 hover:underline"
                    >
                      Daha Fazla Keşfet
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
                        Etkinlik
                      </span>
                      <span className="text-xs text-gray-500">8 Mart 2023</span>
                    </div>
                    <h3 className="mt-2 font-semibold">Peynir & Şarap Tadım Etkinliği</h3>
                    <p className="mt-2 text-sm text-gray-700">
                      Koleksiyonumuzdaki şarap seçkisiyle eşleştirilmiş yerel el yapımı peynirlerin yer aldığı 
                      bir peynir ve şarap tadım akşamına katılın.
                    </p>
                    <a
                      href="#"
                      className="mt-3 inline-block text-sm font-medium text-green-600 hover:underline"
                    >
                      Daha Fazla Bilgi
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