import { db } from './firebaseConfig';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  serverTimestamp, 
  Timestamp,
  Firestore
} from 'firebase/firestore';

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: Timestamp | Date;
  avatar?: string;
}

const COLLECTION_NAME = 'reviews';

// Yeni bir yorum ekle
export async function addReview(reviewData: Omit<Review, 'id' | 'createdAt'>): Promise<string> {
  if (!db) {
    throw new Error('Firestore is not initialized');
  }
  
  try {
    const docRef = await addDoc(collection(db as Firestore, COLLECTION_NAME), {
      ...reviewData,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding review:', error);
    throw new Error('Yorum eklenirken bir hata oluştu.');
  }
}

// Tüm yorumları getir (en yeniden en eskiye)
export async function getReviews(): Promise<Review[]> {
  if (!db) {
    throw new Error('Firestore is not initialized');
  }
  
  try {
    const reviewsQuery = query(
      collection(db as Firestore, COLLECTION_NAME),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(reviewsQuery);
    const reviews: Review[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      reviews.push({
        id: doc.id,
        name: data.name,
        rating: data.rating,
        comment: data.comment,
        createdAt: data.createdAt,
        avatar: data.avatar || '/images/team.jpg',
      });
    });
    
    return reviews;
  } catch (error) {
    console.error('Error getting reviews:', error);
    throw new Error('Yorumlar alınırken bir hata oluştu.');
  }
}

// Timestamp'i okunabilir tarih formatına dönüştür
export function formatReviewDate(timestamp: Timestamp | Date): string {
  const date = timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;
  
  const day = date.getDate();
  const month = getMonthName(date.getMonth());
  const year = date.getFullYear();
  
  return `${day} ${month} ${year}`;
}

// Ay adını al
function getMonthName(monthIndex: number): string {
  const months = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];
  return months[monthIndex];
} 