'use client';

import { useState } from 'react';
import { useTasks } from '../utils/TaskContext';
import { useDarkMode } from '../utils/DarkModeContext';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'; // Import React Icons

export default function CalendarWidget() {
  const [tasks] = useTasks();
  const { darkMode } = useDarkMode();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const todayFormatted = today.toISOString().split('T')[0]; // Format today as YYYY-MM-DD

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const tasksForSelectedDate = tasks.filter(
    (task: any) => task.dueDate === selectedDate
  );

  const handleDayClick = (day: number) => {
    const clickedDate = formatDate(new Date(currentYear, currentMonth, day));
    setSelectedDate(clickedDate);
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  return (
    <div
      className={`p-8 rounded-lg shadow-md ${
        darkMode ? 'bg-navy text-cream' : 'bg-cream text-navy'
      }`}
    >
      <div className='flex items-center justify-between mb-6'>
        <button
          onClick={handlePrevMonth}
          className={`p-2 rounded-full transition-transform hover:scale-110 ${
            darkMode ? 'bg-gray-600 text-cream' : 'bg-yellow text-navy'
          }`}
        >
          <FiChevronLeft size={24} />
        </button>
        <h2 className='text-2xl font-bold'>
          {new Date(currentYear, currentMonth).toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          })}
        </h2>
        <button
          onClick={handleNextMonth}
          className={`p-2 rounded-full transition-transform hover:scale-110 ${
            darkMode ? 'bg-gray-600 text-cream' : 'bg-yellow text-navy'
          }`}
        >
          <FiChevronRight size={24} />
        </button>
      </div>
      <div
        className='grid grid-cols-7 gap-6 text-center'
        style={{
          gridAutoRows: 'minmax(70px, auto)',
        }}
      >
        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => (
          <span key={day} className='font-bold text-lg'>
            {day}
          </span>
        ))}
        {Array.from({
          length: firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1,
        }).map((_, idx) => (
          <span key={idx}></span>
        ))}
        {days.map((day) => {
          const date = formatDate(new Date(currentYear, currentMonth, day));
          const isToday = date === todayFormatted;
          const isSelected = date === selectedDate;

          return (
            <button
              key={day}
              onClick={() => handleDayClick(day)}
              className={`flex items-center justify-center h-full rounded-lg text-lg transition-transform hover:scale-110 ${
                isToday
                  ? darkMode
                    ? 'bg-graypurple text-cream'
                    : 'bg-coral text-navy'
                  : isSelected
                  ? darkMode
                    ? 'bg-purple text-cream'
                    : 'bg-yellow text-navy'
                  : darkMode
                  ? 'bg-gray-600 text-white'
                  : 'bg-cream text-black'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
      {/* Display tasks for the selected date */}
      {selectedDate && (
        <div className='mt-6'>
          <h3 className='text-lg font-bold'>
            Tasks for {new Date(selectedDate).toLocaleDateString()}
          </h3>
          {tasksForSelectedDate.length > 0 ? (
            <ul className='mt-2 space-y-2'>
              {tasksForSelectedDate.map((task: any) => (
                <li
                  key={task.id}
                  className={`p-2 rounded shadow ${
                    darkMode ? 'bg-purple text-cream' : 'bg-yellow text-navy'
                  }`}
                >
                  <h4 className='font-bold'>{task.name}</h4>
                  <p>{task.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              No tasks for this day.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
