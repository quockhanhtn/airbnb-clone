'use client';

import Image from 'next/image';
import { Heading, HeartButton } from '~/app/components';
import { CountryLocation, SafeUser } from '~/types';

export type ListingHeadProps = {
  title: string;
  imageSrc: string;
  location?: CountryLocation;
  id: string;
  currentUser?: SafeUser | null;
};

const ListingHead: React.FC<ListingHeadProps> = ({ title, imageSrc, location, id, currentUser }) => {
  return (
    <>
      <Heading title={title} subTitle={`${location?.region}, ${location?.label}`} />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          alt={title}
          src={imageSrc}
          fill
          className="
          object-cover w-full
         "
        />

        <span className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </span>
      </div>
    </>
  );
};

export default ListingHead;
