'use client';

import { useState } from 'react';
import { useDarkMode } from './utils/DarkModeContext';
import Sidebar from './components/Sidebar';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

export default function Home() {
  const { darkMode, setDarkMode } = useDarkMode();
  const [selectedTask, setSelectedTask] = useState(null);

  // const handleEdit = (task: any) => {
  //   setSelectedTask(task); // Set the selected task for editing
  // };

  const handleFormSubmit = () => {
    setSelectedTask(null); // Clear the selected task after submission
  };

  return (
    <div
      className={`flex h-screen ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-navy'
      }`}
    >
      <Sidebar />
      <div className='text-center mx-auto'>
        <h1 className='text-5xl font-bold'>Welcome to your Task Manager</h1>
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
      <TaskForm selectedTask={selectedTask} onFormSubmit={handleFormSubmit} />
      <TaskList />
      {/* <TaskList onEdit={handleEdit} /> */}
    </div>
  );
}
