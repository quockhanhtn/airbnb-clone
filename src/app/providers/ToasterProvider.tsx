'use client';

import { Toaster } from 'react-hot-toast';

export type ToasterProviderProps = {};

const ToasterProvider: React.FC<ToasterProviderProps> = () => {
  return <Toaster />;
};

export default ToasterProvider;
