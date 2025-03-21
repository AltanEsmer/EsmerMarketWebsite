import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import twilio from 'twilio';

// Schema for reservation validation
const reservationSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().positive(),
  customerName: z.string().min(2),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(10),
  pickupDate: z.string(), // Will be parsed to DateTime
  pickupTime: z.string(),
  specialInstructions: z.string().optional(),
});

// Generate a random reservation code
function generateReservationCode(): string {
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed confusable characters
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Function to send SMS confirmation
async function sendSmsConfirmation(phone: string, name: string, code: string) {
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
    console.warn('Twilio credentials not found. SMS not sent.');
    return false;
  }

  const twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  try {
    await twilioClient.messages.create({
      body: `Hello ${name}, your Esmer Market reservation is confirmed! Your reservation code is: ${code}. Please show this code when you pick up your order.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });
    return true;
  } catch (error) {
    console.error('Error sending SMS:', error);
    return false;
  }
}

// POST /api/reservations - Create a new reservation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validatedData = reservationSchema.parse(body);
    
    // Check if product exists and has enough inventory
    const product = await prisma.product.findUnique({
      where: { id: validatedData.productId },
    });
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    if (product.quantity < validatedData.quantity) {
      return NextResponse.json(
        { error: 'Not enough inventory available' },
        { status: 400 }
      );
    }
    
    // Generate a unique reservation code
    const reservationCode = generateReservationCode();
    
    // Create the reservation in a transaction to ensure data consistency
    const reservation = await prisma.$transaction(async (tx) => {
      // Create reservation
      const newReservation = await tx.reservation.create({
        data: {
          productId: validatedData.productId,
          quantity: validatedData.quantity,
          customerName: validatedData.customerName,
          customerEmail: validatedData.customerEmail,
          customerPhone: validatedData.customerPhone,
          pickupDate: new Date(validatedData.pickupDate),
          pickupTime: validatedData.pickupTime,
          specialInstructions: validatedData.specialInstructions,
          reservationCode,
          status: 'pending',
        },
      });
      
      // Update product inventory
      await tx.product.update({
        where: { id: validatedData.productId },
        data: { quantity: product.quantity - validatedData.quantity },
      });
      
      // Log inventory change
      await tx.inventoryLog.create({
        data: {
          productId: validatedData.productId,
          quantity: validatedData.quantity,
          action: 'reserve',
          note: `Reserved for order: ${newReservation.id}`,
        },
      });
      
      return newReservation;
    });
    
    // Send SMS confirmation (non-blocking)
    sendSmsConfirmation(
      validatedData.customerPhone,
      validatedData.customerName,
      reservationCode
    );
    
    return NextResponse.json(
      { 
        success: true, 
        reservation: {
          id: reservation.id,
          reservationCode,
          status: reservation.status
        }
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }
    
    console.error('Error creating reservation:', error);
    return NextResponse.json(
      { error: 'Failed to create reservation' },
      { status: 500 }
    );
  }
}

// GET /api/reservations - Get all reservations (for admin dashboard)
export async function GET(request: NextRequest) {
  try {
    // Check for authentication/authorization here (implement as needed)
    
    const reservations = await prisma.reservation.findMany({
      include: {
        product: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return NextResponse.json({ reservations }, { status: 200 });
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reservations' },
      { status: 500 }
    );
  }
} 