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

  const filteredTasks = tasks.filter((task: any) => {
    const matchesSearch = task.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory
      ? task.category === filterCategory
      : true;
    const matchesDate = filterDate ? task.dueDate === filterDate : true;

    return matchesSearch && matchesCategory && matchesDate;
  });

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
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${
          darkMode ? 'bg-navy text-cream' : 'bg-cream text-navy'
        } p-4 rounded-lg`}
      >
        {filteredTasks.map((task: any) => (
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
                  task.category === 'work'
                    ? 'bg-green-300'
                    : task.category === 'personal'
                    ? 'bg-blue-300'
                    : task.category === 'events'
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

                {/* Checklist */}
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
                        <input
                          type='text'
                          value={item.text}
                          onChange={(e) =>
                            setEditingTask((prev: any) => ({
                              ...prev,
                              checklist: prev.checklist.map((check: any) =>
                                check.id === item.id
                                  ? { ...check, text: e.target.value }
                                  : check
                              ),
                            }))
                          }
                          className={`flex-1 p-2 border rounded ${
                            darkMode
                              ? 'bg-navy text-cream'
                              : 'bg-cream text-navy'
                          }`}
                        />
                        <button
                          type='button'
                          onClick={() =>
                            setEditingTask((prev: any) => ({
                              ...prev,
                              checklist: prev.checklist.filter(
                                (check: any) => check.id !== item.id
                              ),
                            }))
                          }
                          className={`px-2 py-1 rounded ${
                            darkMode
                              ? 'bg-graypurple text-cream'
                              : 'bg-yellow text-navy'
                          }`}
                        >
                          Delete
                        </button>
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
                        darkMode ? 'text-cream' : 'text-navy'
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
                {task.checklist && (
                  <ul className='mt-4 space-y-2'>
                    {task.checklist.map((item: any) => (
                      <li
                        key={item.id}
                        className={`flex items-center gap-2 ${
                          item.completed ? 'line-through text-gray-500' : ''
                        }`}
                      >
                        <input
                          type='checkbox'
                          checked={item.completed}
                          onChange={() =>
                            dispatch({
                              type: 'editTask',
                              payload: {
                                ...task,
                                checklist: task.checklist.map((check: any) =>
                                  check.id === item.id
                                    ? {
                                        ...check,
                                        completed: !check.completed,
                                      }
                                    : check
                                ),
                              },
                            })
                          }
                        />
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                )}
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
                    onClick={() => handleDelete(task.id)}
                    className={`px-2 py-1 rounded ${
                      darkMode
                        ? 'bg-cream text-navy hover:bg-sagegreen hover:text-cream'
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
    </div>
  );
}
