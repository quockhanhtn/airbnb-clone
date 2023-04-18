'use client';

import { SafeListing, SafeUser } from '~/types';
import { Container, Heading } from '../components';
import { ListingCard } from '../components/listings';

export type FavoritesClientProps = {
  currentUser?: SafeUser | null;
  listings?: Array<SafeListing>;
};

const FavoritesClient: React.FC<FavoritesClientProps> = ({ currentUser, listings }) => {
  return (
    <Container>
      <Heading title="Favorites" subTitle="List of places you have favorited!" />

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
        {listings?.map((r) => (
          <ListingCard key={`favorites-${r.id}`} currentUser={currentUser} data={r} />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClient;
