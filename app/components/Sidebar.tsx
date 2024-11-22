'use client';

export default function Sidebar() {
  return (
    <div className='bg-white w-1/6 p-4 border-r'>
      <h1 className='text-2xl font-bold text-navy border rounded-lg bg-purple text-center underline p-3'>
        Organize
      </h1>
      <nav className='mt-8'>
        <ul className='space-y-4'>
          <li className='text-navy hover:text-coral'>Dashboard</li>
          <li className='text-navy hover:text-coral'>My tasks</li>
        </ul>
      </nav>
      <div className='mt-8'>
        <h2 className='text-lg font-bold text-navy'>My Categories</h2>
        <ul className='mt-4 space-y-2'>
          <li className='flex items-center space-x-2'>
            <span className='w-3 h-3 bg-coral rounded-full'></span>
            <span>Work</span>
          </li>
          <li className='flex items-center space-x-2'>
            <span className='w-3 h-3 bg-green rounded-full'></span>
            <span>Events</span>
          </li>
          <li className='flex items-center space-x-2'>
            <span className='w-3 h-3 bg-yellow rounded-full'></span>
            <span>Personal</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
