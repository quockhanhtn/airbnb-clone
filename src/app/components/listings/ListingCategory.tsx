'use client';

import { IconType } from 'react-icons';

export type ListingCategoryProps = {
  category: {
    label: string;
    icon: IconType;
    description: string;
  };
};

const ListingCategory: React.FC<ListingCategoryProps> = ({ category }) => {
  const { icon: Icon, label, description } = category;
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <Icon size={40} className="text-neutral-600" />

        <div className="flex flex-col">
          <p className="text-lg font-semibold">{label}</p>
          <span className="text-neutral-500 font-light">{description}</span>
        </div>
      </div>
    </div>
  );
};

export default ListingCategory;
