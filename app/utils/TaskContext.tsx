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
  category: string;
  completed: boolean;
};

type TaskAction =
  | { type: 'addTask'; payload: Task }
  | { type: 'editTask'; payload: Task }
  | { type: 'deleteTask'; payload: string }
  | { type: 'setTasks'; payload: Task[] }
  | { type: 'toggleComplete'; payload: string };

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
    case 'toggleComplete':
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

  const fetchTasks = async () => {
    const res = await fetch('/api/tasks');
    const tasks = await res.json();
    dispatch({ type: 'setTasks', payload: tasks });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TasksContext.Provider value={[state, dispatch]}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) throw new Error('useTasks must be used within a Provider!');
  return context;
};
