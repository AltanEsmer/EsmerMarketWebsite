import { db } from './firebaseConfig';
import { 
  collection, 
  getDocs, 
  addDoc, 
  doc,
  setDoc,
  serverTimestamp, 
  Firestore 
} from 'firebase/firestore';

// Koleksiyonların var olup olmadığını kontrol et ve yoksa oluştur
export async function initializeFirestoreCollections(): Promise<void> {
  if (!db) {
    console.error('Firestore is not initialized');
    return;
  }
  
  try {
    // Campaigns koleksiyonu kontrolü ve örnek veri
    const campaignsCollection = collection(db as Firestore, 'campaigns');
    const campaignsSnapshot = await getDocs(campaignsCollection);
    
    if (campaignsSnapshot.empty) {
      console.log('Creating sample campaign data...');
      
      // Örnek kampanya ekle
      await addDoc(campaignsCollection, {
        title: 'Yaz Meyveleri İndirimi',
        description: 'Tüm taze meyvelerde %20 indirim fırsatı! Bu hafta sonu özel fiyatlarla taze meyveler sizleri bekliyor.',
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 hafta sonra
        isActive: true,
        imageUrl: '/images/fruits.jpg',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      console.log('Sample campaign created successfully!');
    }
    
    // Reviews koleksiyonu kontrolü ve örnek veri
    const reviewsCollection = collection(db as Firestore, 'reviews');
    const reviewsSnapshot = await getDocs(reviewsCollection);
    
    if (reviewsSnapshot.empty) {
      console.log('Creating sample review data...');
      
      // Örnek yorumlar ekle
      await addDoc(reviewsCollection, {
        name: 'Ahmet Yılmaz',
        rating: 5,
        comment: 'Ürünler çok taze ve lezzetliydi. Özellikle peynir çeşitleri harika!',
        createdAt: serverTimestamp()
      });
      
      await addDoc(reviewsCollection, {
        name: 'Ayşe Demir',
        rating: 4,
        comment: 'Sebzeler çok tazeydi. Personel çok yardımcı oldu.',
        createdAt: serverTimestamp()
      });
      
      console.log('Sample reviews created successfully!');
    }
    
    // Settings koleksiyonu kontrolü ve örnek veri
    try {
      const settingsDocRef = doc(db as Firestore, 'settings', 'siteSettings');
      const settingsSnapshot = await getDocs(collection(db as Firestore, 'settings'));
      
      if (settingsSnapshot.empty) {
        console.log('Creating site settings data...');
        
        // Örnek site ayarları ekle
        await setDoc(settingsDocRef, {
          storeName: "Esmer Market",
          storePhone: "+905338214575",
          storeEmail: "eralp@esmermarket.com",
          storeAddress: "Yenikent Bulvarı, Yeni Boğaziçi",
          openingHours: {
            monday: "08:00 - 19:00",
            tuesday: "08:00 - 19:00",
            wednesday: "08:00 - 19:00",
            thursday: "08:00 - 19:00",
            friday: "08:00 - 19:00",
            saturday: "08:00 - 19:00",
            sunday: "Kapalı",
          },
          socialMedia: {
            facebook: "https://facebook.com/esmermarket",
            instagram: "https://instagram.com/esmermarket",
            twitter: "",
          },
          updatedAt: serverTimestamp()
        });
        
        console.log('Site settings created successfully!');
      }
    } catch (error) {
      console.error('Error initializing settings collection:', error);
    }
    
    // AdminUsers koleksiyonu kontrolü
    try {
      // Kullanıcı giriş yapmış mı kontrol et
      const adminUsersCollection = collection(db as Firestore, 'adminUsers');
      const adminUsersSnapshot = await getDocs(adminUsersCollection);
      
      // Eğer admin kullanıcısı yoksa ve kullanıcı kimlik doğrulaması yapmışsa
      if (adminUsersSnapshot.empty) {
        console.log('No admin users found. You need to create an admin user through Firebase Authentication first.');
        console.log('Then manually add the user to the adminUsers collection with the user ID as the document ID.');
        console.log('Example: db.collection("adminUsers").doc(uid).set({ email: "admin@example.com", role: "admin", createdAt: serverTimestamp() })');
      }
    } catch (error) {
      console.error('Error checking admin users collection:', error);
    }
    
    console.log('Firestore collections initialization complete');
  } catch (error) {
    console.error('Error initializing Firestore collections:', error);
  }
} 