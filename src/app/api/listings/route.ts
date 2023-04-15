import { NextResponse } from 'next/server';
import * as yup from 'yup';
import prisma from '~/libs/prismadb';

import { getCurrentUser } from '~/app/actions';

const validationSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  imageSrc: yup.string().url().required(),
  category: yup.string().required(),
  roomCount: yup.number().integer().positive().required(),
  bathroomCount: yup.number().integer().positive().required(),
  guestCount: yup.number().integer().positive().required(),
  location: yup
    .object({
      value: yup.string().required(),
    })
    .required(),
  price: yup.number().positive().required(),
});

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { title, description, imageSrc, category, roomCount, bathroomCount, guestCount, location, price } = body;

  console.log('body:::', body);
  console.log('body:::', Object.keys(body));

  try {
    validationSchema.validateSync(body);
  } catch (error) {
    return NextResponse.error();
  }

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.value,
      price: parseInt(price, 10),
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
