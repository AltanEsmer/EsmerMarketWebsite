"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../../components/AuthProvider";
import { getFirestore, doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, deleteUser, User } from "firebase/auth";

interface SiteSettings {
  storeName: string;
  storePhone: string;
  storeEmail: string;
  storeAddress: string;
  openingHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
}

interface AdminUser {
  id: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function AdminSettingsPage() {
  const { user, loading } = useAuth();
  const [settings, setSettings] = useState<SiteSettings>({
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
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    role: "editor",
  });
  
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    if (!loading && user) {
      fetchSettings();
      fetchAdminUsers();
    }
  }, [loading, user]);

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const db = getFirestore();
      const settingsDoc = await getDoc(doc(db, "settings", "siteSettings"));
      
      if (settingsDoc.exists()) {
        setSettings(settingsDoc.data() as SiteSettings);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAdminUsers = async () => {
    try {
      const db = getFirestore();
      const usersCollection = collection(db, "adminUsers");
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as AdminUser));
      
      setAdminUsers(usersList);
    } catch (error) {
      console.error("Error fetching admin users:", error);
    }
  };

  const saveSettings = async () => {
    setIsSaving(true);
    setSaveMessage("");
    
    try {
      const db = getFirestore();
      await setDoc(doc(db, "settings", "siteSettings"), settings);
      
      setSaveMessage("Ayarlar başarıyla kaydedildi.");
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      console.error("Error saving settings:", error);
      setSaveMessage("Ayarlar kaydedilirken bir hata oluştu.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddUser = async () => {
    if (!newUser.email || !newUser.password) {
      alert("Lütfen email ve şifre alanlarını doldurun.");
      return;
    }
    
    try {
      // Create the user in Firebase Auth
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, newUser.email, newUser.password);
      const createdUser = userCredential.user;
      
      // Add user to Firestore
      const db = getFirestore();
      await setDoc(doc(db, "adminUsers", createdUser.uid), {
        email: newUser.email,
        role: newUser.role,
        createdAt: new Date().toISOString(),
      });
      
      setNewUser({
        email: "",
        password: "",
        role: "editor",
      });
      
      fetchAdminUsers();
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Kullanıcı eklenirken bir hata oluştu.");
    }
  };

  const handleDeleteUser = async (userId: string, userEmail: string) => {
    if (window.confirm(`${userEmail} kullanıcısını silmek istediğinizden emin misiniz?`)) {
      try {
        // Delete from Firestore
        const db = getFirestore();
        await setDoc(doc(db, "adminUsers", userId), { deleted: true }, { merge: true });
        
        // Note: Deleting the actual Firebase Auth user would require additional admin privileges
        // This would typically be handled through a secure backend function
        
        fetchAdminUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Kullanıcı silinirken bir hata oluştu.");
      }
    }
  };

  // If still checking auth state, show loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // If not logged in, redirect to login
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Yetkilendirme Gerekli</h2>
          <p className="mb-4 text-gray-700">Bu sayfaya erişmek için giriş yapmanız gerekmektedir.</p>
          <a 
            href="/login" 
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 inline-block"
          >
            Giriş Sayfasına Git
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-8 bg-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Site Ayarları</h1>
              <p className="text-gray-600">Site ayarlarını ve kullanıcı hesaplarını yönetin.</p>
            </div>
            <Link href="/admin" className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
              Yönetici Paneline Dön
            </Link>
          </div>
        </div>
      </section>
      
      <section className="w-full py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-6 border-b">
              <div className="flex space-x-8">
                <button
                  onClick={() => setActiveTab("general")}
                  className={`pb-4 font-medium ${activeTab === "general" ? "border-b-2 border-green-500 text-green-600" : "text-gray-500"}`}
                >
                  Genel Ayarlar
                </button>
                <button
                  onClick={() => setActiveTab("hours")}
                  className={`pb-4 font-medium ${activeTab === "hours" ? "border-b-2 border-green-500 text-green-600" : "text-gray-500"}`}
                >
                  Çalışma Saatleri
                </button>
                <button
                  onClick={() => setActiveTab("social")}
                  className={`pb-4 font-medium ${activeTab === "social" ? "border-b-2 border-green-500 text-green-600" : "text-gray-500"}`}
                >
                  Sosyal Medya
                </button>
                <button
                  onClick={() => setActiveTab("users")}
                  className={`pb-4 font-medium ${activeTab === "users" ? "border-b-2 border-green-500 text-green-600" : "text-gray-500"}`}
                >
                  Kullanıcılar
                </button>
              </div>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
              </div>
            ) : (
              <div>
                {activeTab === "general" && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900">Genel Ayarlar</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Market Adı:</label>
                        <input
                          type="text"
                          value={settings.storeName}
                          onChange={(e) => setSettings({...settings, storeName: e.target.value})}
                          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Telefon:</label>
                        <input
                          type="text"
                          value={settings.storePhone}
                          onChange={(e) => setSettings({...settings, storePhone: e.target.value})}
                          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">E-posta:</label>
                        <input
                          type="email"
                          value={settings.storeEmail}
                          onChange={(e) => setSettings({...settings, storeEmail: e.target.value})}
                          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Adres:</label>
                        <textarea
                          value={settings.storeAddress}
                          onChange={(e) => setSettings({...settings, storeAddress: e.target.value})}
                          rows={3}
                          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === "hours" && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900">Çalışma Saatleri</h2>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Pazartesi:</label>
                          <input
                            type="text"
                            value={settings.openingHours.monday}
                            onChange={(e) => setSettings({
                              ...settings, 
                              openingHours: {...settings.openingHours, monday: e.target.value}
                            })}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Salı:</label>
                          <input
                            type="text"
                            value={settings.openingHours.tuesday}
                            onChange={(e) => setSettings({
                              ...settings, 
                              openingHours: {...settings.openingHours, tuesday: e.target.value}
                            })}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Çarşamba:</label>
                          <input
                            type="text"
                            value={settings.openingHours.wednesday}
                            onChange={(e) => setSettings({
                              ...settings, 
                              openingHours: {...settings.openingHours, wednesday: e.target.value}
                            })}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Perşembe:</label>
                          <input
                            type="text"
                            value={settings.openingHours.thursday}
                            onChange={(e) => setSettings({
                              ...settings, 
                              openingHours: {...settings.openingHours, thursday: e.target.value}
                            })}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Cuma:</label>
                          <input
                            type="text"
                            value={settings.openingHours.friday}
                            onChange={(e) => setSettings({
                              ...settings, 
                              openingHours: {...settings.openingHours, friday: e.target.value}
                            })}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Cumartesi:</label>
                          <input
                            type="text"
                            value={settings.openingHours.saturday}
                            onChange={(e) => setSettings({
                              ...settings, 
                              openingHours: {...settings.openingHours, saturday: e.target.value}
                            })}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Pazar:</label>
                          <input
                            type="text"
                            value={settings.openingHours.sunday}
                            onChange={(e) => setSettings({
                              ...settings, 
                              openingHours: {...settings.openingHours, sunday: e.target.value}
                            })}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-500">
                        Not: Çalışma saatlerini "08:00 - 19:00" formatında girin. Kapalı günler için "Kapalı" yazın.
                      </p>
                    </div>
                  </div>
                )}
                
                {activeTab === "social" && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900">Sosyal Medya</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Facebook:</label>
                        <input
                          type="text"
                          value={settings.socialMedia.facebook}
                          onChange={(e) => setSettings({
                            ...settings, 
                            socialMedia: {...settings.socialMedia, facebook: e.target.value}
                          })}
                          placeholder="https://facebook.com/sayfaadi"
                          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Instagram:</label>
                        <input
                          type="text"
                          value={settings.socialMedia.instagram}
                          onChange={(e) => setSettings({
                            ...settings, 
                            socialMedia: {...settings.socialMedia, instagram: e.target.value}
                          })}
                          placeholder="https://instagram.com/kullaniciadi"
                          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Twitter:</label>
                        <input
                          type="text"
                          value={settings.socialMedia.twitter}
                          onChange={(e) => setSettings({
                            ...settings, 
                            socialMedia: {...settings.socialMedia, twitter: e.target.value}
                          })}
                          placeholder="https://twitter.com/kullaniciadi"
                          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === "users" && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900">Kullanıcı Yönetimi</h2>
                    
                    <div className="mb-8 p-4 border rounded-lg">
                      <h3 className="text-lg font-medium mb-4">Yeni Kullanıcı Ekle</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">E-posta:</label>
                          <input
                            type="email"
                            value={newUser.email}
                            onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Şifre:</label>
                          <input
                            type="password"
                            value={newUser.password}
                            onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Rol:</label>
                          <select
                            value={newUser.role}
                            onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                          >
                            <option value="admin">Yönetici</option>
                            <option value="editor">Editör</option>
                          </select>
                        </div>
                      </div>
                      <div className="mt-4">
                        <button
                          onClick={handleAddUser}
                          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          Kullanıcı Ekle
                        </button>
                      </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              E-posta
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Rol
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Oluşturulma Tarihi
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              İşlemler
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {adminUsers.length > 0 ? (
                            adminUsers.map((adminUser) => (
                              <tr key={adminUser.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{adminUser.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${adminUser.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                                    {adminUser.role === 'admin' ? 'Yönetici' : 'Editör'}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">
                                    {new Date(adminUser.createdAt).toLocaleDateString('tr-TR')}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  <button
                                    onClick={() => handleDeleteUser(adminUser.id, adminUser.email)}
                                    className="text-red-600 hover:text-red-900"
                                    disabled={adminUser.email === user.email}
                                  >
                                    {adminUser.email === user.email ? "Aktif Kullanıcı" : "Sil"}
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                                Henüz kullanıcı eklenmemiş.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                
                {activeTab !== "users" && (
                  <div className="mt-6 flex items-center">
                    <button
                      onClick={saveSettings}
                      disabled={isSaving}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center"
                    >
                      {isSaving && (
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      )}
                      {isSaving ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                    </button>
                    
                    {saveMessage && (
                      <span className="ml-4 text-sm text-green-600">{saveMessage}</span>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
} 