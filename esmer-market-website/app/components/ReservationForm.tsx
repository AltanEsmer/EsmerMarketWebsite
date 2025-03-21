"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category: string;
  quantity: number;
}

interface ReservationFormProps {
  product: Product;
}

export default function ReservationForm({ product }: ReservationFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    quantity: 1,
    pickupDate: '',
    pickupTime: '',
    specialInstructions: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [reservationCode, setReservationCode] = useState<string | null>(null);
  
  // Calculate total price
  const totalPrice = product.price * formData.quantity;
  
  // Generate available time slots (9 AM to 6 PM, 30-minute intervals)
  const timeSlots = [];
  for (let hour = 9; hour <= 18; hour++) {
    const hourString = hour < 10 ? `0${hour}` : `${hour}`;
    timeSlots.push(`${hourString}:00`);
    if (hour < 18) {
      timeSlots.push(`${hourString}:30`);
    }
  }
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) : value
    }));
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Form validation
      if (formData.quantity < 1) {
        throw new Error('Quantity must be at least 1');
      }
      
      if (formData.quantity > product.quantity) {
        throw new Error(`Only ${product.quantity} items available`);
      }
      
      // Format date for API
      const reservationData = {
        productId: product.id,
        quantity: formData.quantity,
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        pickupDate: formData.pickupDate,
        pickupTime: formData.pickupTime,
        specialInstructions: formData.specialInstructions,
      };
      
      // Submit reservation to API
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create reservation');
      }
      
      // Show success message with reservation code
      setSuccess(true);
      setReservationCode(data.reservation.reservationCode);
      
      // Reset form
      setFormData({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        quantity: 1,
        pickupDate: '',
        pickupTime: '',
        specialInstructions: '',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // For minimum pickup date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = format(tomorrow, 'yyyy-MM-dd');
  
  // For maximum pickup date (30 days from now)
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateStr = format(maxDate, 'yyyy-MM-dd');
  
  // If successful submission, show success message
  if (success && reservationCode) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="bg-white rounded-lg p-8 shadow-sm border border-green-100 mb-6">
          <h3 className="text-xl font-bold text-green-800 mb-2">Reservation Confirmed!</h3>
          <p className="text-gray-700 mb-6">Your reservation has been successfully created.</p>
          
          <div className="bg-green-50 p-4 rounded-md mb-6">
            <p className="text-sm text-gray-600 mb-2">Your reservation code:</p>
            <p className="text-3xl font-mono font-bold tracking-wider text-green-700 mb-1">{reservationCode}</p>
            <p className="text-xs text-gray-500">Please save this code for pickup</p>
          </div>
          
          <p className="text-sm text-gray-600">
            We've sent a confirmation to your email and phone. Please show your reservation code when you arrive for pickup.
          </p>
        </div>
        
        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              setSuccess(false);
              setReservationCode(null);
            }}
            className="px-4 py-2 text-sm bg-white text-green-700 border border-green-300 rounded-md hover:bg-green-50"
          >
            Make Another Reservation
          </button>
          
          <button
            onClick={() => router.push(`/reservations/lookup?code=${reservationCode}`)}
            className="px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            View Reservation Details
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold mb-4">Reserve {product.name}</h2>
      
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
          <div>
            <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          
          <div>
            <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="customerEmail"
              name="customerEmail"
              value={formData.customerEmail}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          
          <div>
            <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              id="customerPhone"
              name="customerPhone"
              value={formData.customerPhone}
              onChange={handleChange}
              required
              pattern="[0-9]{10,15}"
              title="Phone number (10-15 digits)"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
            <p className="text-xs text-gray-500 mt-1">Format: 10-15 digits, no spaces or special characters</p>
          </div>
          
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
              Quantity *
            </label>
            <div className="flex items-center">
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="1"
                max={product.quantity}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">{product.quantity} available</p>
          </div>
          
          <div>
            <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700 mb-1">
              Pickup Date *
            </label>
            <input
              type="date"
              id="pickupDate"
              name="pickupDate"
              value={formData.pickupDate}
              onChange={handleChange}
              min={minDate}
              max={maxDateStr}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          
          <div>
            <label htmlFor="pickupTime" className="block text-sm font-medium text-gray-700 mb-1">
              Pickup Time *
            </label>
            <select
              id="pickupTime"
              name="pickupTime"
              value={formData.pickupTime}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Select a time</option>
              {timeSlots.map(slot => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">Store hours: 9:00 AM - 6:00 PM</p>
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700 mb-1">
            Special Instructions (Optional)
          </label>
          <textarea
            id="specialInstructions"
            name="specialInstructions"
            value={formData.specialInstructions}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Any special requests or instructions for your order..."
          ></textarea>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Price per unit:</span>
            <span className="text-sm text-gray-700">${product.price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Quantity:</span>
            <span className="text-sm text-gray-700">{formData.quantity}</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-gray-200">
            <span className="text-base font-semibold text-gray-900">Total Price:</span>
            <span className="text-base font-semibold text-green-700">${totalPrice.toFixed(2)}</span>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Processing...' : 'Complete Reservation'}
        </button>
      </form>
    </div>
  );
} 