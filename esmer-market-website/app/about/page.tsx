import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 bg-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-gray-900 mb-6">
              Esmer Market Hakkında
            </h1>
            <p className="text-xl text-gray-700">
              Hikayemiz, değerlerimiz ve taze, yüksek kaliteli ürünler sunma taahhüdümüz hakkında bilgi edinin.
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">Hikayemiz</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Esmer Market, 2019 yılında Eralp Esmer tarafından basit bir misyonla kuruldu: topluluğumuza taze, 
                  yüksek kaliteli market ürünleri getirmek. Küçük bir köşe dükkanı olarak başlayan işletmemiz, 
                  geniş bir taze ürün, özel gıda ve günlük ihtiyaç yelpazesi sunan sevilen bir mahalle marketine dönüştü.
                </p>
                <p>
                  Yıllar içinde, yerel çiftçiler ve üreticilerle güçlü ilişkiler kurduk. Bu sayede 
                  yerel ekonomimizi desteklerken en taze mevsimlik ürünleri sunabiliyoruz.
                </p>
              </div>
            </div>
            <div className="aspect-video overflow-hidden rounded-xl shadow-md relative">
              <Image 
                src="/images/market.png" 
                alt="Esmer Market Mağaza Görünümü" 
                width={600} 
                height={400} 
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values Section */}
      <section className="w-full py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Değerlerimiz</h2>
              <p className="text-xl text-gray-600">Her gün bizi motive eden ve topluluğumuza hizmet etme şeklimizi belirleyen değerler.</p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Kalite</h3>
                <p className="text-gray-600">
                  Sadece en yüksek kaliteli ürünleri sunmaya kararlıyız. Raflarımıza koyduğumuz 
                  her ürünü özenle seçiyoruz.
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">İletişim</h3>
                <p className="text-gray-600">
                  Müşterilerimiz için iletişim kanallarımızı her zaman açık tutuyoruz. İhtiyaçlarınız için her zaman buradayız.
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Sürdürülebilirlik</h3>
                <p className="text-gray-600">
                  Atıkları azaltmaktan çevre dostu tedarikçileri desteklemeye ve yeniden kullanılabilir 
                  ambalajları teşvik etmeye kadar sürdürülebilir uygulamalara önem veriyoruz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team Section */}
      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="aspect-video overflow-hidden rounded-xl shadow-md relative order-2 md:order-1">
              <Image 
                src="/images/team.jpg" 
                alt="Esmer Market Ekibi" 
                width={600} 
                height={400} 
                className="object-cover w-full h-full"
              />
            </div>
            <div className="space-y-6 order-1 md:order-2">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">Ekibimiz</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Gıda tutkunlarından oluşan özel ekibimiz, yemekleriniz için mükemmel malzemeleri 
                  bulmanıza yardımcı olmak konusunda tutkulu. Personelimizin çoğu yıllardır bizimle 
                  çalışıyor ve sattığımız ürünler hakkında derin bilgiye sahip.
                </p>
                <p>
                  Dostça, kişiselleştirilmiş hizmet sunmaktan gurur duyuyoruz ve her zaman 
                  öneriler, pişirme ipuçları sunmaktan veya tam olarak aradığınızı bulmanıza 
                  yardımcı olmaktan mutluluk duyarız.
                </p>
              </div>
              <div className="pt-4">
                <a 
                  href="/contact" 
                  className="inline-flex h-10 items-center justify-center rounded-md bg-green-600 px-6 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
                >
                  Ekibimizle İletişime Geçin
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 