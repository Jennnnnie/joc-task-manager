'use client';

import { useRef, useState } from 'react';
import { useTasks } from '../utils/TaskContext';
import { useDarkMode } from '../utils/DarkModeContext';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const getCategoryColor = (category: string) => {
  switch (category?.toLowerCase()) {
    case 'work':
      return 'bg-green-400';
    case 'personal':
      return 'bg-blue-400';
    case 'events':
      return 'bg-purple-400';
    case 'important':
      return 'bg-red-500';
    default:
      return 'bg-gray-400';
  }
};

export default function CalendarWidget() {
  const [tasks] = useTasks();
  const { darkMode } = useDarkMode();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [widgetPosition, setWidgetPosition] = useState({ left: 0, top: 0 });
  const [widgetScale, setWidgetScale] = useState(0);

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const todayFormatted = today.toISOString().split('T')[0];

  const formatDate = (date: Date) => date.toISOString().split('T')[0];
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const calendarRef = useRef(null);

  const handleDayClick = (day: number, event: any) => {
    const clickedDate = formatDate(new Date(currentYear, currentMonth, day));
    if (clickedDate === selectedDate) {
      setWidgetScale(0);
      setSelectedDate(null);
    } else {
      setSelectedDate(clickedDate);
      const rect = event.target.getBoundingClientRect();
      setWidgetPosition({
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY - 100,
      });
      setWidgetScale(1);
    }
  };

  const tasksForSelectedDate = tasks.filter(
    (task: any) => task.dueDate?.split('T')[0] === selectedDate
  );

  return (
    <div
      ref={calendarRef}
      className={`p-8 rounded-lg shadow-md ${
        darkMode ? 'bg-navy text-cream' : 'bg-cream text-navy'
      }`}
      style={{ minHeight: '700px' }}
    >
      <div className='flex items-center justify-between mb-6'>
        <button
          onClick={() =>
            setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1))
          }
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
          onClick={() =>
            setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1))
          }
          className={`p-2 rounded-full transition-transform hover:scale-110 ${
            darkMode ? 'bg-gray-600 text-cream' : 'bg-yellow text-navy'
          }`}
        >
          <FiChevronRight size={24} />
        </button>
      </div>

      <div className='grid grid-cols-7 gap-6 text-center'>
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
          const dayTasks = tasks.filter(
            (task: any) => task.dueDate?.split('T')[0] === date
          );

          return (
            <button
              key={day}
              onClick={(event) => handleDayClick(day, event)}
              className={`relative flex flex-col items-center justify-center h-14 w-14 rounded-full text-lg transition-transform hover:scale-110 ${
                isToday
                  ? 'bg-white text-navy border-2 border-black'
                  : selectedDate === date
                  ? 'bg-coral text-white'
                  : 'bg-cream text-black'
              }`}
            >
              <span className='relative z-20'>{day}</span>
              <div className='flex gap-[2px] mt-1'>
                {dayTasks.slice(0, 3).map((task: any, index: number) => (
                  <span
                    key={index}
                    className={`w-2 h-2 rounded-full ${getCategoryColor(
                      task.category
                    )}`}
                  ></span>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {selectedDate && (
        <div
          className='absolute p-4 rounded-lg shadow-lg bg-white text-black'
          style={{
            width: '300px',
            left: widgetPosition.left,
            top: widgetPosition.top,
            position: 'absolute',
            transform: 'translate(-50%, -100%)',
            zIndex: 1000,
          }}
        >
          <h3 className='font-semibold text-xl mb-2'>
            Tasks for {selectedDate}
          </h3>
          {tasksForSelectedDate.length > 0 ? (
            <ul>
              {tasksForSelectedDate.map((task: any) => (
                <li
                  key={task.id}
                  className={`mb-2 p-2 border rounded flex items-center gap-2`}
                >
                  <span
                    className={`w-3 h-3 rounded-full ${getCategoryColor(
                      task.category
                    )}`}
                  ></span>
                  {task.name}
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
