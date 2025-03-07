'use client';

import { FaExclamation } from 'react-icons/fa';
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
    checklist: [] as { id: string; text: string; completed: boolean }[],
    category: '',
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `/api/tasks${formState.id ? `/${formState.id}` : ''}`,
        {
          method: formState.id ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formState.name,
            description: formState.description,
            dueDate: formState.dueDate,
            checklist: formState.checklist,
            category: formState.category,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to ${formState.id ? 'update' : 'create'} task`);
      }

      const newTask = await response.json();
      console.log('Task Saved:', newTask);

      dispatch({
        type: formState.id ? 'editTask' : 'addTask',
        payload: newTask,
      });

      setFormState({
        id: '',
        name: '',
        description: '',
        dueDate: '',
        checklist: [],
        category: '',
      });

      onFormSubmit && onFormSubmit();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async () => {
    if (!formState.id) return;

    try {
      const response = await fetch(`/api/tasks/${formState.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      console.log(`Task ${formState.id} deleted successfully`);

      dispatch({ type: 'deleteTask', payload: formState.id });

      setFormState({
        id: '',
        name: '',
        description: '',
        dueDate: '',
        checklist: [],
        category: '',
      });

      onFormSubmit && onFormSubmit();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
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
          darkMode
            ? 'bg-purple text-cream placeholder:text-cream'
            : 'bg-yellow text-navy placeholder:text-navy'
        }`}
      />
      <textarea
        name='description'
        placeholder='Task Description'
        value={formState.description}
        onChange={handleChange}
        required
        className={`block w-full mb-2 p-2 border rounded ${
          darkMode
            ? 'bg-purple text-cream placeholder:text-cream'
            : 'bg-yellow text-navy placeholder:text-navy'
        }`}
      ></textarea>
      <input
        type='date'
        name='dueDate'
        value={formState.dueDate}
        onChange={handleChange}
        required
        className={`block w-full mb-2 p-2 border rounded ${
          darkMode
            ? 'bg-purple text-cream placeholder:text-gray-400'
            : 'bg-yellow text-navy'
        }`}
      />
      <div className='flex gap-4'>
        <button type='submit' className='bg-blue-500 text-white p-2 rounded'>
          {formState.id ? 'Update Task' : 'Add Task'}
        </button>
        {formState.id && (
          <button
            type='button'
            onClick={handleDelete}
            className='bg-red-500 text-white p-2 rounded'
          >
            Delete Task
          </button>
        )}
      </div>
    </form>
  );
}
