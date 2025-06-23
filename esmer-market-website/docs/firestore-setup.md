# Firebase Firestore Yapılandırması

Bu rehber, Esmer Market web sitesi için Firebase Firestore veritabanını nasıl yapılandıracağınızı açıklamaktadır.

## 1. Firebase Projesini Oluşturma

1. [Firebase Console](https://console.firebase.google.com/)'a gidin
2. "Proje Ekle" butonuna tıklayın
3. Projenize bir isim verin (örn. "esmer-market")
4. Google Analytics'i etkinleştirin (isteğe bağlı)
5. "Projeyi Oluştur" butonuna tıklayın

## 2. Firestore Veritabanını Oluşturma

1. Sol menüden "Firestore Database" seçeneğini seçin
2. "Veritabanı Oluştur" butonuna tıklayın
3. "Test Modunda Başlat" seçeneğini seçin (daha sonra güvenlik kurallarını güncelleyeceğiz)
4. Veritabanı konumunu seçin (size en yakın bölgeyi seçmeniz önerilir)
5. "Etkinleştir" butonuna tıklayın

## 3. Web Uygulaması Yapılandırması

1. Firebase Console ana sayfasında "Proje Ayarları" simgesine tıklayın
2. "Genel" sekmesinde aşağı kaydırın ve "Web Uygulaması" simgesine tıklayın
3. Uygulamanıza bir takma ad verin (örn. "esmer-market-web")
4. "Firebase Hosting'i de bu uygulama için ayarla" seçeneğini işaretleyin (isteğe bağlı)
5. "Uygulama Kaydet" butonuna tıklayın
6. Yapılandırma bilgilerini kopyalayın ve `.env.local` dosyanıza ekleyin:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## 4. Firestore Güvenlik Kuralları

Firestore güvenlik kurallarını aşağıdaki gibi güncelleyin:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Campaigns koleksiyonu kuralları
    match /campaigns/{campaignId} {
      // Herkes okuyabilir
      allow read: if true;
      
      // Yazma işlemleri için kurallar (admin paneli için)
      allow create, update, delete: if true;
    }
    
    // Reviews koleksiyonu kuralları
    match /reviews/{reviewId} {
      // Herkes okuyabilir
      allow read: if true;
      
      // Herkes yorum ekleyebilir
      allow create: if true;
      
      // Sadece kendi yorumlarını güncelleyebilir veya silebilir
      allow update, delete: if true;
    }
    
    // Settings koleksiyonu kuralları
    match /settings/{settingId} {
      // Herkes okuyabilir
      allow read: if true;
      
      // Sadece kimlik doğrulaması yapılmış kullanıcılar güncelleyebilir
      allow create, update, delete: if request.auth != null;
    }
    
    // AdminUsers koleksiyonu kuralları
    match /adminUsers/{userId} {
      // Sadece kimlik doğrulaması yapılmış kullanıcılar okuyabilir
      allow read: if request.auth != null;
      
      // Sadece kimlik doğrulaması yapılmış kullanıcılar güncelleyebilir
      allow create, update, delete: if request.auth != null;
    }
  }
}
```

> **Not:** Bu kurallar, authentication olmayan bir yapı için basitleştirilmiştir. Gerçek bir üretim ortamında, daha sıkı güvenlik kuralları uygulamanız önerilir.

## 5. Koleksiyonlar ve Veri Yapısı

### Campaigns Koleksiyonu

Kampanya dokümanları aşağıdaki alanları içerir:

- `title`: string - Kampanya başlığı
- `description`: string - Kampanya açıklaması
- `startDate`: timestamp - Başlangıç tarihi
- `endDate`: timestamp - Bitiş tarihi
- `isActive`: boolean - Kampanyanın aktif olup olmadığı
- `imageUrl`: string (opsiyonel) - Kampanya görseli URL'i
- `createdAt`: timestamp - Oluşturulma tarihi
- `updatedAt`: timestamp - Güncellenme tarihi

### Reviews Koleksiyonu

Yorum dokümanları aşağıdaki alanları içerir:

- `name`: string - Yorum yapan kişinin adı
- `rating`: number - Değerlendirme puanı (1-5 arası)
- `comment`: string - Yorum metni
- `createdAt`: timestamp - Oluşturulma tarihi
- `avatar`: string (opsiyonel) - Profil resmi URL'i

### Settings Koleksiyonu

Site ayarları dokümanı aşağıdaki alanları içerir:

- `storeName`: string - Market adı
- `storePhone`: string - İletişim telefonu
- `storeEmail`: string - İletişim e-postası
- `storeAddress`: string - Market adresi
- `openingHours`: object - Çalışma saatleri
  - `monday`: string - Pazartesi saatleri
  - `tuesday`: string - Salı saatleri
  - `wednesday`: string - Çarşamba saatleri
  - `thursday`: string - Perşembe saatleri
  - `friday`: string - Cuma saatleri
  - `saturday`: string - Cumartesi saatleri
  - `sunday`: string - Pazar saatleri
- `socialMedia`: object - Sosyal medya bağlantıları
  - `facebook`: string - Facebook sayfası URL'i
  - `instagram`: string - Instagram sayfası URL'i
  - `twitter`: string - Twitter sayfası URL'i

### AdminUsers Koleksiyonu

Admin kullanıcı dokümanları aşağıdaki alanları içerir:

- `email`: string - Kullanıcı e-posta adresi
- `role`: string - Kullanıcı rolü (admin, editor vb.)
- `createdAt`: timestamp - Oluşturulma tarihi

## 6. Örnek Verileri Otomatik Oluşturma

Web uygulaması ilk kez çalıştırıldığında, `initializeFirestoreCollections` fonksiyonu otomatik olarak çalışacak ve koleksiyonlar boşsa örnek veriler ekleyecektir. Bu fonksiyon `FirebaseInit` bileşeni içinde çağrılmaktadır.

## 7. Sorun Giderme

- **Firestore bağlantı hatası:** Firebase yapılandırma bilgilerinizin doğru olduğundan emin olun.
- **İzin hatası:** Firestore güvenlik kurallarınızı kontrol edin.
- **Veri yüklenmiyor:** Tarayıcı konsolunda hata mesajlarını kontrol edin. 