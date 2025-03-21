"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { format } from 'date-fns';

interface ReservationDetails {
  id: string;
  code: string;
  status: string;
  customerName: string;
  pickupDate: string;
  pickupTime: string;
  quantity: number;
  product: {
    name: string;
    imageUrl?: string;
  };
  createdAt: string;
}

export default function ReservationLookupPage() {
  const searchParams = useSearchParams();
  const initialCode = searchParams.get('code');
  
  const [reservationCode, setReservationCode] = useState(initialCode || '');
  const [reservation, setReservation] = useState<ReservationDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  // Look up reservation by code
  const lookupReservation = async (code: string) => {
    if (!code.trim()) {
      setError('Please enter a reservation code');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/reservations/by-code/${code}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Reservation not found. Please check your code and try again.');
        }
        throw new Error('Failed to retrieve reservation');
      }
      
      const data = await response.json();
      setReservation(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setReservation(null);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    lookupReservation(reservationCode);
  };
  
  // Check for initial code in URL
  useEffect(() => {
    if (initialCode && isInitialLoad) {
      lookupReservation(initialCode);
      setIsInitialLoad(false);
    }
  }, [initialCode, isInitialLoad]);
  
  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' };
      case 'confirmed':
        return { color: 'bg-blue-100 text-blue-800', label: 'Confirmed' };
      case 'ready':
        return { color: 'bg-green-100 text-green-800', label: 'Ready for Pickup' };
      case 'completed':
        return { color: 'bg-gray-100 text-gray-800', label: 'Completed' };
      case 'cancelled':
        return { color: 'bg-red-100 text-red-800', label: 'Cancelled' };
      default:
        return { color: 'bg-gray-100 text-gray-800', label: status };
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Reservation Lookup</h1>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="reservationCode" className="block text-sm font-medium text-gray-700 mb-1">
                Enter your reservation code
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="reservationCode"
                  name="reservationCode"
                  value={reservationCode}
                  onChange={(e) => setReservationCode(e.target.value.toUpperCase())}
                  placeholder="e.g. ABC12345"
                  className="flex-1 p-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-green-500 focus:border-green-500 uppercase"
                  maxLength={10}
                  required
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-green-600 text-white px-4 py-2 rounded-r-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                >
                  {isLoading ? 'Loading...' : 'Look Up'}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Enter the reservation code you received during checkout
              </p>
            </div>
          </form>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-md mb-8">
            {error}
          </div>
        )}
        
        {reservation && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Reservation Details</h2>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(reservation.status).color}`}>
                  {getStatusBadge(reservation.status).label}
                </span>
              </div>
              
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-500">Reservation Code:</span>
                <span className="font-mono font-medium">{reservation.code}</span>
              </div>
              
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-500">Customer:</span>
                <span>{reservation.customerName}</span>
              </div>
              
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-500">Date Created:</span>
                <span>{format(new Date(reservation.createdAt), 'MMM d, yyyy')}</span>
              </div>
            </div>
            
            <div className="p-6 bg-gray-50">
              <h3 className="font-semibold text-gray-900 mb-4">Pickup Information</h3>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-6">
                <div className="bg-white p-3 rounded border border-gray-200">
                  <span className="block text-xs text-gray-500 mb-1">Pickup Date</span>
                  <span className="font-medium">
                    {format(new Date(reservation.pickupDate), 'EEEE, MMMM d, yyyy')}
                  </span>
                </div>
                
                <div className="bg-white p-3 rounded border border-gray-200">
                  <span className="block text-xs text-gray-500 mb-1">Pickup Time</span>
                  <span className="font-medium">{reservation.pickupTime}</span>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded border border-gray-200 flex items-center">
                <div className="w-16 h-16 overflow-hidden bg-gray-100 rounded flex-shrink-0 mr-4">
                  {reservation.product.imageUrl ? (
                    <img
                      src={reservation.product.imageUrl}
                      alt={reservation.product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                      <span className="text-gray-400 text-xs">No image</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <h4 className="font-medium">{reservation.product.name}</h4>
                  <div className="flex items-center mt-1">
                    <span className="text-sm text-gray-500 mr-2">Quantity:</span>
                    <span className="text-sm font-medium">{reservation.quantity}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-4">
                If you need to modify or cancel your reservation, please contact our customer service team.
              </p>
              <a 
                href="/contact" 
                className="inline-flex items-center text-sm text-green-600 hover:text-green-800 hover:underline"
              >
                Contact Us
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 