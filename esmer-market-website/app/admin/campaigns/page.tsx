"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCampaigns, deleteCampaign, updateCampaign, formatCampaignDate } from "../../../lib/firebase/campaignsService";
import { Campaign } from "../../../lib/firebase/campaignsService";

export default function CampaignsPage() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Kampanyaları yükle
  useEffect(() => {
    async function loadCampaigns() {
      try {
        setIsLoading(true);
        const campaignsData = await getCampaigns();
        setCampaigns(campaignsData);
        setError(null);
      } catch (error: any) {
        console.error("Error loading campaigns:", error);
        setError(error.message || "Kampanyalar yüklenirken bir hata oluştu.");
      } finally {
        setIsLoading(false);
      }
    }

    loadCampaigns();
  }, []);

  // Kampanya silme işlemi
  const handleDelete = async (id: string) => {
    if (window.confirm("Bu kampanyayı silmek istediğinizden emin misiniz?")) {
      try {
        setIsLoading(true);
        await deleteCampaign(id);
        setCampaigns(campaigns.filter(campaign => campaign.id !== id));
      } catch (error: any) {
        console.error("Error deleting campaign:", error);
        alert(error.message || "Kampanya silinirken bir hata oluştu.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Aktif/Pasif durumunu değiştir
  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      await updateCampaign(id, { isActive: !currentStatus });
      setCampaigns(campaigns.map(campaign => 
        campaign.id === id ? { ...campaign, isActive: !campaign.isActive } : campaign
      ));
    } catch (error: any) {
      console.error("Error updating campaign status:", error);
      alert(error.message || "Kampanya durumu güncellenirken bir hata oluştu.");
    }
  };

  if (isLoading && campaigns.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <section className="w-full py-12 md:py-16 lg:py-20 bg-green-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-gray-900 mb-6">
                Kampanyalar
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

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <section className="w-full py-12 md:py-16 lg:py-20 bg-green-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-gray-900 mb-6">
                Kampanyalar
              </h1>
              <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                <p className="text-red-600">
                  Hata: {error}
                </p>
              </div>
              <button 
                onClick={() => router.refresh()}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Yeniden Dene
              </button>
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
                Kampanyalar
              </h1>
              <Link 
                href="/admin/campaigns/new"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Yeni Kampanya
              </Link>
            </div>
            <p className="text-xl text-gray-700 mb-8">
              Mevcut kampanyaları yönetin veya yeni kampanyalar ekleyin.
            </p>
          </div>
        </div>
      </section>
      
      <section className="w-full py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {campaigns.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">Henüz kampanya bulunmuyor.</p>
                <Link 
                  href="/admin/campaigns/new"
                  className="mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  İlk Kampanyanızı Ekleyin
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                {isLoading && (
                  <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                  </div>
                )}
                <table className="w-full bg-white shadow-sm rounded-lg overflow-hidden">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Kampanya Adı
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tarihler
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Durum
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        İşlemler
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {campaigns.map((campaign) => (
                      <tr key={campaign.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {campaign.imageUrl && (
                              <div className="flex-shrink-0 h-10 w-10 mr-3">
                                <img 
                                  className="h-10 w-10 rounded-md object-cover" 
                                  src={campaign.imageUrl} 
                                  alt={campaign.title} 
                                />
                              </div>
                            )}
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {campaign.title}
                              </div>
                              <div className="text-sm text-gray-500">
                                {campaign.description.length > 50 ? 
                                  `${campaign.description.substring(0, 50)}...` : 
                                  campaign.description
                                }
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {formatCampaignDate(campaign.startDate)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatCampaignDate(campaign.endDate)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => toggleActive(campaign.id, campaign.isActive)}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              campaign.isActive 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {campaign.isActive ? 'Aktif' : 'Pasif'}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link
                            href={`/admin/campaigns/${campaign.id}`}
                            className="text-green-600 hover:text-green-900 mr-4"
                          >
                            Düzenle
                          </Link>
                          <button
                            onClick={() => handleDelete(campaign.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Sil
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-5xl mx-auto">
          <Link 
            href="/admin"
            className="text-green-600 hover:text-green-800 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Yönetici Paneline Dön
          </Link>
        </div>
      </div>
    </div>
  );
} 