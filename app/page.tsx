'use client';

import { useDarkMode } from './utils/DarkModeContext';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

export default function Home() {
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <div className='top-container'>
      <div className={darkMode ? 'dark' : ''}>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className='px-4 py-2 bg-slate-500 text-white rounded flex items-center gap-2'
        >
          {darkMode ? (
            <MdLightMode size={24} className='text-yellow-400' />
          ) : (
            <MdDarkMode size={24} className='text-gray-800' />
          )}
          <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>
    </div>
  );
}
