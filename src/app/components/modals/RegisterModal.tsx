'use client';

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { useCallback, useState } from 'react';
import { useLoginModal, useRegisterModal } from '~/app/hooks';

import Modal from './Modal';
import Heading from '../Heading';
import { Input } from '../inputs';
import Button from '../Button';

export type RegisterModalProps = {};

const RegisterModal: React.FC<RegisterModalProps> = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post('/api/auth/register', data)
      .then(() => {
        registerModal.onClose();
      })
      .catch((error) => {
        console.log('error-register::', error);
        toast.error('Some thing went wrong !');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subTitle="Create an account !" />

      <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required type="text" />

      <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required type="email" />

      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
    </div>
  );

  const switchToLogin = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button outline label="Continue with Google" icon={FcGoogle} onClick={() => signIn('google')} />
      <Button outline label="Continue with Github" icon={AiFillGithub} onClick={() => signIn('github')} />

      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row items-center justify-center gap-2">
          <span>Already have an account?</span>
          <span className="text-neutral-800 cursor-pointer hover:underline" onClick={switchToLogin} role="button">
            Log in here.
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
