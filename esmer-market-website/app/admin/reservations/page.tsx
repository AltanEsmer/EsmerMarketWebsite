"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
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
  const { isSignedIn, isLoaded, userId } = useAuth();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');
  
  // Admin userIds - In a real app, this would come from a database or Clerk roles
  const adminUserIds = ['user_2aO3r6V1BzvlMWQeXK8SFLlPoBX']; // Replace with actual admin user IDs
  
  // Check if current user is an admin
  const isAdmin = adminUserIds.includes(userId || '');
  
  // Fetch reservations
  useEffect(() => {
    if (!isSignedIn || !isAdmin) return;
    
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
  }, [isSignedIn, isAdmin]);
  
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
  
  // Loading state
  if (!isLoaded) {
    return <div className="container mx-auto px-4 py-16 text-center">Loading...</div>;
  }
  
  // Not signed in
  if (!isSignedIn) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-6">Access Required</h1>
        <p className="mb-6 text-gray-600">
          Please sign in to access the admin dashboard.
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
  
  // Not an admin
  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-6">Admin Access Required</h1>
        <p className="mb-6 text-gray-600">
          You do not have permission to access this page.
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
        >
          Return to Home
        </a>
      </div>
    );
  }
  
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
      ) : sortedReservations.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <p className="text-gray-600">No reservations found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reservation
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pickup
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
                const statusBadge = getStatusBadge(reservation.status);
                
                return (
                  <tr key={reservation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900 font-mono">
                            {reservation.reservationCode}
                          </div>
                          <div className="text-xs text-gray-500">
                            {formatDate(reservation.createdAt)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full overflow-hidden">
                          {reservation.product.imageUrl ? (
                            <img 
                              src={reservation.product.imageUrl} 
                              alt={reservation.product.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-gray-400 text-xs">
                              No img
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {reservation.product.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            Qty: {reservation.quantity}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{reservation.customerName}</div>
                      <div className="text-xs text-gray-500">{reservation.customerPhone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(reservation.pickupDate)}</div>
                      <div className="text-xs text-gray-500">{reservation.pickupTime}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusBadge.color}`}>
                        {statusBadge.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2">
                        {reservation.status === 'pending' && (
                          <button
                            onClick={() => updateStatus(reservation.id, 'confirmed')}
                            className="text-blue-600 hover:text-blue-900 text-xs px-2 py-1 bg-blue-50 rounded"
                          >
                            Confirm
                          </button>
                        )}
                        
                        {reservation.status === 'confirmed' && (
                          <button
                            onClick={() => updateStatus(reservation.id, 'ready')}
                            className="text-green-600 hover:text-green-900 text-xs px-2 py-1 bg-green-50 rounded"
                          >
                            Mark Ready
                          </button>
                        )}
                        
                        {reservation.status === 'ready' && (
                          <button
                            onClick={() => updateStatus(reservation.id, 'completed')}
                            className="text-gray-600 hover:text-gray-900 text-xs px-2 py-1 bg-gray-50 rounded"
                          >
                            Complete
                          </button>
                        )}
                        
                        {['pending', 'confirmed', 'ready'].includes(reservation.status) && (
                          <button
                            onClick={() => {
                              if (window.confirm('Are you sure you want to cancel this reservation?')) {
                                updateStatus(reservation.id, 'cancelled');
                              }
                            }}
                            className="text-red-600 hover:text-red-900 text-xs px-2 py-1 bg-red-50 rounded"
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