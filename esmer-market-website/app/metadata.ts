import type { Metadata } from "next";

// Ana sayfa metadata
export const metadata: Metadata = {
  title: "Esmer Market - Taze Ürünler & Özel Lezzetler",
  description: "Esmer Market'te taze sebze-meyve, özel lezzetler ve günlük ihtiyaçlarınızı keşfedin. Mağazamızı ziyaret edin veya ürünlerimizi online inceleyin.",
  keywords: "Esmer Market, market, taze ürünler, organik gıda, Yeni Boğaziçi, Mağusa, Kıbrıs, yerel market, bakkal, fırın ürünleri, peynir, süt ürünleri",
  authors: [{ name: "Esmer Market" }],
  creator: "Esmer Market",
  publisher: "Esmer Market",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://esmermarket.com"),
  alternates: {
    canonical: "/",
    languages: {
      "tr-TR": "/tr",
      "en-US": "/en",
    },
  },
  openGraph: {
    title: "Esmer Market - Taze Ürünler & Özel Lezzetler",
    description: "Esmer Market'te taze sebze-meyve, özel lezzetler ve günlük ihtiyaçlarınızı keşfedin. Mağazamızı ziyaret edin veya ürünlerimizi online inceleyin.",
    url: "https://esmermarket.com",
    siteName: "Esmer Market",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "https://esmermarket.com/images/market.png",
        width: 1200,
        height: 630,
        alt: "Esmer Market Logo ve Mağaza Görünümü",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Esmer Market - Taze Ürünler & Özel Lezzetler",
    description: "Esmer Market'te taze sebze-meyve, özel lezzetler ve günlük ihtiyaçlarınızı keşfedin.",
    images: ["https://esmermarket.com/images/market.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
  category: "grocery store",
};

// Ürünler sayfası metadata
export const productsMetadata: Metadata = {
  title: "Esmer Market - Ürünlerimiz | Taze Sebze, Meyve, Fırın ve Süt Ürünleri",
  description: "Esmer Market'te taze sebze ve meyve, fırın ürünleri, süt ve peynir çeşitleri. Kaliteli ve taze ürünleri uygun fiyatlarla bulabilirsiniz.",
  keywords: "taze sebze, taze meyve, organik ürünler, fırın ürünleri, ekmek, süt ürünleri, peynir, hellim",
  openGraph: {
    title: "Esmer Market - Ürünlerimiz | Taze Sebze, Meyve, Fırın ve Süt Ürünleri",
    description: "Esmer Market'te taze sebze ve meyve, fırın ürünleri, süt ve peynir çeşitleri. Kaliteli ve taze ürünleri uygun fiyatlarla bulabilirsiniz.",
    url: "https://esmermarket.com/products",
    images: [
      {
        url: "https://esmermarket.com/images/VegetablesMain.jpg",
        width: 1200,
        height: 630,
        alt: "Esmer Market Taze Sebze ve Meyve Reyonu",
      },
    ],
  },
};

// Yorumlar sayfası metadata
export const reviewsMetadata: Metadata = {
  title: "Esmer Market - Müşteri Yorumları | Deneyimler ve Değerlendirmeler",
  description: "Esmer Market müşterilerinin deneyimleri ve değerlendirmeleri. Siz de alışveriş deneyiminizi paylaşın ve diğer müşterilere yardımcı olun.",
  keywords: "müşteri yorumları, değerlendirmeler, market yorumları, müşteri deneyimleri, Esmer Market deneyimi",
  openGraph: {
    title: "Esmer Market - Müşteri Yorumları | Deneyimler ve Değerlendirmeler",
    description: "Esmer Market müşterilerinin deneyimleri ve değerlendirmeleri. Siz de alışveriş deneyiminizi paylaşın ve diğer müşterilere yardımcı olun.",
    url: "https://esmermarket.com/reviews",
    images: [
      {
        url: "https://esmermarket.com/images/team.jpg",
        width: 1200,
        height: 630,
        alt: "Esmer Market Müşteri Yorumları",
      },
    ],
  },
}; 