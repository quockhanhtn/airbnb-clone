import prisma from '~/libs/prismadb';
import { SafeReservation } from '~/types';

export default async function getReservations(params: {
  listingId?: string;
  userId?: string;
  authorId?: string;
}): Promise<null | Array<SafeReservation>> {
  try {
    const { listingId, userId, authorId } = params;
    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }
    if (userId) {
      query.userId = userId;
    }
    if (authorId) {
      query.listing = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!reservations) {
      return null;
    }

    return reservations.map((r) => ({
      ...r,
      createdAt: r.createdAt.toISOString(),
      startDate: r.startDate.toISOString(),
      endDate: r.endDate.toISOString(),
      listing: {
        ...r.listing,
        createdAt: r.listing.createdAt.toISOString(),
      },
    }));
  } catch (e: any) {
    return null;
    // throw new Error(e);
  }
}
