import { NextResponse } from 'next/server';

import prisma from '~/libs/prismadb';
import { getCurrentUser } from '~/app/actions';

interface IParams {
  listingId?: string;
}

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: IParams;
  },
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid Id');
  }

  // using deleteMany to can pass userId
  // deleteOne can't pass UserId to query
  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
