'use client';

import React, {
  createContext,
  ReactNode,
  useReducer,
  useEffect,
  useContext,
} from 'react';

const FoldersReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'setFolders': {
      return action.payload;
    }
    default:
      return state;
  }
};

const FoldersContext = createContext<any>(null);

export const FoldersProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(FoldersReducer, {});

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('folders') || '{}');
    if (Object.keys(storedData).length > 0)
      dispatch({ type: 'setFolders', payload: storedData });
    console.log('localStorage: get');
  }, []);

  useEffect(() => {
    if (JSON.stringify(state) === '{}') return;
    localStorage.setItem('folders', JSON.stringify(state));
    console.log('localStorage: set');
  }, [state]);

  return (
    <FoldersContext.Provider value={[state, dispatch]}>
      {children}
    </FoldersContext.Provider>
  );
};

export const useFolders = () => {
  const context = useContext(FoldersContext);
  if (!context) throw new Error('useFolders must be used within a Provider!');
  else return context; // Return state and dispatch
};
