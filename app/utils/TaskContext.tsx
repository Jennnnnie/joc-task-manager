'use client';

import React, {
  createContext,
  ReactNode,
  useReducer,
  useEffect,
  useContext,
} from 'react';

type Task = {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  completed: boolean; // Add this property
};

type TaskAction =
  | { type: 'addTask'; payload: Task }
  | { type: 'editTask'; payload: Task }
  | { type: 'deleteTask'; payload: string }
  | { type: 'setTasks'; payload: Task[] }
  | { type: 'toggleComplete'; payload: string }; // New action to toggle completion

const TasksReducer = (state: Task[], action: TaskAction): Task[] => {
  switch (action.type) {
    case 'addTask':
      return [...state, action.payload];
    case 'editTask':
      return state.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
    case 'deleteTask':
      return state.filter((task) => task.id !== action.payload);
    case 'setTasks':
      return action.payload;
    case 'toggleComplete': // New case
      return state.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );
    default:
      return state;
  }
};

const TasksContext = createContext<any>(null);

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(TasksReducer, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('tasks') || '[]');
    if (storedData.length > 0)
      dispatch({ type: 'setTasks', payload: storedData });
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(state));
  }, [state]);

  return (
    <TasksContext.Provider value={[state, dispatch]}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) throw new Error('useTasks must be used within a Provider!');
  return context; // Returns state and dispatch
};
