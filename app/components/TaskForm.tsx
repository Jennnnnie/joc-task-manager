'use client';

import { useState } from 'react';
import { useTasks } from '../utils/TaskContext';
import { useDarkMode } from '../utils/DarkModeContext';

export default function TaskForm() {
  const [tasks, dispatch] = useTasks();
  const { darkMode } = useDarkMode();

  const [formState, setFormState] = useState({
    id: '',
    name: '',
    description: '',
    dueDate: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (formState.id) {
      dispatch({ type: 'editTask', payload: formState });
    } else {
      dispatch({
        type: 'addTask',
        payload: { ...formState, id: Date.now().toString() },
      });
    }
    setFormState({ id: '', name: '', description: '', dueDate: '' });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`task-form border p-4 rounded m-10 ${
        darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <input
        type='text'
        name='name'
        placeholder='Task Name'
        value={formState.name}
        onChange={handleChange}
        required
        className={`block w-full mb-2 p-2 border rounded ${
          darkMode ? 'bg-gray-600 text-white' : 'bg-gray-200 text-black'
        }`}
      />
      <textarea
        name='description'
        placeholder='Task Description'
        value={formState.description}
        onChange={handleChange}
        required
        className={`block w-full mb-2 p-2 border rounded ${
          darkMode ? 'bg-gray-600 text-white' : 'bg-gray-200 text-black'
        }`}
      ></textarea>
      <input
        type='date'
        name='dueDate'
        value={formState.dueDate}
        onChange={handleChange}
        required
        className={`block w-full mb-2 p-2 border rounded ${
          darkMode ? 'bg-gray-600 text-white' : 'bg-gray-200 text-black'
        }`}
      />
      <button
        type='submit'
        className={`px-4 py-2 rounded ${
          darkMode
            ? 'bg-blue-400 text-black hover:bg-blue-500'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        {formState.id ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
}
