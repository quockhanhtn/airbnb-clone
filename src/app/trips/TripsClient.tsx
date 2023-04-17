'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import { SafeReservation, SafeUser } from '~/types';
import { Container, Heading } from '../components';
import { ListingCard } from '../components/listings';

export type TripsClientProps = {
  currentUser?: SafeUser | null;
  reservations?: Array<SafeReservation>;
};

const TripsClient: React.FC<TripsClientProps> = ({ currentUser, reservations }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string>('');

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);
    axios
      .delete(`/api/reservations/${id}`)
      .then(() => {
        toast.success('Reservation cancelled !');
        router.refresh();
      })
      .catch((e) => {
        toast.error('Something went wrong !');
        console.log('reservations-cancel::', e);
      })
      .finally(() => {
        setDeletingId('');
      });
  }, []);

  return (
    <Container>
      <Heading title="Trips" subTitle="Where you've been and where you're going" />

      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2
          md:grid-cols-3 
          lg:grid-cols-4 
          xl:grid-cols-5 
          2xl:grid-cols-6 
          gap-8
        "
      >
        {reservations?.map((r) => (
          <ListingCard
            key={`reservation-${r.id}`}
            data={r.listing}
            reservation={r}
            actionId={r.id}
            onAction={onCancel}
            disabled={deletingId === r.id}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
