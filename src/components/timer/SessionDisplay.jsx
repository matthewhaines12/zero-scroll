import { CheckCircle2 } from 'lucide-react';

const SLOTS = 5;

const SessionDisplay = ({ isRunning, mode }) => {
  return (
    <div className="flex items-center justify-between px-4 h-10 w-60 bg-surface-2 rounded-full">
      {Array.from({ length: SLOTS }, (_, i) => (
        <p key={i} className="w-3 h-3 bg-text-base/50 rounded-full"></p>
      ))}
    </div>
  );
};

export default SessionDisplay;
