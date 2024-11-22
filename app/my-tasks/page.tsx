'use client';

import { useDarkMode } from '../utils/DarkModeContext';
import Sidebar from '../components/Sidebar';
import TaskList from '../components/TaskList';

export default function MyTasks() {
  const { darkMode } = useDarkMode();

  return (
    <div
      className={`flex h-screen ${
        darkMode ? 'bg-navy text-cream' : 'bg-cream text-navy'
      }`}
    >
      <Sidebar />
      <main className='flex-1 p-6'>
        <h1 className='text-3xl font-bold mb-6'>My Tasks</h1>
        <TaskList />
      </main>
    </div>
  );
}
