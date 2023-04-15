'use client';

import { useCallback } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

export type CounterProps = {
  title: string;
  subTitle: string;
  value: number;
  onChange: (value: number) => void;
};

const Counter: React.FC<CounterProps> = ({ title, subTitle, value, onChange }) => {
  const onIncrease = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onDecrease = useCallback(() => {
    if (value === 1) {
      return;
    }
    onChange(value - 1);
  }, [onChange, value]);

  return (
    <div className="flex flex-row items-center justify-between">
      {/* Title & SubTitle */}
      <div className="flex flex-col">
        <p className="font-medium">{title}</p>
        <p className="font-light text-gray-600">{subTitle}</p>
      </div>

      {/* Input */}
      <div className="flex flex-row items-center gap-4">
        <button
          onClick={onDecrease}
          type="button"
          className="
            w-10
            h-10
            rounded-full
            border-[1px]
            border-neutral-400
            flex
            items-center
            justify-center
            text-neutral-600
            cursor-pointer
            hover:opacity-80
            transition
          "
        >
          <AiOutlineMinus />
        </button>

        <div
          className="
            font-light 
            text-xl 
            text-neutral-600
          "
        >
          {value}
        </div>
        <button
          onClick={onIncrease}
          type="button"
          className="
            w-10
            h-10
            rounded-full
            border-[1px]
            border-neutral-400
            flex
            items-center
            justify-center
            text-neutral-600
            cursor-pointer
            hover:opacity-80
            transition
          "
        >
          <AiOutlinePlus />
        </button>
      </div>
    </div>
  );
};

export default Counter;
