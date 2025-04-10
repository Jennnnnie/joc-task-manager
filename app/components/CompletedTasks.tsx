'use client';

import { useTasks } from '../utils/TaskContext';
import { useDarkMode } from '../utils/DarkModeContext';
import { FaExclamation } from 'react-icons/fa';
import { getCategoryColor } from '../utils/categoryColors'; // Updated import

export default function CompletedTasks() {
  const [tasks] = useTasks();
  const { darkMode } = useDarkMode();
  const completedTasks = tasks.filter((task: any) => task.completed);

  return (
    <div
      className={`p-4 rounded-lg shadow-md ${
        darkMode ? 'bg-gray-500 text-cream' : 'bg-cream text-navy'
      }`}
    >
      <h2 className='text-lg font-bold mb-4'>Completed Tasks</h2>
      {completedTasks.length ? (
        <ul className='space-y-2'>
          {completedTasks.map((task: any) => (
            <li
              key={task.id}
              className={`flex items-center justify-between p-2 ${
                darkMode ? 'bg-navy' : 'bg-yellow'
              }`}
            >
              <span className='flex items-center gap-2'>
                {task.category === 'Important' ? (
                  <FaExclamation className='text-red-500' />
                ) : (
                  <span
                    className={`w-3 h-3 rounded-full ${getCategoryColor(
                      task.category
                    )}`}
                  ></span>
                )}
                {task.name}
              </span>
              <span>{new Date(task.dueDate).toLocaleDateString()}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No completed tasks.</p>
      )}
    </div>
  );
}
