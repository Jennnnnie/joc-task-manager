'use client';

import { useState, useEffect } from 'react';
import { useTasks } from '../utils/TaskContext';
import { useDarkMode } from '../utils/DarkModeContext';

export default function TaskForm({
  selectedTask,
  onFormSubmit,
}: {
  selectedTask: any;
  onFormSubmit?: () => void;
}) {
  const [tasks, dispatch] = useTasks();
  const { darkMode } = useDarkMode();

  const [formState, setFormState] = useState({
    id: '',
    name: '',
    description: '',
    dueDate: '',
  });

  useEffect(() => {
    if (selectedTask) {
      setFormState(selectedTask);
    }
  }, [selectedTask]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (formState.id) {
      // Update an existing task
      dispatch({ type: 'editTask', payload: formState });
    } else {
      // Add a new task
      dispatch({
        type: 'addTask',
        payload: { ...formState, id: Date.now().toString() },
      });
    }
    setFormState({ id: '', name: '', description: '', dueDate: '' }); // Reset the form
    onFormSubmit && onFormSubmit(); // Notify that editing is done
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`border p-4 rounded-lg shadow-md ${
        darkMode ? 'bg-navy text-cream' : 'bg-cream text-navy'
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
          darkMode ? 'bg-purple text-cream' : 'bg-yellow text-navy'
        }`}
      />
      <textarea
        name='description'
        placeholder='Task Description'
        value={formState.description}
        onChange={handleChange}
        required
        className={`block w-full mb-2 p-2 border rounded ${
          darkMode ? 'bg-purple text-cream' : 'bg-yellow text-navy'
        }`}
      ></textarea>
      <input
        type='date'
        name='dueDate'
        value={formState.dueDate}
        onChange={handleChange}
        required
        className={`block w-full mb-2 p-2 border rounded ${
          darkMode ? 'bg-purple text-cream' : 'bg-yellow text-navy'
        }`}
      />
      <button
        type='submit'
        className={`px-4 py-2 rounded ${
          darkMode ? 'bg-green text-navy ' : 'bg-coral text-cream '
        }`}
      >
        {formState.id ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
}
