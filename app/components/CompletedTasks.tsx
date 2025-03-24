'use client';

import { useTasks } from '../utils/TaskContext';
import { useDarkMode } from '../utils/DarkModeContext';

const getCategoryColor = (category: string) => {
  switch (category?.toLowerCase()) {
    case 'work':
      return 'bg-green-400';
    case 'personal':
      return 'bg-blue-400';
    case 'events':
      return 'bg-purple-400';
    case 'important':
      return 'bg-red-500';
    default:
      return 'bg-gray-400';
  }
};

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
              <span className='flex items-center gap-2'>
                <span
                  className={`w-3 h-3 rounded-full ${getCategoryColor(
                    task.category
                  )}`}
                ></span>
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
          No completed tasks.
        </p>
      )}
    </div>
  );
}
