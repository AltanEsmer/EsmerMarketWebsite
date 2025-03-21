"use client";

import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import ProductList from '../components/ProductList';

export default function ReservationsPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const [activeTab, setActiveTab] = useState<'products' | 'lookup'>('products');
  
  if (!isLoaded) {
    return <div className="container mx-auto px-4 py-16 text-center">Loading...</div>;
  }
  
  if (!isSignedIn) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-6">Access Required</h1>
        <p className="mb-6 text-gray-600">
          Please sign in to make reservations.
        </p>
        <button
          onClick={() => window.location.href = '/sign-in'}
          className="inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
        >
          Sign In
        </button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Product Reservation</h1>
        
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('products')}
                className={`${
                  activeTab === 'products'
                    ? 'border-green-600 text-green-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Browse Products
              </button>
              <button
                onClick={() => setActiveTab('lookup')}
                className={`${
                  activeTab === 'lookup'
                    ? 'border-green-600 text-green-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Lookup Reservation
              </button>
            </nav>
          </div>
        </div>
        
        {activeTab === 'products' ? (
          <div>
            <p className="text-gray-600 mb-8">
              Browse our products and make a reservation for pickup. All reservations require at least 24 hours notice.
            </p>
            <ProductList />
          </div>
        ) : (
          <div>
            <p className="text-gray-600 mb-8">
              Already have a reservation? Enter your reservation code to check its status.
            </p>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const code = (form.elements.namedItem('code') as HTMLInputElement).value;
                  if (code) {
                    window.location.href = `/reservations/lookup?code=${code}`;
                  }
                }} 
                className="space-y-4"
              >
                <div>
                  <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                    Reservation Code
                  </label>
                  <input
                    type="text"
                    id="code"
                    name="code"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter your reservation code"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Look Up Reservation
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 