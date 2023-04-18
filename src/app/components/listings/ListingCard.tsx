'use client';

import { useCallback, useMemo } from 'react';
import { useCountries } from '~/app/hooks';

import { format } from 'date-fns';

import Image from 'next/image';
import Link from 'next/link';
import { SafeListing, SafeReservation, SafeUser } from '~/types';
import Button from '../Button';
import HeartButton from '../HeartButton';

export type ListingCardProps = {
  data: SafeListing;
  reservation?: SafeReservation;

  disabled?: boolean;
  onAction?: (id: string) => void;
  actionLabel?: string;
  actionId?: string;

  currentUser?: SafeUser | null;
};

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  disabled,
  onAction,
  actionLabel,
  actionId = '',
  currentUser,
}) => {
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [actionId, disabled, onAction],
  );

  return (
    <div className="col-span-1">
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            alt="listing img"
            src={data.imageSrc}
            className="
              object-cover
              h-full
              w-full
              group-hover:scale-110
              transition
            "
          />

          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>

        <Link href={`/listings/${data.id}`}>
          <p className="font-semibold text-lg">
            {location?.region}, {location?.label}
          </p>
        </Link>

        <p className="font-light text-neutral-500">{reservationDate || data.category}</p>

        <div className="flex flex-row items-center gap-1">
          <span className="font-semibold">$ {price}</span>
          {!reservation && <span className="font-light">night</span>}
        </div>

        {onAction && actionLabel && <Button disabled={disabled} small label={actionLabel} onClick={handleCancel} />}
      </div>
    </div>
  );
};

export default ListingCard;
