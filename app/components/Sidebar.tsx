'use client';

import { FaExclamation } from 'react-icons/fa';

import { useDarkMode } from '../utils/DarkModeContext';

export default function Sidebar() {
  const { darkMode } = useDarkMode();

  return (
    <div
      className={`w-1/6 p-4 border-r ${
        darkMode ? 'bg-navy text-cream' : 'bg-yellow text-navy'
      }`}
    >
      <h1
        className={`text-2xl font-bold border rounded-lg text-center underline p-3 ${
          darkMode ? 'bg-graypurple text-cream' : 'bg-coral text-navy'
        }`}
      >
        Organize
      </h1>

      <nav className='mt-8'>
        <ul className='space-y-4'>
          <li
            className={`hover:underline ${
              darkMode
                ? 'text-cream hover:text-yellow'
                : 'text-navy hover:text-coral'
            }`}
          >
            Dashboard
          </li>
          <li
            className={`hover:underline ${
              darkMode
                ? 'text-cream hover:text-yellow'
                : 'text-navy hover:text-coral'
            }`}
          >
            My tasks
          </li>
        </ul>
      </nav>

      <div className='mt-8'>
        <h2
          className={`text-lg font-bold ${
            darkMode ? 'text-cream' : 'text-navy'
          }`}
        >
          My Categories
        </h2>
        <ul className='mt-4 space-y-2'>
          <li className='flex items-center space-x-2'>
            <span className='w-3 h-3 bg-green-300 rounded-full'></span>
            <span className={`${darkMode ? 'text-cream' : 'text-navy'}`}>
              Work
            </span>
          </li>
          <li className='flex items-center space-x-2'>
            <span className='w-3 h-3 bg-blue-300 rounded-full'></span>
            <span className={`${darkMode ? 'text-cream' : 'text-navy'}`}>
              Events
            </span>
          </li>
          <li className='flex items-center space-x-2'>
            <span className='w-3 h-3 bg-purple-300 rounded-full'></span>
            <span className={`${darkMode ? 'text-cream' : 'text-navy'}`}>
              Personal
            </span>
          </li>
          <li className='flex items-center space-x-2'>
            <FaExclamation className='text-red-500' />
            <span className={`${darkMode ? 'text-cream' : 'text-navy'}`}>
              Important!
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
