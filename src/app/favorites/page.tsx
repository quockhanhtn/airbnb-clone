import { getCurrentUser, getFavoritesListings, getReservations } from '~/app/actions';
import { ClientOnly, EmptyState } from '~/app/components';
import FavoritesClient from './FavoritesClient';

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" showReset={false} />
      </ClientOnly>
    );
  }

  const listings = await getFavoritesListings();
  if (listings === null || listings?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState title="No favorites founds" subtitle="Looks like you have no favorites listing" showReset={false} />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoritesClient currentUser={currentUser} listings={listings} />
    </ClientOnly>
  );
};

export default FavoritesPage;
