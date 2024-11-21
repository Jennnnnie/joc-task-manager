'use client';

import { useState } from 'react';
import { useTasks } from '../utils/TaskContext';
import { useDarkMode } from '../utils/DarkModeContext';

export default function TaskList() {
  const [tasks, dispatch] = useTasks();
  const { darkMode } = useDarkMode();

  // Track the task currently being edited
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<any>(null);

  const handleEditClick = (task: any) => {
    setEditingTaskId(task.id);
    setEditingTask({ ...task }); // Set a copy of the task to edit
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditingTask(null); // Reset the editing state
  };

  const handleSaveEdit = () => {
    dispatch({ type: 'editTask', payload: editingTask });
    setEditingTaskId(null); // Save and exit editing mode
    setEditingTask(null);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setEditingTask((prev: any) => ({ ...prev, [name]: value }));
  };

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
          {editingTaskId === task.id ? (
            // Inline editing mode
            <div>
              <input
                type='text'
                name='name'
                value={editingTask.name}
                onChange={handleChange}
                className={`block w-full mb-2 p-2 border rounded ${
                  darkMode ? 'bg-gray-600 text-white' : 'bg-gray-200 text-black'
                }`}
              />
              <textarea
                name='description'
                value={editingTask.description}
                onChange={handleChange}
                className={`block w-full mb-2 p-2 border rounded ${
                  darkMode ? 'bg-gray-600 text-white' : 'bg-gray-200 text-black'
                }`}
              />
              <input
                type='date'
                name='dueDate'
                value={editingTask.dueDate}
                onChange={handleChange}
                className={`block w-full mb-2 p-2 border rounded ${
                  darkMode ? 'bg-gray-600 text-white' : 'bg-gray-200 text-black'
                }`}
              />
              <div className='flex gap-2'>
                <button
                  onClick={handleSaveEdit}
                  className={`px-2 py-1 rounded ${
                    darkMode
                      ? 'bg-blue-400 text-black hover:bg-blue-500'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className={`px-2 py-1 rounded ${
                    darkMode
                      ? 'bg-gray-500 text-black hover:bg-gray-600'
                      : 'bg-gray-300 text-black hover:bg-gray-400'
                  }`}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            // Read-only mode
            <div>
              <h2 className='font-bold text-lg'>{task.name}</h2>
              <p>{task.description}</p>
              <p
                className={`text-sm ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Due: {task.dueDate}
              </p>
              <div className='flex gap-2 mt-2'>
                <button
                  onClick={() => handleEditClick(task)}
                  className={`px-2 py-1 rounded ${
                    darkMode
                      ? 'bg-blue-400 text-black hover:bg-blue-500'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className={`px-2 py-1 rounded ${
                    darkMode
                      ? 'bg-red-400 text-black hover:bg-red-500'
                      : 'bg-red-500 text-white hover:bg-red-600'
                  }`}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
