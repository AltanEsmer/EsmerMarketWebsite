# 🛒 Proje Bileti: Esmer Market Web Sitesi

## 🎯 Amaç

Esmer Market için basit, işlevsel ve kullanıcı dostu bir web sitesi geliştirmek. Marketin online satış özelliği yoktur, bu nedenle site yalnızca bilgi verme amaçlıdır. Hedef, kullanıcıların marketin açık olup olmadığını görmesi, ürünlere göz atması ve iletişim kurabilmesidir.

---

## 🧱 Teknoloji Yığını

- **Framework**: Next.js (App Router)
- **Dil**: TypeScript
- **Stil**: TailwindCSS
- **Deploy**: Vercel
- **Animasyon**: Framer Motion (isteğe bağlı)
- **Tema Yönetimi**: Saat bazlı, otomatik gün/gece modu

---

## 🧩 Sayfa ve Bölümler

### 1. `/` Ana Sayfa
- Hoş geldiniz mesajı
- Market logosu (yer tutucu)
- "Şu an açık mı?" göstergesi (otomatik)
- “Bugünün öne çıkan ürünü” alanı (isteğe bağlı)

### 2. `/products` Ürünler Sayfası
- Statik veri ile gelen ürün listesi
- Kategorilere göre filtrelenmiş grid görünümü

### 3. `/contact` İletişim Sayfası
- Marketin adresi
- Google Maps iframe (isteğe bağlı)
- Telefon, e-posta, açılış saatleri tablosu
- Açık/Kapalı durumu tekrar gösterilebilir

---

## ✨ Seçilen Ekstra Özellikler

### ✅ 1. "Şu An Açık mı?" Göstergesi

**Bileşen Adı**: `IsOpenIndicator.tsx`

- `utils/hours.ts` dosyasına açılış/kapanış saatleri girilir.
- Kullanıcının cihaz saatine göre `new Date()` ile saat alınır.
- Gün ve saat bilgisine göre marketin açık mı kapalı mı olduğu belirlenir.
- Görsel çıktı:
  - ✅ Yeşil nokta + “Açık”
  - 🔴 Kırmızı nokta + “Kapalı”

#### Örnek kullanım:
```tsx
<IsOpenIndicator />
Dosya yapısı:
bash
Kopyala
Düzenle
/components
  └── IsOpenIndicator.tsx
/utils
  └── hours.ts
✅ 2. Otomatik Gece/Gündüz Teması
Logic Yeri: layout.tsx

useEffect içinde cihaz saatine göre DOM’a dark sınıfı eklenir veya kaldırılır.

Saat aralığı:

07:00 – 19:00 → Gündüz teması

19:00 – 07:00 → Gece teması

Gerekli ayarlar:
tailwind.config.js → darkMode: "class"

Kod örneği:
ts
Kopyala
Düzenle
useEffect(() => {
  const hour = new Date().getHours();
  const isNight = hour >= 19 || hour < 7;
  document.documentElement.classList.toggle("dark", isNight);
}, []);
Tema renkleri (Tailwind):
Gündüz: bg-white, text-gray-800

Gece: bg-gray-900, text-gray-100

```

📁 Proje Yapısı (Önerilen)
bash
Kopyala
Düzenle
/app
  /page.tsx            → Ana Sayfa
  /products/page.tsx   → Ürün Sayfası
  /contact/page.tsx    → İletişim Sayfası
/components
  IsOpenIndicator.tsx
/utils
  hours.ts
  themeUtils.ts        (gerekirse)
/styles
  globals.css
✅ Kabul Kriterleri
Kullanıcı siteye girdiğinde tema otomatik olarak cihaza uygun şekilde ayarlanmalı.

Marketin açık mı kapalı mı olduğu doğru biçimde belirlenmeli.

Tüm görseller (ikon, metin, tema) Tailwind ile uyumlu ve responsive olmalı.

🧪 Test Edilmesi Gerekenler
08:00'de giriş yapan kullanıcı “Açık” görebilmeli.

22:00'de giren kullanıcı karanlık temayı ve “Kapalı” ibaresini görmeli.

layout.tsx değişikliği sonrası DOM class etkili olmalı.

Mobil görünümde de düzgün render edilmeli.