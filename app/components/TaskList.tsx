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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Work':
        return 'bg-green-300';
      case 'Personal':
        return 'bg-purple-300';
      case 'Events':
        return 'bg-blue-300';
      default:
        return '';
    }
  };

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
    const updatedTask = { ...task, completed: true };
    dispatch({ type: 'editTask', payload: updatedTask });
  };

  const handleMarkAsIncomplete = (task: any) => {
    const updatedTask = { ...task, completed: false };
    dispatch({ type: 'editTask', payload: updatedTask });
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
    return matchesSearch && matchesCategory && matchesDate && !task.completed;
  });

  const completedTasks = tasks.filter((task: any) => task.completed);

  const categories = [
    { value: 'Work', label: 'Work' },
    { value: 'Personal', label: 'Personal' },
    { value: 'Events', label: 'Events' },
    {
      value: 'Important',
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
            {task.category === 'Important' ? (
              <FaExclamation className='text-red-500 text-xl absolute top-2 right-2' />
            ) : (
              <div
                className={`absolute top-2 right-2 w-4 h-4 rounded-full ${getCategoryColor(
                  task.category
                )}`}
              />
            )}

            {editingTaskId === task.id ? (
              <div>
                <input
                  type='text'
                  name='name'
                  value={editingTask.name}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, name: e.target.value })
                  }
                  className={`block w-full mb-2 p-2 border rounded ${
                    darkMode ? 'bg-navy text-cream' : 'bg-cream text-navy'
                  }`}
                />
                <textarea
                  name='description'
                  value={editingTask.description}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      description: e.target.value,
                    })
                  }
                  className={`block w-full mb-2 p-2 border rounded ${
                    darkMode ? 'bg-navy text-cream' : 'bg-cream text-navy'
                  }`}
                />
                <input
                  type='date'
                  name='dueDate'
                  value={editingTask.dueDate}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      dueDate: e.target.value,
                    })
                  }
                  className={`block w-full mb-2 p-2 border rounded ${
                    darkMode ? 'bg-navy text-cream' : 'bg-cream text-navy'
                  }`}
                />
                <div className='mb-4'>
                  <label className='font-bold'>Category:</label>
                  <div className='flex gap-2 mt-2'>
                    {categories.map((category) => (
                      <div
                        key={category.value}
                        className={`flex items-center gap-1 px-2 py-1 cursor-pointer rounded ${
                          darkMode
                            ? 'bg-purple text-cream'
                            : 'bg-yellow text-navy'
                        } ${
                          editingTask.category === category.value
                            ? darkMode
                              ? 'ring-2 ring-offset-3 ring-white'
                              : 'ring-2 ring-offset-3 ring-navy'
                            : ''
                        }`}
                        onClick={() =>
                          setEditingTask({
                            ...editingTask,
                            category: category.value,
                          })
                        }
                      >
                        {category.label}
                      </div>
                    ))}
                  </div>
                </div>

                <div className='flex gap-2 mt-4'>
                  <button
                    onClick={handleSaveEdit}
                    className={`px-2 py-1 rounded ${
                      darkMode ? 'bg-white text-navy ' : 'bg-coral text-cream'
                    }`}
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className={`px-2 py-1 rounded ${
                      darkMode
                        ? 'bg-gray-500 text-cream hover:bg-gray-600'
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
                <div className='flex gap-2 mt-4'>
                  <button
                    onClick={() => handleEditClick(task)}
                    className={`px-2 py-1 rounded ${
                      darkMode
                        ? 'bg-cream text-navy hover:bg-sagegreen hover:text-cream'
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
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
