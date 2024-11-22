'use client';

import { useDarkMode } from '../utils/DarkModeContext';
import Sidebar from '../components/Sidebar';
import TaskForm from '../components/TaskForm';

export default function CreateTask() {
  const { darkMode } = useDarkMode();

  return (
    <div
      className={`flex h-screen ${
        darkMode ? 'bg-navy text-cream' : 'bg-cream text-navy'
      }`}
    >
      <Sidebar />
      <main className='flex-1 p-6'>
        <h1 className='text-4xl font-bold mb-8 text-center'>Create New Task</h1>
        <div
          className={`mx-auto p-8 rounded-lg shadow-lg`}
          style={{ maxWidth: '1500px', minHeight: '600px' }}
        >
          <TaskForm selectedTask={null} onFormSubmit={() => {}} />
        </div>
      </main>
    </div>
  );
}
