'use client';

import { useTasks } from '../utils/TaskContext';
import { useDarkMode } from '../utils/DarkModeContext';
import { FaExclamation } from 'react-icons/fa';

export default function TaskWidget() {
  const [tasks] = useTasks();
  const { darkMode } = useDarkMode();

  // Filter for upcoming tasks (sorted by due date and exclude past tasks)
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
                {task.category === 'important' && (
                  <FaExclamation className='text-red-500' />
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
