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
    category: '', // Stores the selected category
  });

  const [newChecklistItem, setNewChecklistItem] = useState('');

  useEffect(() => {
    if (selectedTask) {
      setFormState(selectedTask);
    }
  }, [selectedTask]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddChecklistItem = () => {
    if (newChecklistItem.trim()) {
      setFormState((prev) => ({
        ...prev,
        checklist: [
          ...prev.checklist,
          {
            id: Date.now().toString(),
            text: newChecklistItem,
            completed: false,
          },
        ],
      }));
      setNewChecklistItem(''); // Clear input after adding
    }
  };

  const handleChecklistChange = (id: string) => {
    setFormState((prev) => ({
      ...prev,
      checklist: prev.checklist.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      ),
    }));
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
    setFormState({
      id: '',
      name: '',
      description: '',
      dueDate: '',
      checklist: [],
      category: '',
    }); // Reset the form
    onFormSubmit && onFormSubmit(); // Notify that editing is done
  };

  const categories = [
    { value: 'red', label: 'Work' },
    { value: 'green', label: 'Personal' },
    { value: 'blue', label: 'Events' },
    {
      value: 'important',
      label: (
        <>
          Important! <FaExclamation />
        </>
      ),
    },
  ];

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
      <div className={`block w-full mb-2`}>
        <label className='font-bold'>Category:</label>
        <div className={`flex gap-2 items-center`}>
          {categories.map((category) => (
            <div
              key={category.value}
              className={`flex items-center gap-1 cursor-pointer px-2 py-1 rounded ${
                darkMode ? 'bg-purple text-cream' : 'bg-yellow text-navy'
              } ${
                formState.category === category.value
                  ? 'ring-2 ring-offset-2 ring-coral'
                  : ''
              }`}
              onClick={() =>
                setFormState((prev) => ({
                  ...prev,
                  category: category.value,
                }))
              }
            >
              {category.label}
            </div>
          ))}
        </div>
      </div>
      <div className='mb-4'>
        <h4 className='font-bold mb-2'>Checklist</h4>
        <ul className='mb-2 space-y-2'>
          {formState.checklist.map((item) => (
            <li key={item.id} className='flex items-center gap-2'>
              <input
                type='checkbox'
                checked={item.completed}
                onChange={() => handleChecklistChange(item.id)}
              />
              <span
                className={`${
                  item.completed ? 'line-through text-gray-500' : ''
                }`}
              >
                {item.text}
              </span>
            </li>
          ))}
        </ul>
        <div className='flex gap-2'>
          <input
            type='text'
            placeholder='Add checklist item'
            value={newChecklistItem}
            onChange={(e) => setNewChecklistItem(e.target.value)}
            className={`flex-1 p-2 border rounded ${
              darkMode ? 'bg-purple text-cream' : 'bg-yellow text-navy'
            }`}
          />
          <button
            type='button'
            onClick={handleAddChecklistItem}
            className={`px-4 py-2 rounded ${
              darkMode ? 'bg-green text-navy ' : 'bg-coral text-cream '
            }`}
          >
            Add
          </button>
        </div>
      </div>
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
