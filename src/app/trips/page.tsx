import { getCurrentUser, getListingById, getReservations } from '~/app/actions';
import { ClientOnly, EmptyState } from '~/app/components';
import TripsClient from './TripsClient';

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" showReset={false} />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({ userId: currentUser?.id });
  if (reservations === null || reservations?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState title="No trips founds" subtitle="Looks like you haven't reserved any trips" showReset={false} />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsClient currentUser={currentUser} reservations={reservations} />
    </ClientOnly>
  );
};
export default TripsPage;
