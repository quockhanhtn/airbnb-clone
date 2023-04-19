import prisma from '~/libs/prismadb';
import { SafeListing } from '~/types';

export type IListingParams = {
  userId?: string;

  guestCount?: number;
  roomCount?: number;
  bathRoomCount?: number;

  startDate?: string;
  endDate?: string;

  locationValue?: string;
  category?: string;
};

export default async function getListings(params: IListingParams): Promise<Array<SafeListing>> {
  try {
    const query: any = {};

    const { userId, guestCount, roomCount, bathRoomCount, startDate, endDate, locationValue, category } = params;
    if (userId) {
      query.userId = userId;
    }
    if (category) {
      query.category = category;
    }
    if (locationValue) {
      query.locationValue = locationValue;
    }
    if (guestCount) {
      query.guestCount = { gte: +guestCount };
    }
    if (roomCount) {
      query.roomCount = { gte: +roomCount };
    }
    if (bathRoomCount) {
      query.bathroomCount = { gte: +bathRoomCount };
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc',
      },
    });
    return listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));
  } catch (e: any) {
    throw new Error(e);
  }
}
