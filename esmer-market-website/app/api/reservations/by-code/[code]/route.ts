import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const code = params.code;
    
    if (!code) {
      return NextResponse.json(
        { error: 'Reservation code is required' },
        { status: 400 }
      );
    }
    
    const reservation = await prisma.reservation.findUnique({
      where: { reservationCode: code },
      include: {
        product: {
          select: {
            name: true,
            imageUrl: true,
          },
        },
      },
    });
    
    if (!reservation) {
      return NextResponse.json(
        { error: 'Reservation not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      id: reservation.id,
      code: reservation.reservationCode,
      status: reservation.status,
      customerName: reservation.customerName,
      pickupDate: reservation.pickupDate,
      pickupTime: reservation.pickupTime,
      quantity: reservation.quantity,
      product: reservation.product,
      createdAt: reservation.createdAt,
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching reservation:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reservation' },
      { status: 500 }
    );
  }
} 