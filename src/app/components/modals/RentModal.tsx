'use client';

import axios from 'axios';

import dynamic from 'next/dynamic';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { toast } from 'react-hot-toast';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRentModal } from '~/app/hooks';

import { dataCons } from '~/constants';

import Modal from './Modal';
import Heading from '../Heading';
import { CategoryInput, Counter, CountrySelect, ImageUpload, Input } from '../inputs';

export type RentModalProps = {};

const RentModal: React.FC<RentModalProps> = () => {
  const router = useRouter();
  const rentModal = useRentModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [step, setStep] = useState<STEPS>(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    },
  });

  const category = watch('category');
  const location = watch('location');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');

  const Map = useMemo(
    () =>
      dynamic(() => import('../Map'), {
        ssr: false,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location],
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep((prev) => prev - 1);
  };
  const onNext = () => {
    setStep((prev) => prev + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);
    axios
      .post('/api/listings', data)
      .then(() => {
        toast.success('Listings created !');
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch((error) => {
        toast.error('Something went wrong !');
        console.log('error-rent-modal::', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create';
    }
    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return 'Back';
  }, [step]);

  const bodyContent = () => {
    switch (step) {
      case STEPS.CATEGORY:
        return (
          <div className="flex flex-col gap-8">
            <Heading title="Which of these best describes your place?" subTitle="Pick a category" />
            <div
              className="
              grid 
              grid-cols-1 
              md:grid-cols-2 
              gap-3
              max-h-[50vh]
              overflow-y-auto
            "
            >
              {dataCons.categories.map((item) => (
                <div key={item.label} className="col-span-1">
                  <CategoryInput
                    onClick={(category) => setCustomValue('category', category)}
                    selected={category === item.label}
                    label={item.label}
                    icon={item.icon}
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case STEPS.LOCATION:
        return (
          <div className="flex flex-col gap-8">
            <Heading title="Where is your place located?" subTitle="Help guest find you!" />
            <CountrySelect value={location} onChange={(value) => setCustomValue('location', value)} />

            <Map center={location?.latlng} />
          </div>
        );

      case STEPS.INFO:
        return (
          <div className="flex flex-col gap-8">
            <Heading title="Share some basics about your place" subTitle="What amenities do you have?" />

            <Counter
              title="Guests"
              subTitle="How many guests do you allow?"
              value={guestCount}
              onChange={(value) => setCustomValue('guestCount', value)}
            />
            <hr />

            <Counter
              title="Rooms"
              subTitle="How many rooms do you have?"
              value={roomCount}
              onChange={(value) => setCustomValue('roomCount', value)}
            />
            <hr />

            <Counter
              title="Bathrooms"
              subTitle="How many bathrooms do you have?"
              value={bathroomCount}
              onChange={(value) => setCustomValue('bathroomCount', value)}
            />
          </div>
        );

      case STEPS.IMAGES:
        return (
          <div className="flex flex-col gap-8">
            <Heading title="Add a photo of your place" subTitle="Show guests what your place looks like!" />

            <ImageUpload value={imageSrc} onChange={(value) => setCustomValue('imageSrc', value)} />
          </div>
        );

      case STEPS.DESCRIPTION: {
        return (
          <div className="flex flex-col gap-8">
            <Heading title="How would you describe your place?" subTitle="Short and sweet works best!" />
            <Input id="title" label="Title" disabled={isLoading} register={register} errors={errors} required />
            <hr />
            <Input
              id="description"
              label="Description"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
          </div>
        );
      }

      case STEPS.PRICE: {
        return (
          <div className="flex flex-col gap-8">
            <Heading title="Now, set your price" subTitle="How much do you charge per night?" />
            <Input
              id="price"
              label="Price"
              formatPrice
              type="number"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
          </div>
        );
      }

      default:
        return <div>{step}</div>;
    }
  };

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title="Airbnb your home!"
      body={bodyContent()}
    />
  );
};

export default RentModal;

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}
