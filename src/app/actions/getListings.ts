import prisma from '~/libs/prismadb';
import { SafeListing } from '~/types';

export type IListingParams = {
  userId?: string;
};

export default async function getListings(params: IListingParams): Promise<Array<SafeListing>> {
  try {
    const query: any = {};

    const { userId } = params;
    if (userId) {
      query.userId = userId;
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
