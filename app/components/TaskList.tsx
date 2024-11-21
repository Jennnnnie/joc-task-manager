'use client';

import { useTasks } from '../utils/TaskContext';

export default function TaskList() {
  const [tasks, dispatch] = useTasks();

  const handleDelete = (id: string) => {
    dispatch({ type: 'deleteTask', payload: id });
  };

  return (
    <div className='task-list'>
      {tasks.map((task: any) => (
        <div
          key={task.id}
          className='task-item border p-4 rounded shadow mb-2 bg-gray-100'
        >
          <h2 className='font-bold text-lg'>{task.name}</h2>
          <p>{task.description}</p>
          <p className='text-sm text-gray-600'>Due: {task.dueDate}</p>
          <button
            className='bg-red-500 text-white px-2 py-1 rounded mt-2'
            onClick={() => handleDelete(task.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
