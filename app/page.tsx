'use client';

import { useDarkMode } from './utils/DarkModeContext';

export default function Home() {
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <div className='top-container'>
      <div className={darkMode ? 'dark' : ''}>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className='px-4 py-2 bg-slate-500 text-white rounded'
        >
          Dark Mode: {JSON.stringify(darkMode)}
        </button>
      </div>
    </div>
  );
}
