"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../../components/AuthProvider";
import { collection, getDocs, doc, deleteDoc, addDoc, updateDoc, getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string;
  featured: boolean;
  inStock: boolean;
}

export default function AdminProductsPage() {
  const { user, loading } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: 0,
    imageUrl: "",
    featured: false,
    inStock: true
  });
  
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  useEffect(() => {
    if (!loading && user) {
      fetchProducts();
      fetchCategories();
    }
  }, [loading, user]);
  
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const db = getFirestore();
      const productsCollection = collection(db, "products");
      const productsSnapshot = await getDocs(productsCollection);
      const productsList = productsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Product));
      
      setProducts(productsList);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchCategories = async () => {
    try {
      const db = getFirestore();
      const categoriesCollection = collection(db, "categories");
      const categoriesSnapshot = await getDocs(categoriesCollection);
      const categoriesList = categoriesSnapshot.docs.map(doc => doc.data().name);
      
      setCategories(categoriesList);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  
  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    
    try {
      const db = getFirestore();
      await addDoc(collection(db, "categories"), {
        name: newCategory
      });
      
      setCategories([...categories, newCategory]);
      setNewCategory("");
      setIsAddingCategory(false);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };
  
  const handleAddProduct = async () => {
    try {
      const db = getFirestore();
      let imageUrl = newProduct.imageUrl;
      
      if (imageFile) {
        const storage = getStorage();
        const storageRef = ref(storage, `products/${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }
      
      const productData = {
        ...newProduct,
        imageUrl
      };
      
      await addDoc(collection(db, "products"), productData);
      
      setNewProduct({
        name: "",
        description: "",
        category: "",
        price: 0,
        imageUrl: "",
        featured: false,
        inStock: true
      });
      setImageFile(null);
      setIsAddingProduct(false);
      
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  
  const handleUpdateProduct = async () => {
    if (!editingProduct) return;
    
    try {
      const db = getFirestore();
      let imageUrl = editingProduct.imageUrl;
      
      if (imageFile) {
        // Delete old image if it exists
        if (editingProduct.imageUrl) {
          try {
            const storage = getStorage();
            const oldImageRef = ref(storage, editingProduct.imageUrl);
            await deleteObject(oldImageRef);
          } catch (error) {
            console.error("Error deleting old image:", error);
          }
        }
        
        // Upload new image
        const storage = getStorage();
        const storageRef = ref(storage, `products/${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }
      
      const productRef = doc(db, "products", editingProduct.id);
      await updateDoc(productRef, {
        ...editingProduct,
        imageUrl
      });
      
      setEditingProduct(null);
      setImageFile(null);
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
  
  const handleDeleteProduct = async (productId: string, imageUrl: string) => {
    if (window.confirm("Bu ürünü silmek istediğinizden emin misiniz?")) {
      try {
        const db = getFirestore();
        await deleteDoc(doc(db, "products", productId));
        
        // Delete the image from storage if it exists
        if (imageUrl) {
          try {
            const storage = getStorage();
            const imageRef = ref(storage, imageUrl);
            await deleteObject(imageRef);
          } catch (error) {
            console.error("Error deleting image:", error);
          }
        }
        
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };
  
  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory);
  
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Ürün Yönetimi</h1>
              <p className="text-gray-600">Ürün kategorilerini ve ürünleri yönetin.</p>
            </div>
            <Link href="/admin" className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
              Yönetici Paneline Dön
            </Link>
          </div>
        </div>
      </section>
      
      <section className="w-full py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Kategoriler</h2>
              <button 
                onClick={() => setIsAddingCategory(!isAddingCategory)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                {isAddingCategory ? "İptal" : "Kategori Ekle"}
              </button>
            </div>
            
            {isAddingCategory && (
              <div className="mb-6 p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Kategori adı"
                    className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    onClick={handleAddCategory}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Ekle
                  </button>
                </div>
              </div>
            )}
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
                  {category}
                </span>
              ))}
              {categories.length === 0 && (
                <p className="text-gray-500">Henüz kategori eklenmemiş.</p>
              )}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Ürünler</h2>
              <button 
                onClick={() => setIsAddingProduct(!isAddingProduct)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                {isAddingProduct ? "İptal" : "Ürün Ekle"}
              </button>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Kategoriye göre filtrele:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">Tüm Ürünler</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            {isAddingProduct && (
              <div className="mb-8 p-4 border rounded-lg">
                <h3 className="text-lg font-medium mb-4">Yeni Ürün Ekle</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ürün Adı:</label>
                    <input
                      type="text"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kategori:</label>
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">Kategori Seçin</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fiyat:</label>
                    <input
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ürün Görseli:</label>
                    <input
                      type="file"
                      onChange={handleImageChange}
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama:</label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  ></textarea>
                </div>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={newProduct.featured}
                      onChange={(e) => setNewProduct({...newProduct, featured: e.target.checked})}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label htmlFor="featured" className="ml-2 text-sm text-gray-700">Öne Çıkan Ürün</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="inStock"
                      checked={newProduct.inStock}
                      onChange={(e) => setNewProduct({...newProduct, inStock: e.target.checked})}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label htmlFor="inStock" className="ml-2 text-sm text-gray-700">Stokta Var</label>
                  </div>
                </div>
                <button
                  onClick={handleAddProduct}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Ürünü Kaydet
                </button>
              </div>
            )}
            
            {editingProduct && (
              <div className="mb-8 p-4 border rounded-lg">
                <h3 className="text-lg font-medium mb-4">Ürünü Düzenle</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ürün Adı:</label>
                    <input
                      type="text"
                      value={editingProduct.name}
                      onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kategori:</label>
                    <select
                      value={editingProduct.category}
                      onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">Kategori Seçin</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fiyat:</label>
                    <input
                      type="number"
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})}
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ürün Görseli:</label>
                    {editingProduct.imageUrl && (
                      <div className="mb-2">
                        <img 
                          src={editingProduct.imageUrl} 
                          alt={editingProduct.name} 
                          className="h-20 w-20 object-cover rounded"
                        />
                      </div>
                    )}
                    <input
                      type="file"
                      onChange={handleImageChange}
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama:</label>
                  <textarea
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  ></textarea>
                </div>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="edit-featured"
                      checked={editingProduct.featured}
                      onChange={(e) => setEditingProduct({...editingProduct, featured: e.target.checked})}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label htmlFor="edit-featured" className="ml-2 text-sm text-gray-700">Öne Çıkan Ürün</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="edit-inStock"
                      checked={editingProduct.inStock}
                      onChange={(e) => setEditingProduct({...editingProduct, inStock: e.target.checked})}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label htmlFor="edit-inStock" className="ml-2 text-sm text-gray-700">Stokta Var</label>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={handleUpdateProduct}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Değişiklikleri Kaydet
                  </button>
                  <button
                    onClick={() => setEditingProduct(null)}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    İptal
                  </button>
                </div>
              </div>
            )}
            
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ürün
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Kategori
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fiyat
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Durum
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        İşlemler
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <tr key={product.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {product.imageUrl ? (
                                <img 
                                  src={product.imageUrl} 
                                  alt={product.name} 
                                  className="h-10 w-10 rounded-full object-cover mr-3"
                                />
                              ) : (
                                <div className="h-10 w-10 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
                                  <span className="text-gray-500 text-xs">Yok</span>
                                </div>
                              )}
                              <div>
                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                {product.featured && (
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Öne Çıkan
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{product.category}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{product.price.toFixed(2)} TL</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {product.inStock ? 'Stokta' : 'Tükendi'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => setEditingProduct(product)}
                              className="text-indigo-600 hover:text-indigo-900 mr-4"
                            >
                              Düzenle
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id, product.imageUrl)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Sil
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                          {selectedCategory === "all" ? "Henüz ürün eklenmemiş." : "Bu kategoride ürün bulunamadı."}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
} 