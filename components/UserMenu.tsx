"use client"

import Image from "next/image";
import {useState, useCallback} from 'react'

export const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false) 

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className="relative z-30">
      <div
        className="rounded-full flex flex-row items-center w-10 h-10 overflow-hidden cursor-pointer hover:shadow-md transition"
        onClick={toggleOpen}
      >
        <Image
          src="/images/profile_picture.png"
          alt="Profile picture"
          width={100}
          height={100}
          className="w-full h-full object-cover"
        />
      </div>

      { 
        isOpen && (
          <div
          className="absolute rounded-md bg-white overflow-hidden w-40 shadow-md top-15 right-0 flex flex-col border border-[#EAECF0]"
          >
            hello
          </div>
        )
      }
    </div>
  );
};
