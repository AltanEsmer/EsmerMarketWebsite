"use client";

import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCampaignById, updateCampaign } from "../../../../lib/firebase/campaignsService";
import { Campaign } from "../../../../lib/firebase/campaignsService";

export default function EditCampaignPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  
  const [formData, setFormData] = useState<Campaign>({
    id: "",
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    isActive: true,
    imageUrl: ""
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Kampanya verilerini yükle
  useEffect(() => {
    async function loadCampaign() {
      try {
        setIsLoading(true);
        const campaign = await getCampaignById(id);
        
        if (campaign) {
          // Tarihleri input için uygun formata dönüştür (YYYY-MM-DD)
          const formatDateForInput = (date: any) => {
            if (typeof date === 'string') {
              return date.split('T')[0];
            }
            
            const d = date.toDate ? date.toDate() : new Date(date);
            return d.toISOString().split('T')[0];
          };
          
          setFormData({
            ...campaign,
            startDate: formatDateForInput(campaign.startDate),
            endDate: formatDateForInput(campaign.endDate)
          });
        } else {
          setError("Kampanya bulunamadı.");
        }
      } catch (error: any) {
        console.error("Error loading campaign:", error);
        setError(error.message || "Kampanya yüklenirken bir hata oluştu.");
      } finally {
        setIsLoading(false);
      }
    }

    loadCampaign();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Form doğrulama
    if (!formData.title.trim()) {
      setError("Kampanya başlığı gereklidir.");
      setIsSubmitting(false);
      return;
    }

    if (!formData.description.trim()) {
      setError("Kampanya açıklaması gereklidir.");
      setIsSubmitting(false);
      return;
    }

    if (!formData.startDate) {
      setError("Başlangıç tarihi gereklidir.");
      setIsSubmitting(false);
      return;
    }

    if (!formData.endDate) {
      setError("Bitiş tarihi gereklidir.");
      setIsSubmitting(false);
      return;
    }

    // Tarih doğrulama
    const startDate = new Date(formData.startDate as string);
    const endDate = new Date(formData.endDate as string);

    if (endDate < startDate) {
      setError("Bitiş tarihi başlangıç tarihinden önce olamaz.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Firebase'de kampanyayı güncelle
      await updateCampaign(id, {
        title: formData.title,
        description: formData.description,
        startDate: formData.startDate as string,
        endDate: formData.endDate as string,
        isActive: formData.isActive,
        imageUrl: formData.imageUrl || undefined
      });
      
      router.push("/admin/campaigns");
    } catch (err: any) {
      setError(err.message || "Kampanya güncellenirken bir hata oluştu. Lütfen tekrar deneyin.");
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <section className="w-full py-12 md:py-16 lg:py-20 bg-green-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-gray-900 mb-6">
                Kampanya Düzenle
              </h1>
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                <span className="ml-3 text-lg text-gray-600">Yükleniyor...</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error && !formData.id) {
    return (
      <div className="flex flex-col min-h-screen">
        <section className="w-full py-12 md:py-16 lg:py-20 bg-green-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-gray-900 mb-6">
                Kampanya Düzenle
              </h1>
              <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                <p className="text-red-600">
                  {error}
                </p>
              </div>
              <div className="mt-6">
                <Link 
                  href="/admin/campaigns"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Kampanyalar Listesine Dön
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-16 lg:py-20 bg-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900">
                Kampanya Düzenle
              </h1>
            </div>
            <p className="text-xl text-gray-700 mb-8">
              Kampanya bilgilerini güncelleyin.
            </p>
          </div>
        </div>
      </section>
      
      <section className="w-full py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600">{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Kampanya Başlığı <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Örn: Yaz İndirimi"
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Kampanya Açıklaması <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Kampanyanın detaylarını girin..."
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Başlangıç Tarihi <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate as string}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Bitiş Tarihi <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate as string}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Görsel URL
                </label>
                <input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Örn: /images/campaign.jpg"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Görsel URL'si opsiyoneldir. /images/ klasöründeki görselleri kullanabilirsiniz.
                </p>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                  Kampanyayı aktif olarak yayınla
                </label>
              </div>
              
              <div className="flex items-center justify-end space-x-4 pt-4">
                <Link
                  href="/admin/campaigns"
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  İptal
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  {isSubmitting ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-3xl mx-auto">
          <Link 
            href="/admin/campaigns"
            className="text-green-600 hover:text-green-800 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Kampanyalar Listesine Dön
          </Link>
        </div>
      </div>
    </div>
  );
} 