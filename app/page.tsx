import Link from 'next/link';

export default function Home() {
  return (
    <>
      <section className='flex flex-col items-center justify center my-36'>
        <div className=' font-bold text-4xl '>
          Hello, welcome to the best todo app in the land!
        </div>
        <Link className='text-center text-blue-600 underline' href='/todo'>
          Check it out
        </Link>
      </section>
    </>
  );
}
