'use client';

import { useTasks } from '../utils/TaskContext';
import { useDarkMode } from '../utils/DarkModeContext';
import { FaExclamation } from 'react-icons/fa';
import { getCategoryColor } from '../utils/categoryColors'; // <-- add this import

export default function TaskWidget() {
  const [tasks] = useTasks();
  const { darkMode } = useDarkMode();

  const upcomingTasks = tasks
    .filter((task: any) => new Date(task.dueDate) >= new Date())
    .sort(
      (a: any, b: any) =>
        new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );

  return (
    <div
      className={`p-4 rounded-lg shadow-md ${
        darkMode ? 'bg-gray-500 text-cream' : 'bg-cream text-navy'
      }`}
    >
      <h2 className='text-lg font-bold mb-4'>Upcoming Tasks</h2>
      {upcomingTasks.length > 0 ? (
        <ul className='space-y-2'>
          {upcomingTasks.slice(0, 10).map((task: any) => (
            <li
              key={task.id}
              className={`flex items-center justify-between p-2 rounded-md ${
                darkMode ? 'bg-navy text-cream' : 'bg-yellow text-navy'
              }`}
            >
              <span className='flex items-center gap-2'>
                {task.category === 'Important' ? (
                  <FaExclamation className='text-red-500 text-sm' />
                ) : (
                  <span
                    className={`w-3 h-3 rounded-full ${getCategoryColor(
                      task.category
                    )}`}
                  ></span>
                )}
                {task.name}
              </span>
              <span className='text-sm font-medium'>
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className={`${darkMode ? 'text-green' : 'text-coral'}`}>
          No upcoming tasks.
        </p>
      )}
    </div>
  );
}
