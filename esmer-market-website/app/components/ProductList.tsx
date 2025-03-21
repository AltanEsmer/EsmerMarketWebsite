"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category: string;
  quantity: number;
}

export default function ProductList() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/products');
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        setProducts(data.products);
        
        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(data.products.map((product: Product) => product.category))
        ) as string[];
        setCategories(uniqueCategories);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  // Filter products by selected category
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);
  
  // Handle product selection for reservation
  const handleReserveClick = (productId: string) => {
    router.push(`/reservations/new?productId=${productId}`);
  };
  
  // Determine availability label and style
  const getAvailabilityInfo = (quantity: number) => {
    if (quantity <= 0) {
      return {
        label: 'Out of Stock',
        className: 'bg-red-100 text-red-800',
      };
    } else if (quantity < 5) {
      return {
        label: 'Low Stock',
        className: 'bg-amber-100 text-amber-800',
      };
    } else {
      return {
        label: 'In Stock',
        className: 'bg-green-100 text-green-800',
      };
    }
  };
  
  if (isLoading) {
    return (
      <div className="py-12 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent align-[-0.125em]" role="status">
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
        </div>
        <p className="mt-2 text-gray-600">Loading products...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="py-12 text-center">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg inline-block">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 text-sm underline hover:text-red-800"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 text-sm rounded-md transition-colors ${
              selectedCategory === 'all'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            All Products
          </button>
          
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm rounded-md transition-colors ${
                selectedCategory === category
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map(product => {
          const availabilityInfo = getAvailabilityInfo(product.quantity);
          
          return (
            <div 
              key={product.id} 
              className="flex flex-col rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md overflow-hidden"
            >
              <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
                {product.imageUrl ? (
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
                
                <div className="absolute top-2 right-2">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${availabilityInfo.className}`}>
                    {availabilityInfo.label}
                  </span>
                </div>
              </div>
              
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                </div>
                
                <div className="mt-auto flex flex-col space-y-3">
                  <span className="text-green-700 font-medium text-lg">${product.price.toFixed(2)}</span>
                  <button
                    onClick={() => handleReserveClick(product.id)}
                    disabled={product.quantity <= 0}
                    className={`w-full py-2 font-medium rounded-md transition ${
                      product.quantity <= 0
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-600 focus:ring-offset-2'
                    }`}
                  >
                    {product.quantity <= 0 ? 'Out of Stock' : 'Reserve'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <p className="text-gray-600">No products found in this category.</p>
        </div>
      )}
    </div>
  );
} 