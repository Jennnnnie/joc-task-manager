'use client';

import { useRef, useState } from 'react';
import { useTasks } from '../utils/TaskContext';
import { useDarkMode } from '../utils/DarkModeContext';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function CalendarWidget() {
  const [tasks] = useTasks();
  const { darkMode } = useDarkMode();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [widgetPosition, setWidgetPosition] = useState<{
    left: number;
    top: number;
  }>({
    left: 0,
    top: 0,
  });
  const [widgetScale, setWidgetScale] = useState(0);

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const todayFormatted = today.toISOString().split('T')[0];

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const tasksForSelectedDate = tasks.filter(
    (task: any) => task.dueDate === selectedDate
  );

  const calendarRef = useRef(null);

  const handleDayClick = (day: number) => {
    const clickedDate = formatDate(new Date(currentYear, currentMonth, day));

    if (clickedDate === selectedDate) {
      setWidgetScale(0); // Zoom out (slide back into the number)
      setSelectedDate(null); // Hide the task widget
    } else {
      setSelectedDate(clickedDate);

      if (calendarRef.current) {
        const selectedDayElement = document.getElementById(`day-${day}`);
        if (selectedDayElement) {
          const rect = selectedDayElement.getBoundingClientRect();
          setWidgetPosition({
            left: rect.left + rect.width / 2 - 150,
            top: rect.top + rect.height / 2 - 200,
          });
        }
      }

      setWidgetScale(1);
    }
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
      ref={calendarRef}
      className={`p-8 rounded-lg shadow-md ${
        darkMode ? 'bg-navy text-cream' : 'bg-cream text-navy'
      }`}
      style={{
        height: '850px',
      }}
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
          gridAutoRows: 'minmax(100px, auto)',
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
              id={`day-${day}`}
              key={day}
              onClick={() => handleDayClick(day)}
              className={`relative flex items-center justify-center h-full rounded-lg text-lg transition-transform hover:scale-110 ${
                isToday
                  ? darkMode
                    ? 'bg-white text-navy'
                    : 'bg-white text-navy'
                  : isSelected
                  ? darkMode
                    ? 'bg-sagegreen text-cream'
                    : 'bg-coral text-navy'
                  : darkMode
                  ? 'bg-gray-600 text-white'
                  : 'bg-cream text-black'
              }`}
              style={{
                minWidth: '60px',
                minHeight: '60px',
                backgroundColor: 'transparent',
              }}
            >
              {isToday && (
                <div
                  className={`absolute w-10 h-10 rounded-full bg-white border-0 text-navy z-10`}
                />
              )}

              {isSelected && (
                <div
                  className={`absolute w-10 h-10 rounded-full ${
                    darkMode ? 'bg-sagegreen' : 'bg-coral'
                  } border-0 z-10`}
                />
              )}

              <span className='relative z-20'>{day}</span>
            </button>
          );
        })}
      </div>

      {selectedDate && (
        <div
          className={`absolute p-4 rounded-lg shadow-lg transition-all ${
            darkMode ? 'bg-gray-700 text-cream' : 'bg-white text-navy'
          }`}
          style={{
            width: '300px',
            maxHeight: '400px',
            overflowY: 'auto',
            zIndex: 1000,
            left: `${widgetPosition.left}px`,
            top: `${widgetPosition.top}px`,
            transform: `scale(${widgetScale}) translate(0, 0)`,
            transition:
              'transform 0.7s ease-in-out, left 0.7s ease-in-out, top 0.7s ease-in-out',
          }}
        >
          <h3 className='font-semibold text-xl mb-2'>
            Tasks for {selectedDate}
          </h3>
          {tasksForSelectedDate.length > 0 ? (
            <ul>
              {tasksForSelectedDate.map((task: any, index: number) => (
                <li key={index} className='mb-2'>
                  <div className='font-bold'>{task.title}</div>
                  <div className='text-sm'>{task.description}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No tasks for this day.</p>
          )}
        </div>
      )}
    </div>
  );
}
