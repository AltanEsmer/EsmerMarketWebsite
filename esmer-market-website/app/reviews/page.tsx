"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { addReview, getReviews, formatReviewDate } from '../../lib/firebase/reviewsService';
import { Timestamp } from 'firebase/firestore';

interface Review {
  id: string;
  name: string;
  date?: string;
  rating: number;
  comment: string;
  avatar?: string;
  createdAt?: Timestamp | Date;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    comment: ''
  });
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    isError: false,
    errorMessage: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  // Yorumları yükle
  useEffect(() => {
    async function loadReviews() {
      try {
        const reviewsData = await getReviews();
        setReviews(reviewsData);
      } catch (error) {
        console.error('Error loading reviews:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadReviews();
  }, []);

  // Form değişikliklerini izle
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReview(prev => ({ ...prev, [name]: value }));
  };

  // Derecelendirme değişikliklerini izle
  const handleRatingChange = (rating: number) => {
    setNewReview(prev => ({ ...prev, rating }));
  };

  // Form gönderimi
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newReview.name.trim() || !newReview.comment.trim()) {
      return;
    }
    
    setFormStatus({ 
      isSubmitting: true, 
      isSubmitted: false, 
      isError: false,
      errorMessage: '' 
    });
    
    try {
      // Yeni yorumu Firebase'e ekle
      await addReview({
        name: newReview.name,
        rating: newReview.rating,
        comment: newReview.comment,
      });
      
      // Başarılı olduğunda formu sıfırla
      setNewReview({ name: '', rating: 5, comment: '' });
      setFormStatus({ 
        isSubmitting: false, 
        isSubmitted: true, 
        isError: false,
        errorMessage: '' 
      });
      
      // Yorumları yeniden yükle
      const updatedReviews = await getReviews();
      setReviews(updatedReviews);
    } catch (error: any) {
      setFormStatus({ 
        isSubmitting: false, 
        isSubmitted: false, 
        isError: true,
        errorMessage: error.message || 'Yorum gönderilirken bir hata oluştu.' 
      });
    }
  };

  // Yıldız derecelendirme bileşeni
  const StarRating = ({ rating, onChange }: { rating: number; onChange?: (rating: number) => void }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange && onChange(star)}
            className={`${onChange ? 'cursor-pointer' : 'cursor-default'} p-1`}
            aria-label={`${star} yıldız`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={star <= rating ? 'currentColor' : 'none'}
              stroke={star <= rating ? 'currentColor' : 'currentColor'}
              className={`h-5 w-5 ${star <= rating ? 'text-amber-400' : 'text-gray-300'}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 bg-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-gray-900 mb-6">
              Müşteri Yorumları
            </h1>
            <p className="text-xl text-gray-700">
              Müşterilerimizin Esmer Market hakkındaki düşünceleri ve deneyimleri.
            </p>
          </div>
        </div>
      </section>
      
      <section className="w-full py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Yorum Formu */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Yorum Yapın</h2>
              <p className="text-gray-700 mb-6">
                Deneyiminizi paylaşın ve diğer müşterilere yardımcı olun.
              </p>
              
              {/* Başarı Mesajı */}
              {formStatus.isSubmitted && (
                <div className="mb-6 rounded-md bg-green-50 p-4 border border-green-200">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-green-800">Yorumunuz için teşekkür ederiz! Yorumunuz başarıyla gönderildi.</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Hata Mesajı */}
              {formStatus.isError && (
                <div className="mb-6 rounded-md bg-red-50 p-4 border border-red-200">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-red-800">{formStatus.errorMessage}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Adınız <span className="text-green-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={newReview.name}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 p-3 text-gray-700 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                    placeholder="Adınızı girin"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="rating" className="text-sm font-medium text-gray-700">
                    Değerlendirme <span className="text-green-500">*</span>
                  </label>
                  <div className="flex items-center">
                    <StarRating rating={newReview.rating} onChange={handleRatingChange} />
                    <span className="ml-2 text-sm text-gray-600">{newReview.rating}/5</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="comment" className="text-sm font-medium text-gray-700">
                    Yorumunuz <span className="text-green-500">*</span>
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    rows={4}
                    value={newReview.comment}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 p-3 text-gray-700 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                    placeholder="Deneyiminizi paylaşın..."
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={formStatus.isSubmitting || formStatus.isSubmitted}
                  className="inline-flex h-12 items-center justify-center rounded-md bg-green-600 px-8 text-base font-medium text-white shadow-sm transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 disabled:opacity-70"
                >
                  {formStatus.isSubmitting ? 'Gönderiliyor...' : 'Yorum Gönder'}
                </button>
              </form>
            </div>
            
            {/* Yorumlar Listesi */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-gray-900">Son Yorumlar</h2>
              
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500"></div>
                </div>
              ) : reviews.length === 0 ? (
                <p className="text-gray-600">Henüz yorum yapılmamış.</p>
              ) : (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-4">
                          <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200">
                            <Image
                              src={review.avatar || "/images/team.jpg"}
                              alt={`${review.name} avatar`}
                              width={40}
                              height={40}
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">{review.name}</h3>
                            <span className="text-sm text-gray-500">
                              {review.date || (review.createdAt && formatReviewDate(review.createdAt))}
                            </span>
                          </div>
                          <div className="mt-1">
                            <StarRating rating={review.rating} />
                          </div>
                          <p className="mt-3 text-gray-700">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 