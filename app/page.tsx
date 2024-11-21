'use client';

import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { useDarkMode } from './utils/DarkModeContext';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

export default function Home() {
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <div className='top-container'>
      <div className='text-center mx-auto'>
        <h1 className='text-6xl font-bold m-5'>Welcome to your Task Manager</h1>
      </div>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className='absolute top-4 right-4 px-4 py-2 text-white rounded flex items-center gap-2 transition duration-200 ease-in-out'
      >
        {darkMode ? (
          <MdLightMode size={24} className='text-yellow-400' />
        ) : (
          <MdDarkMode size={24} className='text-gray-800' />
        )}
      </button>
      <TaskForm />
      <TaskList />
    </div>
  );
}
