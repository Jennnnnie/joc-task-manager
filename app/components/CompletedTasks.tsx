'use client';

import { useTasks } from '../utils/TaskContext';
import { useDarkMode } from '../utils/DarkModeContext';

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
      {completedTasks.length > 0 ? (
        <ul className='space-y-2'>
          {completedTasks.map((task: any) => (
            <li
              key={task.id}
              className={`flex items-center justify-between p-2 rounded-md ${
                darkMode ? 'bg-navy text-cream' : 'bg-yellow text-navy'
              }`}
            >
              <span>{task.name}</span>
              <span className='text-sm font-medium'>
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className={`${darkMode ? 'text-green' : 'text-coral'}`}>
          No completed tasks.
        </p>
      )}
    </div>
  );
}
