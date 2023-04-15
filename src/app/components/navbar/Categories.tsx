'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { dataCons } from '~/constants';
import Container from '../Container';
import CategoryBox from '../CategoryBox';

export type CategoriesProps = {};

const Categories: React.FC<CategoriesProps> = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();

  const isMainPage = pathname === '/';
  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-4 
          flex
          flex-row
          items-center
          justify-between
          overflow-x-auto
        "
      >
        {dataCons.categories.map((item, index) => (
          <CategoryBox
            key={`category-item-${index}-${item.label}`}
            label={item.label}
            description={item.description}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
