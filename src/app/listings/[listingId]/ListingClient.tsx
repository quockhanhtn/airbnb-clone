'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useCountries, useLoginModal } from '~/app/hooks';

import { Range } from 'react-date-range';

import { dataCons } from '~/constants';
import { SafeListing, SafeReservation, SafeUser } from '~/types';

import { Container } from '~/app/components';
import { ListingHead, ListingInfo, ListingReservation } from '../../components/listings';

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
};

export type ListingClientProps = {
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
  reservations?: Array<SafeReservation>;
};

const ListingClient: React.FC<ListingClientProps> = ({ listing, currentUser, reservations = [] }) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const { getByValue } = useCountries();

  const disabledDates = useMemo(() => {
    let dates: Array<Date> = [];
    reservations.forEach((r: SafeReservation) => {
      const range = eachDayOfInterval({
        start: new Date(r.startDate),
        end: new Date(r.endDate),
      });

      dates = [...dates, ...range];
    });
    return dates;
  }, [reservations]);

  const category = useMemo(() => {
    return dataCons.categories.find((n) => n.label === listing.category);
  }, [listing.category]);

  const location = useMemo(() => getByValue(listing.locationValue), [getByValue, listing.locationValue]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      loginModal.onOpen();
      return;
    }

    setIsLoading(true);
    axios
      .post('/api/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing.id,
      })
      .then(() => {
        toast.success('Listing Reserved !');
        setDateRange(initialDateRange);
        // redirect to /trips
        router.refresh();
      })
      .catch((e) => {
        toast.error('Something went wrong !');
        console.log('reservation-error:::', e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentUser, dateRange.endDate, dateRange.startDate, listing.id, loginModal, router, totalPrice]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate);
      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(1 * listing.price);
      }
    }
  }, [dateRange.endDate, dateRange.startDate, listing.price]);

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

            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                onSubmit={onCreateReservation}
                dateRange={dateRange}
                disable={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
