'use client';

import dynamic from 'next/dynamic';
import { formatISO } from 'date-fns';
import queryString from 'query-string';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { useSearchModal } from '~/app/hooks';

import { Range } from 'react-date-range';
import { CountryLocation } from '~/types';

import Heading from '../Heading';
import { Calendar, Counter, CountrySelect } from '../inputs';
import Modal from './Modal';

export type SearchModalProps = {};

const SearchModal: React.FC<SearchModalProps> = () => {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();

  const [step, setStep] = useState<STEPS>(STEPS.LOCATION);
  const [location, setLocation] = useState<CountryLocation>();
  const [guestCount, setGuestCount] = useState<number>(1);
  const [roomCount, setRoomCount] = useState<number>(1);
  const [bathRoomCount, setBathRoomCount] = useState<number>(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const Map = useMemo(
    () =>
      dynamic(() => import('~/app/components/Map'), {
        ssr: false,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location],
  );

  const onBack = useCallback(() => {
    setStep((prv) => prv - 1);
  }, []);
  const onNext = useCallback(() => {
    setStep((prv) => prv + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      onNext();
      return;
    }

    let currentQuery: any = {};
    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathRoomCount,
    };
    if (dateRange?.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }
    if (dateRange?.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = queryString.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true },
    );

    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [
    bathRoomCount,
    dateRange.endDate,
    dateRange.startDate,
    guestCount,
    location?.value,
    onNext,
    params,
    roomCount,
    router,
    searchModal,
    step,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return 'Search';
    }
    return 'Next';
  }, [step]);
  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }
    return 'Back';
  }, [step]);

  const bodyContent = () => {
    if (step === STEPS.LOCATION) {
      return (
        <div className="flex flex-col gap-8">
          <Heading title="Where do you wanna go" subTitle="Find the perfect location!" />
          <CountrySelect value={location} onChange={(v) => setLocation(v as CountryLocation)} />

          <hr />
          <Map center={location?.latlng} />
        </div>
      );
    }

    if (step === STEPS.DATE) {
      return (
        <div className="flex flex-col gap-8">
          <Heading title="Where do you plan to go" subTitle="Make sure everyone is free!" />
          <Calendar value={dateRange} onChange={(v) => setDateRange(v.selection)} />
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-8">
        <Heading title="More information" subTitle="Find your perfect place!" />

        <Counter
          title="Guest"
          subTitle="How many guests are coming?"
          value={guestCount}
          onChange={(newValue) => setGuestCount(newValue)}
        />

        <Counter
          title="Rooms"
          subTitle="How many rooms do you need?"
          value={roomCount}
          onChange={(newValue) => setRoomCount(newValue)}
        />

        <Counter
          title="Bathrooms"
          subTitle="How many bathrooms do you need?"
          value={bathRoomCount}
          onChange={(newValue) => setBathRoomCount(newValue)}
        />
      </div>
    );
  };

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent()}
      title="Filters"
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
    />
  );
};

export default SearchModal;

/* eslint-disable no-unused-vars */
enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}
