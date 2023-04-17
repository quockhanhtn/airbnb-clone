import { NextResponse } from 'next/server';
import * as yup from 'yup';
import prisma from '~/libs/prismadb';

import { getCurrentUser } from '~/app/actions';
import { differenceInCalendarDays } from 'date-fns';

const validationSchema = yup.object({
  listingId: yup.string().required(),
  startDate: yup.string().required(),
  endDate: yup.string().required(),
  totalPrice: yup.number().positive().required(),
});

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  try {
    validationSchema.validateSync(body);
  } catch (error) {
    return NextResponse.error();
  }

  const { listingId, startDate: startDateStr, endDate: endDateStr, totalPrice: totalPriceClient } = body;

  const listing = await prisma.listing.findUnique({
    where: {
      id: listingId,
    },
  });
  if (!listing) {
    return NextResponse.error();
  }

  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  const dayCount = differenceInCalendarDays(endDate, startDate);

  const totalPrice = dayCount * listing.price;

  if (Math.abs(totalPrice - totalPriceClient) > 0.0001) {
    return NextResponse.error();
  }

  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice,
        },
      },
    },
  });

  return NextResponse.json(listingAndReservation);
}
