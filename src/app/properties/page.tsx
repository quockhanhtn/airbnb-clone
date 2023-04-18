import { getCurrentUser, getListings } from '~/app/actions';
import { ClientOnly, EmptyState } from '~/app/components';
import PropertiesClient from './PropertiesClient';

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" showReset={false} />
      </ClientOnly>
    );
  }

  const listings = await getListings({ userId: currentUser?.id });
  if (listings === null || listings?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState title="No properties founds" subtitle="Looks like you have no properties." showReset={false} />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropertiesClient currentUser={currentUser} listings={listings} />
    </ClientOnly>
  );
};
export default PropertiesPage;
