'use client';

import { Range } from 'react-date-range';
import { Button } from '~/app/components';
import Calendar from '~/app/components/inputs/Calendar';

export type ListingReservationProps = {
  price: number;
  totalPrice: number;
  onSubmit: () => void;
  onChangeDate: (value: Range) => void;
  dateRange: Range;
  disable?: boolean;
  disabledDates?: Date[];
};

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  totalPrice,
  onSubmit,
  onChangeDate,
  dateRange,
  disable = false,
  disabledDates = [],
}) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <span className="text-2xl font-semibold">$ {price}</span>
        <span className="font-light text-neutral-500">night</span>
      </div>
      <hr />

      <Calendar value={dateRange} disabledDates={disabledDates} onChange={(value) => onChangeDate(value.selection)} />
      <hr />

      <div className="p-4">
        <Button disabled={disable} label="Reserve" onClick={onSubmit} />
      </div>

      <div
        className="
          p-4
          flex
          flex-row
          items-center
          justify-between
          font-semibold
          text-lg
        "
      >
        <span>Total</span>
        <span>$ {totalPrice}</span>
      </div>
    </div>
  );
};

export default ListingReservation;
