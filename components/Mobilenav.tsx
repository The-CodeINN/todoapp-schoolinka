"use client";

import { useState } from "react";
import { CiSettings } from "react-icons/ci";
import { BsBell } from "react-icons/bs";
import { HiHome, HiMenuAlt1, HiPlus, HiX } from "react-icons/hi";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import useModalStore from "@/app/store/modalStore";

export const MobileNav = () => {
  const [showMenu, setShowMenu] = useState(false);
  // const { showModal, setShowModal } = useModal();
  const { addShowModal, setAddShowModal } = useModalStore();

  const navLinks = [
    {
      name: "Home",
      href: "/todo",
      icon: HiHome,
    },
    {
      name: "Settings",
      href: "/todo",
      icon: CiSettings,
    },
    {
      name: "Notifications",
      href: "/todo",
      icon: BsBell,
    },
  ];

  const onToggleMenu = () => {
    setShowMenu((status) => !status);
    document.body.style.overflow = showMenu ? "auto" : "hidden";
  };

  const openModalAndCloseMenu = () => {
    setShowMenu(false); // Close the mobile menu
    setTimeout(() => {
      // Wait for the menu to close
      setAddShowModal(!addShowModal);
    }, 500);
  };

  return (
    <>
      <button
        aria-label='Toggle menu'
        onClick={onToggleMenu}
        className='md:hidden'
      >
        <HiMenuAlt1 className='text-2xl' />
      </button>

      <div
        className={cn(
          "md:hidden fixed right-0 top-0 z-10 h-full w-full transform transition-transform duration-500 ease-in-out bg-white border border-[#EAECF0]",
          showMenu ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className='flex justify-between mt-6 px-8'>
          <Link href='/' className='font-bold text-2xl'>
            ToDo
          </Link>

          <button
            aria-label='Close menu'
            onClick={onToggleMenu}
            className={cn(
              "md:hidden duration-500",
              !showMenu && "-rotate-[360deg]"
            )}
          >
            <HiX className='text-2xl' />
          </button>
        </div>

        <nav className='flex flex-col mt-6'>
          {navLinks.map((link, id) => (
            <Link
              href={link.href}
              key={id}
              className='flex items-center gap-x-2 font-semibold text-lg p-6 group border-b mx-2'
              onClick={onToggleMenu}
            >
              <link.icon
                className='text-black group-hover:text-zinc-800 duration-300'
                aria-hidden='true'
              />
              {link.name}
            </Link>
          ))}
          <div className='flex items-center mt-6 mx-8 border'>
            <Button
              onClick={openModalAndCloseMenu}
              className='bg-[#3F5BF6] hover:bg-blue-700 w-full py-6'
            >
              <div className='flex items-center gap-x-2 justify-between px-2 text-md'>
                <div>
                  <HiPlus className='text-md text-white' />
                </div>
                <div>Create New Task</div>
              </div>
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
};
