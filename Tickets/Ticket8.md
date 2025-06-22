# 🔐 Feature Ticket: Admin Paneline Firebase Authentication ile Giriş Kontrolü

## 🎯 Amaç

Şu anda `/admin` sayfasına domaini bilen herkes erişebiliyor. Bu, güvenlik açısından ciddi bir açık oluşturur. Bu nedenle, **yalnızca yetkili kullanıcıların** (örneğin: market sahibi) admin paneline erişebilmesi için Firebase Authentication entegrasyonu yapılacaktır.

---

## ✅ Hedef

- Firebase ile Email/Password tabanlı oturum açma.
- Giriş yapmayan kullanıcılar `/admin` sayfasına erişememeli, `/login` sayfasına yönlendirilmeli.
- Oturum açmış kullanıcı çıkış yapabilmeli.
- UI/UX basit ve kullanıcı dostu olmalı.

---

## 🧱 Teknoloji ve Gereksinimler

- **Firebase Auth** (yalnızca Email/Password kullanılacak)
- `firebase/app`, `firebase/auth` SDK’ları
- Next.js App Router
- `react-firebase-hooks` (isteğe bağlı kullanım kolaylığı için)
- `localStorage` veya `onAuthStateChanged` ile oturum kontrolü

---

## 📁 Sayfa ve Dosya Yapısı

/app
/admin/page.tsx → Korunan admin paneli
/login/page.tsx → Giriş sayfası
/components
AuthProvider.tsx → Firebase context sağlayıcı
LoginForm.tsx → Giriş formu
/firebase
config.ts → Firebase init
auth.ts → Auth export
/middleware.ts → (isteğe bağlı yönlendirme için)

pgsql
Kopyala
Düzenle

---

## 🔐 Akış ve Mantık

### 1. Firebase Setup

- `firebase/config.ts` içinde Firebase initialize edilir.
- `firebase/auth.ts` içinde `getAuth()` dışa aktarılır.

### 2. Giriş Sayfası `/login`

- `LoginForm.tsx` bileşeni ile email/password girişi yapılır.
- Başarılı giriş sonrası kullanıcı `/admin` sayfasına yönlendirilir.
- Hatalı girişlerde kullanıcı uyarılır (örneğin: "E-posta veya şifre yanlış").

### 3. Admin Sayfası `/admin`

- Sayfa yüklendiğinde `onAuthStateChanged` veya `useAuthState` ile kullanıcı kontrol edilir.
- Oturum yoksa kullanıcı `/login` sayfasına yönlendirilir.
- Giriş yapan kullanıcıya "Hoş geldiniz, [email]" ve "Çıkış yap" butonu gösterilir.

### 4. Çıkış

- `signOut()` çağrılarak oturum sonlandırılır.
- Kullanıcı tekrar `/login` sayfasına yönlendirilir.

---

## 🔐 Örnek Giriş Kontrolü

```tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/auth";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) router.push("/login");
    });
    return () => unsubscribe();
  }, [router]);

  return <div>Admin Paneli</div>;
}
🧪 Kabul Kriterleri
/admin sayfası yalnızca oturum açmış kullanıcıya erişilebilir olmalı.

Giriş yapılmadan /admin sayfasına gidildiğinde otomatik /login'e yönlendirme yapılmalı.

Başarılı girişte /admin sayfasına yönlendirme yapılmalı.

Çıkış yapıldığında oturum sıfırlanmalı.

Sayfa yenilendiğinde oturum bilgisi kaybolmamalı (Firebase Auth buna hazırdır).

