import prisma from '~/libs/prismadb';
import { SafeListing, SafeUser } from '~/types';

export default async function getListingById(params: {
  listingId?: string;
}): Promise<null | (SafeListing & { user: SafeUser })> {
  try {
    const { listingId } = params;
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    if (!listing) {
      return null;
    }

    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        emailVerified: listing.user.emailVerified?.toISOString() || null,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
      },
    };
  } catch (e: any) {
    return null;
    // throw new Error(e);
  }
}
