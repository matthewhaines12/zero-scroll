// import { createContext, use, useState } from 'react';

// const SessionContext = createContext(null);

// export const SessionProvider = ({ children }) => {
//   // Mock Data
//   const [session, setSession] = useState();

//   return (
//     <SessionContext value={{ session, setSession }}>{children}</SessionContext>
//   );
// };

// export const useSessionContext = () => {
//   const context = use(TaskContext);

//   if (!context) {
//     throw new Error('useTaskContext must be used within TimerProvider');
//   }

//   return context;
// };
