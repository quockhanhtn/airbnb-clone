import { getCurrentUser, getReservations } from '~/app/actions';
import { ClientOnly, EmptyState } from '~/app/components';
import ReservationsClient from './ReservationsClient';

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" showReset={false} />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({ authorId: currentUser?.id });
  if (reservations === null || reservations?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No reservations founds"
          subtitle="Looks like you have no reservations on your properties"
          showReset={false}
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ReservationsClient currentUser={currentUser} reservations={reservations} />
    </ClientOnly>
  );
};

export default ReservationsPage;
