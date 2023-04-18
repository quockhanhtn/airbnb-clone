import prisma from '~/libs/prismadb';
import { SafeListing } from '~/types';
import getCurrentUser from './getCurrentUser';

export default async function getFavoritesListings(): Promise<Array<SafeListing>> {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return [];
    }

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });
    return favorites.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));
  } catch (e: any) {
    throw new Error(e);
  }
}
