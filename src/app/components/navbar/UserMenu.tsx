'use client';

import { SafeUser } from '~/types';
import { AiOutlineMenu } from 'react-icons/ai';
import { useState, useCallback } from 'react';
import { signOut } from 'next-auth/react';
import { useLoginModal, useRegisterModal, useRentModal } from '~/app/hooks';

import Avatar from '../Avatar';
import MenuItem from './MenuItem';

export type UserMenuProps = {
  currentUser?: SafeUser | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      loginModal.onOpen();
      return;
    }
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          role="button"
          className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
        >
          Airbnb your home
        </div>

        <button
          onClick={toggleOpen}
          type="button"
          className="
            p-4
            md:py-1
            md:px-2
            border-[1px] 
            border-neutral-200 
            flex 
            flex-row 
            items-center 
            gap-3 
            rounded-full 
            cursor-pointer 
            hover:shadow-md 
            transition
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </button>
      </div>

      {isOpen && (
        <div
          className="
            absolute
            right-0
            top-12
            rounded-xl
            shadow-md
            w-[40vw]
            md:w-3/4
            bg-white
            overflow-hidden
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem setIsOpen={setIsOpen} label="My trips" onClick={() => {}} />
                <MenuItem setIsOpen={setIsOpen} label="My favorites" onClick={() => {}} />
                <MenuItem setIsOpen={setIsOpen} label="My reservations" onClick={() => {}} />
                <MenuItem setIsOpen={setIsOpen} label="My properties" onClick={() => {}} />
                <MenuItem setIsOpen={setIsOpen} label="Airbnb your home" onClick={rentModal.onOpen} />
                <hr />
                <MenuItem setIsOpen={setIsOpen} label="Logout" onClick={() => signOut()} />
              </>
            ) : (
              <>
                <MenuItem setIsOpen={setIsOpen} label="Login" onClick={loginModal.onOpen} />
                <MenuItem setIsOpen={setIsOpen} label="Sign in" onClick={registerModal.onOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
