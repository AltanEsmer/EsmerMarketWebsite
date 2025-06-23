# Firestore Güvenlik Kurallarını Uygulama Rehberi

Bu rehber, Esmer Market web sitesi için Firestore güvenlik kurallarını nasıl uygulayacağınızı açıklamaktadır. Bu kurallar, "Missing or insufficient permissions" hatalarını çözmek için gereklidir.

## 1. Firebase Console'a Giriş Yapın

1. [Firebase Console](https://console.firebase.google.com/)'a gidin
2. Esmer Market projenizi seçin

## 2. Firestore Güvenlik Kurallarını Güncelleyin

1. Sol menüden "Firestore Database" seçeneğini seçin
2. "Rules" sekmesine tıklayın
3. Mevcut kuralları aşağıdaki kurallarla değiştirin:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Campaigns koleksiyonu kuralları
    match /campaigns/{campaignId} {
      // Herkes okuyabilir
      allow read: if true;
      
      // Yazma işlemleri için kurallar (admin paneli için)
      allow create, update, delete: if request.auth != null;
    }
    
    // Reviews koleksiyonu kuralları
    match /reviews/{reviewId} {
      // Herkes okuyabilir
      allow read: if true;
      
      // Herkes yorum ekleyebilir
      allow create: if true;
      
      // Sadece kimlik doğrulaması yapılmış kullanıcılar güncelleyebilir veya silebilir
      allow update, delete: if request.auth != null;
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

4. "Publish" butonuna tıklayın

## 3. İlk Admin Kullanıcısını Oluşturun

Eğer henüz bir admin kullanıcısı oluşturmadıysanız:

1. Firebase Console'da "Authentication" bölümüne gidin
2. "Add user" butonuna tıklayın
3. E-posta ve şifre girin
4. "Add user" butonuna tıklayın
5. Oluşturulan kullanıcının UID'sini kopyalayın

## 4. Admin Kullanıcısını Firestore'a Ekleyin

1. Firebase Console'da "Firestore Database" bölümüne gidin
2. "Start collection" butonuna tıklayın
3. Collection ID olarak "adminUsers" yazın
4. Document ID olarak adım 3'te kopyaladığınız UID'yi yapıştırın
5. Aşağıdaki alanları ekleyin:
   - email (string): Admin kullanıcısının e-posta adresi
   - role (string): "admin"
   - createdAt (timestamp): Geçerli tarih ve saat

6. "Save" butonuna tıklayın

## 5. Uygulamayı Yeniden Başlatın

Değişikliklerin etkili olması için uygulamanızı yeniden başlatın:

```bash
npm run dev
```

## Sorun Giderme

### "Missing or insufficient permissions" Hatası Devam Ediyorsa:

1. Tarayıcınızda oturumu kapatıp yeniden giriş yapın
2. Tarayıcı önbelleğini temizleyin
3. Firebase Console'da oturum açtığınızdan emin olun
4. Firestore kurallarının doğru şekilde yayınlandığını kontrol edin
5. Admin kullanıcısının Firestore'da doğru şekilde oluşturulduğunu kontrol edin

### Kullanıcı Kimlik Doğrulaması Sorunları:

1. Firebase Authentication'da kullanıcının var olduğunu doğrulayın
2. Kullanıcı e-posta adresinin ve şifresinin doğru olduğundan emin olun
3. Kullanıcının e-posta adresinin doğrulandığını kontrol edin (gerekirse)
4. Firebase Authentication'da "Users" sekmesinde kullanıcının durumunu kontrol edin 