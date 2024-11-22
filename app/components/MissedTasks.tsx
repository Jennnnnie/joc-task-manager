'use client';

import { useTasks } from '../utils/TaskContext';
import { useDarkMode } from '../utils/DarkModeContext';

export default function MissedTasks() {
  const [tasks] = useTasks();
  const { darkMode } = useDarkMode();

  // Filter tasks that are past their due date
  const missedTasks = tasks
    .filter(
      (task: any) => new Date(task.dueDate) < new Date() && !task.completed
    )
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
      <h2 className='text-lg font-bold mb-4'>Missed Tasks</h2>
      {missedTasks.length > 0 ? (
        <ul className='space-y-2'>
          {missedTasks.slice(0, 5).map((task: any) => (
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
          No missed tasks.
        </p>
      )}
    </div>
  );
}
