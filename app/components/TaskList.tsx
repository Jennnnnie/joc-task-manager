'use client';

import { useTasks } from '../utils/TaskContext';
import { useDarkMode } from '../utils/DarkModeContext';

export default function TaskList() {
  const [tasks, dispatch] = useTasks();
  const { darkMode } = useDarkMode();

  const handleDelete = (id: string) => {
    dispatch({ type: 'deleteTask', payload: id });
  };

  return (
    <div className='task-list'>
      {tasks.map((task: any) => (
        <div
          key={task.id}
          className={`task-item border p-4 rounded shadow mb-2 ${
            darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'
          }`}
        >
          <h2 className='font-bold text-lg'>{task.name}</h2>
          <p>{task.description}</p>
          <p
            className={`text-sm ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Due: {task.dueDate}
          </p>
          <button
            className={`px-2 py-1 rounded mt-2 ${
              darkMode
                ? 'bg-red-400 text-black hover:bg-red-500'
                : 'bg-red-500 text-white hover:bg-red-600'
            }`}
            onClick={() => handleDelete(task.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
