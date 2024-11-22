'use client';

import { useDarkMode } from './utils/DarkModeContext';
import Sidebar from './components/Sidebar';
import TaskWidget from './components/TaskWidget';
import CalendarWidget from './components/CalendarWidget';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

export default function Home() {
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <div
      className={`flex h-screen ${
        darkMode ? 'bg-navy text-cream' : 'bg-cream text-navy'
      }`}
    >
      <Sidebar />
      <main className='flex-1 p-6 overflow-auto'>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`fixed top-4 right-4 px-6 py-3 rounded-full flex items-center gap-2 transition duration-200 ease-in-out ${
            darkMode ? ' text-cream ' : ' text-navy '
          }`}
        >
          {darkMode ? <MdLightMode size={35} /> : <MdDarkMode size={35} />}
        </button>
        <div className='text-center mb-8'>
          <h1 className='text-5xl font-bold'>Your Task Manager</h1>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <TaskWidget />
          <div className='col-span-2'>
            <CalendarWidget />
          </div>
        </div>
      </main>
    </div>
  );
}
