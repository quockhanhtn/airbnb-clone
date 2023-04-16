import prisma from '~/libs/prismadb';
import { SafeListing } from '~/types';

export default async function getListings(): Promise<Array<SafeListing>> {
  try {
    const listings = await prisma.listing.findMany({
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
