'use client';

import Sidebar from './components/Sidebar';
import TaskWidget from './components/TaskWidget';
import CalendarWidget from './components/CalendarWidget';
import CompletedTasks from './components/CompletedTasks';
import MissedTasks from './components/MissedTasks';
import { useDarkMode } from './utils/DarkModeContext';

export default function Home() {
  const { darkMode } = useDarkMode();

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode ? 'bg-navy text-cream' : 'bg-cream text-navy'
      }`}
    >
      <div className='flex flex-1'>
        <Sidebar />
        <main className='flex-1 p-6'>
          <div className='text-center mb-6'>
            <h1 className='text-4xl font-bold'>Your Task Manager</h1>
          </div>
          <div className='mt-4'>
            <CalendarWidget />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-8'>
            <TaskWidget />
            <CompletedTasks />
            <MissedTasks />
          </div>
        </main>
      </div>
    </div>
  );
}
