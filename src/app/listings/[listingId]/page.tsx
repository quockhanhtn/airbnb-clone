import { getCurrentUser, getListingById, getReservations } from '~/app/actions';
import { ClientOnly, EmptyState } from '~/app/components';
import ListingClient from './ListingClient';

export type ListingPageParams = {
  listingId?: string;
};

const ListingPage = async ({ params }: { params: ListingPageParams }) => {
  const listing = await getListingById(params);
  const reservations = await getReservations({ listingId: listing?.id || undefined });
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState showReset={false} />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient listing={listing} currentUser={currentUser} reservations={reservations} />
    </ClientOnly>
  );
};
export default ListingPage;
