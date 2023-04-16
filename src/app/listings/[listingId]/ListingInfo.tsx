'use client';

import dynamic from 'next/dynamic';

import { IconType } from 'react-icons';
import { Avatar } from '~/app/components';
import { CountryLocation, SafeUser } from '~/types';
import ListingCategory from './ListingCategory';

const Map = dynamic(() => import('~/app/components/Map'));

export type ListingInfoProps = {
  user: SafeUser;
  category?: {
    label: string;
    icon: IconType;
    description: string;
  };
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  location?: CountryLocation;
};

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  category,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  location,
}) => {
  const coordinates = location?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h5
          className="
            text-xl
            font-semibold
            flex
            flex-row
            items-center
            gap-2
          "
        >
          <span>Hosted by {user?.name}</span>
          <Avatar src={user?.image} />
        </h5>

        <p className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <span>{guestCount} guest</span>
          <span>{roomCount} rooms</span>
          <span>{bathroomCount} bathrooms</span>
        </p>
      </div>

      <hr />

      {category && (
        <>
          <ListingCategory category={category} />
          <hr />
        </>
      )}

      <p className="text-lg font-light text-neutral-500">{description}</p>
      <hr />

      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
