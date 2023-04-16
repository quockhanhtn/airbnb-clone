'use client';

import { useMemo } from 'react';
import { useCountries } from '~/app/hooks';

import { Container } from '~/app/components';
import { dataCons } from '~/constants';
import { SafeListing, SafeReservation, SafeUser } from '~/types';
import ListingHead from './ListingHead';
import ListingInfo from './ListingInfo';

export type ListingClientProps = {
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
  reservations?: Array<SafeReservation>;
};

const ListingClient: React.FC<ListingClientProps> = ({ listing, currentUser, reservations }) => {
  const { getByValue } = useCountries();

  const category = useMemo(() => {
    return dataCons.categories.find((n) => n.label === listing.category);
  }, [listing.category]);

  const location = useMemo(() => getByValue(listing.locationValue), [getByValue, listing.locationValue]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            location={location}
            id={listing.id}
            currentUser={currentUser}
          />

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-7
              md:gap-10
              mt-6
            "
          >
            <ListingInfo
              user={listing.user}
              category={category}
              location={location}
              description={listing.description}
              guestCount={listing.guestCount}
              roomCount={listing.roomCount}
              bathroomCount={listing.bathroomCount}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
