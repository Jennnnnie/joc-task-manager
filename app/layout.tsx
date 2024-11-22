'use client';

import './styles/globals.css';
import Head from 'next/head';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

import { DarkModeProvider, useDarkMode } from './utils/DarkModeContext';
import { FoldersProvider } from './utils/FoldersContext';
import { TasksProvider } from './utils/TaskContext';

function DarkModeToggle() {
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-full flex items-center gap-2 transition ${
        darkMode ? 'text-cream' : 'text-navy'
      }`}
    >
      {darkMode ? <MdLightMode size={30} /> : <MdDarkMode size={30} />}
    </button>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { darkMode } = useDarkMode();

  return (
    <DarkModeProvider>
      <FoldersProvider>
        <TasksProvider>
          <html lang='en'>
            <Head>
              <title>Welcome to your Task Manager</title>
              <meta name='description' content='Generated by create next app' />
            </Head>
            <body
              className={`${
                darkMode
                  ? 'bg-navy text-cream dark'
                  : 'bg-cream text-navy light'
              } min-h-screen`}
            >
              <DarkModeToggle />
              <div className='min-h-screen flex flex-col'>{children}</div>
            </body>
          </html>
        </TasksProvider>
      </FoldersProvider>
    </DarkModeProvider>
  );
}
