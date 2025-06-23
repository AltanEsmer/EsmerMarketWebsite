/**
 * Bu script, Firebase Authentication'da var olan bir kullanıcıyı
 * Firestore'daki adminUsers koleksiyonuna admin olarak ekler.
 * 
 * Kullanım:
 * 1. Firebase yapılandırma bilgilerinizi .env.local dosyasında ayarlayın
 * 2. Aşağıdaki komutu çalıştırın:
 *    node scripts/create-admin-user.js <kullanıcı-uid> <kullanıcı-email>
 * 
 * Örnek:
 *    node scripts/create-admin-user.js abc123def456 admin@example.com
 */

// .env.local dosyasından çevre değişkenlerini yükle
require('dotenv').config({ path: '.env.local' });

const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc, serverTimestamp } = require('firebase/firestore');

// Firebase yapılandırması
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Komut satırı argümanlarını al
const args = process.argv.slice(2);
const userId = args[0];
const userEmail = args[1];

if (!userId || !userEmail) {
  console.error('Hata: Kullanıcı UID ve email adresini belirtmelisiniz.');
  console.log('Kullanım: node scripts/create-admin-user.js <kullanıcı-uid> <kullanıcı-email>');
  process.exit(1);
}

async function createAdminUser() {
  try {
    // Firebase'i başlat
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    // Admin kullanıcısını ekle
    await setDoc(doc(db, 'adminUsers', userId), {
      email: userEmail,
      role: 'admin',
      createdAt: new Date().toISOString(),
    });
    
    console.log(`Başarılı! Kullanıcı (${userEmail}) admin olarak eklendi.`);
    process.exit(0);
  } catch (error) {
    console.error('Hata:', error);
    process.exit(1);
  }
}

createAdminUser(); 