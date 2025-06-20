import { db } from './firebaseConfig';
import { 
  collection, 
  getDocs, 
  addDoc, 
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
    
    console.log('Firestore collections initialization complete');
  } catch (error) {
    console.error('Error initializing Firestore collections:', error);
  }
} 