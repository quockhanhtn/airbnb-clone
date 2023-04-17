import { Listing, Reservation, User } from '@prisma/client';

export type SafeUser = Omit<User, 'createdAt' | 'updatedAt' | 'emailVerified'> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type SafeListing = Omit<Listing, 'createdAt'> & {
  createdAt: string;
};

export type SafeReservation = Omit<Reservation, 'createdAt' | 'startDate' | 'endDate'> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing?: SafeListing | null;
};

export type CountryLocation = {
  value: string;
  label: string;
  flag: string;
  latlng: [number, number];
  region: string;
};
