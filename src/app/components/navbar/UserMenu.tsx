'use client';

import { AiOutlineMenu } from 'react-icons/ai';
import { useState, useCallback } from 'react';
import { useRegisterModal } from '~/app/hooks';

import Avatar from '../Avatar';
import MenuItem from './MenuItem';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const registerModal = useRegisterModal();

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
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
            <Avatar />
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
            <>
              <MenuItem label="Login" onClick={() => {}} />
              <MenuItem label="Sign in" onClick={registerModal.onOpen} />
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
