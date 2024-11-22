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
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${
        darkMode ? 'bg-navy text-cream' : 'bg-cream text-navy'
      } p-4 rounded-lg`}
    >
      {tasks.map((task: any) => (
        <div
          key={task.id}
          className={`border p-4 rounded shadow ${
            darkMode ? 'bg-purple text-cream ' : 'bg-yellow text-navy '
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
                  darkMode ? 'bg-navy text-cream' : 'bg-cream text-navy'
                }`}
              />
              <textarea
                name='description'
                value={editingTask.description}
                onChange={handleChange}
                className={`block w-full mb-2 p-2 border rounded ${
                  darkMode ? 'bg-navy text-cream' : 'bg-cream text-navy'
                }`}
              />
              <input
                type='date'
                name='dueDate'
                value={editingTask.dueDate}
                onChange={handleChange}
                className={`block w-full mb-2 p-2 border rounded ${
                  darkMode ? 'bg-navy text-cream' : 'bg-cream text-navy'
                }`}
              />
              <div className='flex gap-2'>
                <button
                  onClick={handleSaveEdit}
                  className={`px-2 py-1 rounded ${
                    darkMode
                      ? 'bg-green text-navy hover:bg-purple'
                      : 'bg-coral text-cream hover:bg-yellow'
                  }`}
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className={`px-2 py-1 rounded ${
                    darkMode
                      ? 'bg-gray-500 text-navy hover:bg-gray-600'
                      : 'bg-gray-300 text-navy hover:bg-gray-400'
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
              <p className='text-sm'>Due: {task.dueDate}</p>
              <div className='flex gap-2 mt-2'>
                <button
                  onClick={() => handleEditClick(task)}
                  className={`px-2 py-1 rounded ${
                    darkMode
                      ? 'bg-cream text-navy hover:bg-green hover:text-cream'
                      : 'bg-navy text-cream hover:bg-coral'
                  }`}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className={`px-2 py-1 rounded ${
                    darkMode
                      ? 'bg-cream text-navy hover:bg-green hover:text-cream'
                      : 'bg-navy text-cream hover:bg-coral'
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
