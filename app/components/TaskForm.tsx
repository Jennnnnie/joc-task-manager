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

  const [newChecklistItem, setNewChecklistItem] = useState('');
  const [editingChecklistItemId, setEditingChecklistItemId] = useState<
    string | null
  >(null);
  const [editedChecklistItemText, setEditedChecklistItemText] = useState('');

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
      setNewChecklistItem('');
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

  const handleEditChecklistItem = (id: string, text: string) => {
    setEditingChecklistItemId(id);
    setEditedChecklistItemText(text);
  };

  const handleSaveEditedChecklistItem = (id: string) => {
    setFormState((prev) => ({
      ...prev,
      checklist: prev.checklist.map((item) =>
        item.id === id ? { ...item, text: editedChecklistItemText } : item
      ),
    }));
    setEditingChecklistItemId(null);
    setEditedChecklistItemText('');
  };

  const handleDeleteChecklistItem = (id: string) => {
    setFormState((prev) => ({
      ...prev,
      checklist: prev.checklist.filter((item) => item.id !== id),
    }));
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
    setFormState({
      id: '',
      name: '',
      description: '',
      dueDate: '',
      checklist: [],
      category: '',
    });
    onFormSubmit && onFormSubmit();
  };

  const categories = [
    { value: 'work', label: 'Work' },
    { value: 'personal', label: 'Personal' },
    { value: 'events', label: 'Events' },
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
          darkMode
            ? 'bg-purple text-cream placeholder:text-cream'
            : 'bg-yellow text-navy placeholder:text-navy'
        }`}
        style={{
          colorScheme: darkMode ? 'dark' : 'light',
        }}
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
        style={{
          colorScheme: darkMode ? 'dark' : 'light',
        }}
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
        style={{
          colorScheme: darkMode ? 'dark' : 'light',
        }}
      />
      <div className={`block w-full mb-2`}>
        <label className='font-bold'>Category:</label>
        <div className={`flex gap-2 items-center`}>
          {categories.map((category) => (
            <div
              key={category.value}
              className={`flex items-center gap-1 cursor-pointer px-2 py-1 rounded ${
                darkMode
                  ? 'bg-graypurple text-cream hover:bg-sagegreen'
                  : 'bg-yellow text-navy hover:bg-coral hover:text-cream'
              } ${
                formState.category === category.value
                  ? darkMode
                    ? 'ring-2 ring-offset-3 ring-white'
                    : 'ring-2 ring-offset-3 ring-navy'
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
              {editingChecklistItemId === item.id ? (
                <>
                  <input
                    type='text'
                    value={editedChecklistItemText}
                    onChange={(e) => setEditedChecklistItemText(e.target.value)}
                    className={`flex-1 p-2 border rounded ${
                      darkMode ? 'bg-navy text-cream' : 'bg-cream text-navy'
                    }`}
                  />
                  <button
                    type='button'
                    onClick={() => handleSaveEditedChecklistItem(item.id)}
                    className={`px-2 py-1 rounded ${
                      darkMode ? ' text-cream' : ' text-navy'
                    }`}
                  >
                    Save
                  </button>
                  <button
                    type='button'
                    onClick={() => handleDeleteChecklistItem(item.id)}
                    className={`px-2 py-1 rounded ${
                      darkMode ? 'text-cream' : 'text-navy'
                    }`}
                  >
                    Delete
                  </button>
                </>
              ) : (
                <>
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
                  <button
                    type='button'
                    onClick={() => handleEditChecklistItem(item.id, item.text)}
                    className={`px-2 py-1 rounded ${
                      darkMode
                        ? 'bg-graypurple text-cream'
                        : 'bg-coral text-cream hover:bg-yellow'
                    }`}
                  >
                    Edit
                  </button>
                </>
              )}
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
              darkMode
                ? 'text-cream placeholder:text-cream'
                : 'bg-yellow text-navy placeholder:text-navy'
            }`}
            style={{
              colorScheme: darkMode ? 'dark' : 'light',
            }}
          />
          <button
            type='button'
            onClick={handleAddChecklistItem}
            className={`px-4 py-2 rounded ${
              darkMode ? 'bg-graypurple text-cream' : 'bg-coral text-cream'
            }`}
          >
            Add
          </button>
        </div>
      </div>
      <button
        type='submit'
        className={`px-4 py-2 rounded ${
          darkMode ? 'bg-graypurple text-cream ' : 'bg-coral text-cream '
        }`}
      >
        {formState.id ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
}
