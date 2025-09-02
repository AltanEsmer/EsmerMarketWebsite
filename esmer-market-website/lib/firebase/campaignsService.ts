import { db } from './firebaseConfig';
import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  query, 
  orderBy, 
  where,
  serverTimestamp, 
  Timestamp,
  Firestore
} from 'firebase/firestore';

export interface Campaign {
  id: string;
  title: string;
  description: string;
  startDate: Timestamp | Date | string;
  endDate: Timestamp | Date | string;
  isActive: boolean;
  imageUrl?: string;
  createdAt?: Timestamp | Date;
  updatedAt?: Timestamp | Date;
}

const COLLECTION_NAME = 'campaigns';

// Yeni bir kampanya ekle
export async function addCampaign(campaignData: Omit<Campaign, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  if (!db) {
    throw new Error('Firestore is not initialized');
  }
  
  try {
    // Tarihleri Timestamp'e dönüştür
    const startDate = typeof campaignData.startDate === 'string' 
      ? new Date(campaignData.startDate) 
      : campaignData.startDate;
      
    const endDate = typeof campaignData.endDate === 'string' 
      ? new Date(campaignData.endDate) 
      : campaignData.endDate;
    
    const docRef = await addDoc(collection(db as Firestore, COLLECTION_NAME), {
      ...campaignData,
      startDate,
      endDate,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding campaign:', error);
    throw new Error('Kampanya eklenirken bir hata oluştu.');
  }
}

// Kampanyayı güncelle
export async function updateCampaign(id: string, campaignData: Partial<Omit<Campaign, 'id' | 'createdAt' | 'updatedAt'>>): Promise<void> {
  if (!db) {
    throw new Error('Firestore is not initialized');
  }
  
  try {
    const campaignRef = doc(db as Firestore, COLLECTION_NAME, id);
    
    // Tarihleri Timestamp'e dönüştür
    const updateData = { ...campaignData, updatedAt: serverTimestamp() };
    
    if (updateData.startDate && typeof updateData.startDate === 'string') {
      updateData.startDate = new Date(updateData.startDate);
    }
    
    if (updateData.endDate && typeof updateData.endDate === 'string') {
      updateData.endDate = new Date(updateData.endDate);
    }
    
    await updateDoc(campaignRef, updateData);
  } catch (error) {
    console.error('Error updating campaign:', error);
    throw new Error('Kampanya güncellenirken bir hata oluştu.');
  }
}

// Kampanyayı sil
export async function deleteCampaign(id: string): Promise<void> {
  if (!db) {
    throw new Error('Firestore is not initialized');
  }
  
  try {
    const campaignRef = doc(db as Firestore, COLLECTION_NAME, id);
    await deleteDoc(campaignRef);
  } catch (error) {
    console.error('Error deleting campaign:', error);
    throw new Error('Kampanya silinirken bir hata oluştu.');
  }
}

// Kampanyayı ID'ye göre getir
export async function getCampaignById(id: string): Promise<Campaign | null> {
  if (!db) {
    throw new Error('Firestore is not initialized');
  }
  
  try {
    const campaignRef = doc(db as Firestore, COLLECTION_NAME, id);
    const campaignSnap = await getDoc(campaignRef);
    
    if (campaignSnap.exists()) {
      const data = campaignSnap.data();
      return {
        id: campaignSnap.id,
        title: data.title,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
        isActive: data.isActive,
        imageUrl: data.imageUrl,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting campaign:', error);
    throw new Error('Kampanya alınırken bir hata oluştu.');
  }
}

// Tüm kampanyaları getir
export async function getCampaigns(onlyActive = false): Promise<Campaign[]> {
  if (!db) {
    throw new Error('Firestore is not initialized');
  }
  
  try {
    let campaignsQuery;
    
    if (onlyActive) {
      campaignsQuery = query(
        collection(db as Firestore, COLLECTION_NAME),
        where('isActive', '==', true),
        orderBy('startDate', 'desc')
      );
    } else {
      campaignsQuery = query(
        collection(db as Firestore, COLLECTION_NAME),
        orderBy('startDate', 'desc')
      );
    }
    
    const querySnapshot = await getDocs(campaignsQuery);
    const campaigns: Campaign[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      campaigns.push({
        id: doc.id,
        title: data.title,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
        isActive: data.isActive,
        imageUrl: data.imageUrl,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      });
    });
    
    return campaigns;
  } catch (error) {
    console.error('Error getting campaigns:', error);
    throw new Error('Kampanyalar alınırken bir hata oluştu.');
  }
}

// Timestamp'i okunabilir tarih formatına dönüştür
export function formatCampaignDate(timestamp: Timestamp | Date | string): string {
  if (typeof timestamp === 'string') {
    return new Date(timestamp).toLocaleDateString('tr-TR');
  }
  
  const date = timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;
  return date.toLocaleDateString('tr-TR');
} 