import { createContext, use, useState } from 'react';

const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  // Mock Data
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Refactor Auth Middleware',
      completed: false,
      priority: 'HIGH',
      active: false,
    },
    {
      id: 2,
      title: 'Design Database Schema',
      completed: true,
      priority: 'MED',
      active: false,
    },
    {
      id: 3,
      title: 'Update API Documentation',
      completed: false,
      priority: 'LOW',
      active: false,
    },
  ]);

  const [activeTask, setActiveTask] = useState(null);

  return (
    <TaskContext value={{ tasks, setTasks, activeTask, setActiveTask }}>
      {children}
    </TaskContext>
  );
};

export const useTaskContext = () => {
  const context = use(TaskContext);

  if (!context) {
    throw new Error('useTaskContext must be used within TimerProvider');
  }

  return context;
};
