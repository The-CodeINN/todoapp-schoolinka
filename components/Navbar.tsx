import Link from 'next/link';
import { CiSettings } from 'react-icons/ci';
import { BsBell } from 'react-icons/bs';
import { UserMenu } from './UserMenu';
import { MobileNav } from './Mobilenav';

export const Navbar = () => {
  return (
    <header className='text-sm py-4 md:px-16 px-6 border-b border-[#EAECF0] mb-8'>
      <div className='max-w-6xl mx-auto flex items-center justify-between'>
        <Link href='/' className='font-bold text-2xl'>
          ToDo
        </Link>
        <nav className='md:block hidden'>
          <ul className='flex items-center gap-x-8'>
            <li>
              <CiSettings className='h-6 w-6 text-gray-500' />
            </li>
            <li>
              <BsBell className='h-6 w-6 text-gray-500' />
            </li>
            <li>
              <UserMenu />
            </li>
          </ul>
        </nav>
        <div className='flex items-center md:hidden '>
          <MobileNav />
        </div>
      </div>
    </header>
  );
};
