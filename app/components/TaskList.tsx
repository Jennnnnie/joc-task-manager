'use client';

import { FaExclamation } from 'react-icons/fa';
import { useState } from 'react';
import { useTasks } from '../utils/TaskContext';
import { useDarkMode } from '../utils/DarkModeContext';

export default function TaskList() {
  const [tasks, dispatch] = useTasks();
  const { darkMode } = useDarkMode();

  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [newChecklistItem, setNewChecklistItem] = useState('');

  const handleEditClick = (task: any) => {
    setEditingTaskId(task.id);
    setEditingTask({ ...task });
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditingTask(null);
    setNewChecklistItem('');
  };

  const handleSaveEdit = () => {
    dispatch({ type: 'editTask', payload: editingTask });
    setEditingTaskId(null);
    setEditingTask(null);
  };

  const handleChecklistChange = (itemId: string) => {
    setEditingTask((prev: any) => ({
      ...prev,
      checklist: prev.checklist.map((item: any) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      ),
    }));
  };

  const handleAddChecklistItem = () => {
    if (newChecklistItem.trim()) {
      setEditingTask((prev: any) => ({
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

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setEditingTask((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleDelete = (id: string) => {
    dispatch({ type: 'deleteTask', payload: id });
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
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${
        darkMode ? 'bg-navy text-cream' : 'bg-cream text-navy'
      } p-4 rounded-lg`}
    >
      {tasks.map((task: any) => (
        <div
          key={task.id}
          className={`relative border p-4 rounded shadow ${
            darkMode ? 'bg-graypurple text-cream ' : 'bg-yellow text-navy '
          }`}
        >
          {task.category && (
            <div
              className={`absolute top-2 right-2 ${
                task.category === 'important'
                  ? 'text-red-500'
                  : 'w-4 h-4 rounded-full'
              } ${
                task.category === 'red'
                  ? 'bg-green-300'
                  : task.category === 'green'
                  ? 'bg-blue-300'
                  : task.category === 'blue'
                  ? 'bg-purple-300'
                  : task.category === 'important'
                  ? ''
                  : 'bg-gray-500'
              }`}
            >
              {task.category === 'important' && (
                <FaExclamation className='text-xl' />
              )}
            </div>
          )}

          {editingTaskId === task.id ? (
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
              <div className={`mb-2`}>
                <label className='font-bold'>Category:</label>
                <div className={`flex gap-2 mt-2`}>
                  {categories.map((category) => (
                    <div
                      key={category.value}
                      className={`flex items-center gap-1 px-2 py-1 cursor-pointer rounded ${
                        darkMode
                          ? 'bg-purple text-cream'
                          : 'bg-yellow text-navy'
                      } ${
                        editingTask.category === category.value
                          ? 'ring-2 ring-offset-2 ring-coral'
                          : ''
                      }`}
                      onClick={() =>
                        setEditingTask((prev: any) => ({
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
              <div>
                <h4 className='font-bold mb-2'>Checklist</h4>
                <ul className='mb-2 space-y-2'>
                  {editingTask.checklist?.map((item: any) => (
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
                      darkMode ? 'bg-navy text-cream' : 'bg-cream text-navy'
                    }`}
                  />
                  <button
                    type='button'
                    onClick={handleAddChecklistItem}
                    className={`px-2 py-1 rounded ${
                      darkMode
                        ? 'bg-green text-navy hover:bg-purple'
                        : 'bg-coral text-cream hover:bg-yellow'
                    }`}
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className='flex gap-2 mt-4'>
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
            <div>
              <h2 className='font-bold text-lg'>{task.name}</h2>
              <p>{task.description}</p>
              <p className='text-sm'>Due: {task.dueDate}</p>
              {task.checklist && (
                <ul className='mt-4 space-y-2'>
                  {task.checklist.map((item: any) => (
                    <li
                      key={item.id}
                      className={`${
                        item.completed
                          ? 'line-through text-gray-500'
                          : 'text-current'
                      }`}
                    >
                      {item.text}
                    </li>
                  ))}
                </ul>
              )}
              <div className='flex gap-2 mt-4'>
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
