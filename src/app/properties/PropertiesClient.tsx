'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import { SafeListing, SafeReservation, SafeUser } from '~/types';
import { Container, Heading } from '../components';
import { ListingCard } from '../components/listings';

export type PropertiesClientProps = {
  currentUser?: SafeUser | null;
  listings?: Array<SafeListing>;
};

const PropertiesClient: React.FC<PropertiesClientProps> = ({ currentUser, listings }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string>('');

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success('Listing deleted !');
          router.refresh();
        })
        .catch((e) => {
          toast.error('Something went wrong !');
          console.log('listing-deleted-err::', e);
        })
        .finally(() => {
          setDeletingId('');
        });
    },
    [router],
  );

  return (
    <Container>
      <Heading title="Properties" subTitle="List of your properties" />

      <div
        className="
          mt-10
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
        {listings?.map((listing) => (
          <ListingCard
            key={`properties-${listing.id}`}
            data={listing}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            actionLabel="Delete property"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
