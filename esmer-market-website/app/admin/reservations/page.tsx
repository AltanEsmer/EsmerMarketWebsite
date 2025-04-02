"use client";

import { useState, useEffect } from 'react';
import { format } from 'date-fns';

interface Product {
  id: string;
  name: string;
  imageUrl?: string;
}

interface Reservation {
  id: string;
  reservationCode: string;
  status: 'pending' | 'confirmed' | 'ready' | 'completed' | 'cancelled';
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  pickupDate: string;
  pickupTime: string;
  quantity: number;
  specialInstructions?: string;
  createdAt: string;
  updatedAt: string;
  product: Product;
}

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');
  
  // Fetch reservations
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/reservations');
        
        if (!response.ok) {
          throw new Error('Failed to fetch reservations');
        }
        
        const data = await response.json();
        setReservations(data.reservations);
      } catch (err) {
        setError('Failed to load reservations. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchReservations();
  }, []);
  
  // Update reservation status
  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/reservations/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update reservation status');
      }
      
      // Update local state
      setReservations(prevReservations =>
        prevReservations.map(reservation =>
          reservation.id === id
            ? { ...reservation, status: newStatus as Reservation['status'] }
            : reservation
        )
      );
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status. Please try again.');
    }
  };
  
  // Filter reservations
  const filteredReservations = filter === 'all'
    ? reservations
    : reservations.filter(reservation => reservation.status === filter);
  
  // Sort reservations (newest first for pending/confirmed, oldest first for ready)
  const sortedReservations = [...filteredReservations].sort((a, b) => {
    if (['pending', 'confirmed'].includes(a.status) && ['pending', 'confirmed'].includes(b.status)) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return new Date(a.pickupDate).getTime() - new Date(b.pickupDate).getTime();
  });
  
  // Format date for display
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy');
  };
  
  // Get status badge
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
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8">Reservation Management</h1>
      
      {/* Status Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 text-sm rounded-md transition-colors ${
              filter === 'all'
                ? 'bg-gray-800 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            All Reservations
          </button>
          
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 text-sm rounded-md transition-colors ${
              filter === 'pending'
                ? 'bg-yellow-500 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Pending
          </button>
          
          <button
            onClick={() => setFilter('confirmed')}
            className={`px-4 py-2 text-sm rounded-md transition-colors ${
              filter === 'confirmed'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Confirmed
          </button>
          
          <button
            onClick={() => setFilter('ready')}
            className={`px-4 py-2 text-sm rounded-md transition-colors ${
              filter === 'ready'
                ? 'bg-green-500 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Ready for Pickup
          </button>
          
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 text-sm rounded-md transition-colors ${
              filter === 'completed'
                ? 'bg-gray-500 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Completed
          </button>
          
          <button
            onClick={() => setFilter('cancelled')}
            className={`px-4 py-2 text-sm rounded-md transition-colors ${
              filter === 'cancelled'
                ? 'bg-red-500 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Cancelled
          </button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="py-12 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent align-[-0.125em]" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
          </div>
          <p className="mt-2 text-gray-600">Loading reservations...</p>
        </div>
      ) : error ? (
        <div className="py-12 text-center">
          <div className="bg-red-50 rounded-lg p-6 inline-block">
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      ) : sortedReservations.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-gray-500">No reservations found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reservation Code
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pickup Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedReservations.map((reservation) => {
                const { color, label } = getStatusBadge(reservation.status);
                return (
                  <tr key={reservation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {reservation.reservationCode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {reservation.product.imageUrl && (
                          <div className="flex-shrink-0 h-10 w-10 mr-3">
                            <img className="h-10 w-10 rounded-md object-cover" src={reservation.product.imageUrl} alt="" />
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">{reservation.product.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{reservation.customerName}</div>
                      <div className="text-sm text-gray-500">{reservation.customerEmail}</div>
                      <div className="text-sm text-gray-500">{reservation.customerPhone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(reservation.pickupDate)}</div>
                      <div className="text-sm text-gray-500">{reservation.pickupTime}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {reservation.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${color}`}>
                        {label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="space-y-1">
                        {reservation.status === 'pending' && (
                          <button
                            onClick={() => updateStatus(reservation.id, 'confirmed')}
                            className="text-blue-600 hover:text-blue-900 block"
                          >
                            Confirm
                          </button>
                        )}
                        {(reservation.status === 'pending' || reservation.status === 'confirmed') && (
                          <button
                            onClick={() => updateStatus(reservation.id, 'ready')}
                            className="text-green-600 hover:text-green-900 block"
                          >
                            Mark Ready
                          </button>
                        )}
                        {reservation.status === 'ready' && (
                          <button
                            onClick={() => updateStatus(reservation.id, 'completed')}
                            className="text-gray-600 hover:text-gray-900 block"
                          >
                            Complete
                          </button>
                        )}
                        {(reservation.status === 'pending' || reservation.status === 'confirmed') && (
                          <button
                            onClick={() => updateStatus(reservation.id, 'cancelled')}
                            className="text-red-600 hover:text-red-900 block"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 