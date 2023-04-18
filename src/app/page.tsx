import { getCurrentUser, getListings } from './actions';
import { IListingParams } from './actions/getListings';
import { ClientOnly, Container, EmptyState } from './components';
import { ListingCard } from './components/listings';

export type HomePageProps = {
  searchParams: IListingParams;
};

const HomePage = async ({ searchParams }: HomePageProps) => {
  const currentUser = await getCurrentUser();
  const listings = await getListings(searchParams);
  if (!listings || listings?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div
          className="
            pt-24
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
          {listings.map((listing) => (
            <ListingCard key={listing.id} data={listing} currentUser={currentUser} />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default HomePage;
