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
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterDate, setFilterDate] = useState('');

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
    if (!editingTask) return;
    dispatch({ type: 'editTask', payload: editingTask });
    setEditingTaskId(null);
    setEditingTask(null);
  };

  const handleMarkAsComplete = (task: any) => {
    const updatedTask = { ...task, completed: true }; // Set task as completed
    dispatch({ type: 'editTask', payload: updatedTask }); // Dispatch edit action
  };

  const handleMarkAsIncomplete = (task: any) => {
    const updatedTask = { ...task, completed: false }; // Set task as incomplete
    dispatch({ type: 'editTask', payload: updatedTask }); // Dispatch edit action
  };

  const handleDelete = (id: string) => {
    dispatch({ type: 'deleteTask', payload: id });
  };

  const filteredTasks = tasks.filter((task: any) => {
    const matchesSearch = task.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory
      ? task.category === filterCategory
      : true;
    const matchesDate = filterDate ? task.dueDate === filterDate : true;
    return matchesSearch && matchesCategory && matchesDate && !task.completed; // Exclude completed tasks
  });

  const completedTasks = tasks.filter((task: any) => task.completed);

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
    <div>
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center gap-4'>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className={`p-2 rounded border ${
              darkMode ? 'bg-graypurple text-cream' : 'bg-yellow text-navy'
            }`}
          >
            <option value=''>All Categories</option>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          <input
            type='date'
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className={`p-2 rounded border ${
              darkMode ? 'bg-graypurple text-cream' : 'bg-yellow text-navy'
            }`}
          />
        </div>
        <input
          type='text'
          placeholder='Search tasks...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`p-2 rounded border ${
            darkMode
              ? 'bg-graypurple text-cream placeholder:text-cream'
              : 'bg-yellow text-navy placeholder:text-navy'
          }`}
        />
      </div>

      {/* Active tasks */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${
          darkMode ? 'bg-navy text-cream' : 'bg-cream text-navy'
        } p-4 rounded-lg`}
      >
        {filteredTasks.map((task: any) => (
          <div
            key={task.id}
            className={`relative border p-4 rounded shadow ${
              darkMode ? 'bg-graypurple text-cream' : 'bg-yellow text-navy'
            }`}
          >
            <h2 className='font-bold text-lg'>{task.name}</h2>
            <p>{task.description}</p>
            <p className='text-sm'>Due: {task.dueDate}</p>
            <div className='flex gap-2 mt-4'>
              <button
                onClick={() => handleEditClick(task)}
                className={`px-2 py-1 rounded ${
                  darkMode
                    ? 'bg-cream text-navy hover:bg-sagegreen'
                    : 'bg-navy text-cream hover:bg-coral'
                }`}
              >
                Edit
              </button>
              <button
                onClick={() => handleMarkAsComplete(task)}
                className={`px-2 py-1 rounded ${
                  darkMode
                    ? 'bg-sagegreen text-cream hover:bg-green-700'
                    : 'bg-sagegreen text-white hover:bg-green-700'
                }`}
              >
                Mark as Complete
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                className={`px-2 py-1 rounded ${
                  darkMode
                    ? 'bg-red-600 text-cream hover:bg-red-700'
                    : 'bg-red-500 text-white hover:bg-red-600'
                }`}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className='mt-8'>
        <h2 className='text-lg font-bold mb-4'>Completed Tasks</h2>
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${
            darkMode ? 'bg-navy text-cream' : 'bg-cream text-navy'
          } p-4 rounded-lg`}
        >
          {completedTasks.map((task: any) => (
            <div
              key={task.id}
              className={`relative border p-4 rounded shadow ${
                darkMode ? 'bg-graypurple text-cream' : 'bg-yellow text-navy'
              }`}
            >
              <h2 className='font-bold text-lg'>{task.name}</h2>
              <p>{task.description}</p>
              <p className='text-sm'>Completed</p>
              <div className='flex gap-2 mt-4'>
                <button
                  onClick={() => handleMarkAsIncomplete(task)}
                  className={`px-2 py-1 rounded ${
                    darkMode
                      ? 'bg-sagegreen text-cream hover:bg-yellow-700'
                      : 'bg-yellow-500 text-black hover:bg-yellow-600'
                  }`}
                >
                  Mark as Incomplete
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className={`px-2 py-1 rounded ${
                    darkMode
                      ? 'bg-red-600 text-cream hover:bg-red-700'
                      : 'bg-red-500 text-white hover:bg-red-600'
                  }`}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
