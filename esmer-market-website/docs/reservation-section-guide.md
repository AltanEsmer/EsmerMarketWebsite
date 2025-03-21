# Reservation System Documentation

## Overview

The Esmer Market reservation system allows customers to reserve products for pickup. This feature helps reduce wait times and ensures product availability for customers while helping the market manage inventory efficiently.

## User Features

### 1. Browse and Reserve Products

Authenticated users can:
- Browse all available products
- Filter products by category
- See real-time product availability status
- Reserve products for pickup

### 2. Reservation Process

1. **Browse Products**: Users navigate to the Reservations page and browse the available products.
2. **Select Product**: Users click "Reserve" on the product they wish to reserve.
3. **Fill Form**: Users complete the reservation form with:
   - Contact information (name, email, phone)
   - Quantity (up to available stock)
   - Preferred pickup date and time
   - Optional special instructions
4. **Confirm**: After submitting, users receive a unique reservation code.
5. **Lookup**: Users can look up their reservation status using this code.

### 3. Reservation Status Tracking

Reservations go through the following statuses:
- **Pending**: Initial state after creation, awaiting confirmation
- **Confirmed**: Reservation has been approved by staff
- **Ready**: Product is ready for pickup
- **Completed**: Customer has picked up the product
- **Cancelled**: Reservation has been cancelled

## Admin Features

### 1. Reservation Management

Admins can:
- View all reservations
- Filter reservations by status
- Update reservation status
- Cancel reservations (which returns inventory to stock)

### 2. Inventory Management

The system automatically:
- Deducts reserved quantities from inventory
- Returns quantities to inventory if reservations are cancelled

## API Endpoints

The following API endpoints are available for the reservation system:

1. **Create a new reservation:** `/api/reservations`
2. **Get a single product by ID:** `/api/products/[id]`
3. **Get all products:** `/api/products`
4. **Look up a reservation by code:** `/api/reservations/by-code/[code]`
5. **Update reservation status:** `/api/reservations/[id]/status`

## Technical Implementation

### Data Model

1. **Product**:
   - Fields: id, name, description, price, imageUrl, category, quantity
   - Relationships: Has many Reservations

2. **Reservation**:
   - Fields: id, reservationCode, status, customerName, customerEmail, customerPhone, quantity, pickupDate, pickupTime, specialInstructions, createdAt, productId
   - Relationships: Belongs to Product

### Key Components

1. **ProductList**: Displays available products with filtering capabilities
2. **ReservationForm**: Handles the creation of new reservations
3. **Reservation Lookup**: Allows customers to check reservation status
4. **Admin Reservation Management**: Provides interface for staff to manage reservations

## Best Practices

1. **Inventory Management**:
   - Always validate product availability before allowing reservations
   - Use database transactions when updating reservation status and inventory

2. **User Experience**:
   - Provide clear feedback on reservation status
   - Send confirmation emails/SMS with reservation details
   - Make the lookup process simple with clear instructions

3. **Security**:
   - Ensure only authenticated users can create reservations
   - Restrict admin functions to authorized personnel only
   - Validate all user inputs on both client and server side
