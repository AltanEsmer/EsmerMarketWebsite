import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

// Schema for status update validation
const statusUpdateSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'ready', 'completed', 'cancelled']),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    
    // Validate request body
    const { status } = statusUpdateSchema.parse(body);
    
    // Check if reservation exists
    const reservation = await prisma.reservation.findUnique({
      where: { id },
      include: { product: true },
    });
    
    if (!reservation) {
      return NextResponse.json(
        { error: 'Reservation not found' },
        { status: 404 }
      );
    }
    
    // Handle inventory updates for cancellations
    if (status === 'cancelled' && reservation.status !== 'cancelled') {
      // Return inventory in a transaction
      await prisma.$transaction(async (tx) => {
        // Update reservation status
        await tx.reservation.update({
          where: { id },
          data: { status },
        });
        
        // Return quantity to product inventory
        await tx.product.update({
          where: { id: reservation.productId },
          data: { 
            quantity: reservation.product.quantity + reservation.quantity 
          },
        });
        
        // Log inventory change
        await tx.inventoryLog.create({
          data: {
            productId: reservation.productId,
            quantity: reservation.quantity,
            action: 'unreserve',
            note: `Cancelled reservation: ${id}`,
          },
        });
      });
      
      return NextResponse.json(
        { success: true, status },
        { status: 200 }
      );
    }
    
    // For other status updates, just update the status
    const updatedReservation = await prisma.reservation.update({
      where: { id },
      data: { status },
    });
    
    return NextResponse.json(
      { success: true, status: updatedReservation.status },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }
    
    console.error('Error updating reservation status:', error);
    return NextResponse.json(
      { error: 'Failed to update reservation status' },
      { status: 500 }
    );
  }
} 