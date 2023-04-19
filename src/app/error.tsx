'use client';

import { useEffect } from 'react';
import { EmptyState } from './components';

export type ErrorStateProps = {
  error: Error;
};

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <EmptyState title="Uh Oh" subtitle="Something went wrong!" />;
};

export default ErrorState;