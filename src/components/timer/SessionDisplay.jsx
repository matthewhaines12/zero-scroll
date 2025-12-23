import { useSessionContext } from '../../context/SessionContext';
import { CheckCircle2, Circle } from 'lucide-react';

const SessionDisplay = ({ isRunning, mode, repeatCount }) => {
  const { completedFocusSessions, currentCycle } = useSessionContext();

  return (
    <div className="flex items-center gap-3">
      {Array.from({ length: repeatCount * 2 }, (_, i) => {
        const isFocusSlot = i % 2 === 0;
        const focusIndex = Math.floor(i / 2);
        const isFocusCompleted =
          isFocusSlot && focusIndex < completedFocusSessions;
        const isBreakCompleted =
          !isFocusSlot && focusIndex < completedFocusSessions;

        // Calculate if this slot is currently active
        const isCurrent =
          i === currentCycle * 2 - 2 || i === currentCycle * 2 - 1;
        const isActiveFocus = isCurrent && isFocusSlot && mode === 'FOCUS';
        const isActiveBreak =
          isCurrent && !isFocusSlot && (mode === 'BREAK' || mode === 'RECOVER');

        // Completed focus - show checkmark with blue
        if (isFocusCompleted) {
          return (
            <div key={i} className="relative">
              <CheckCircle2
                size={24}
                className="text-neon-focus drop-shadow-neon-focus/40"
                strokeWidth={2.5}
              />
            </div>
          );
        }

        // Completed break - show filled green dot
        if (isBreakCompleted) {
          return (
            <div key={i} className="relative">
              <div className="w-3 h-3 rounded-full bg-neon-break drop-shadow-neon-break/40" />
            </div>
          );
        }

        // Active focus session - show pulsing blue outline
        if (isActiveFocus) {
          return (
            <div key={i} className="relative">
              <Circle
                size={24}
                className={`text-neon-focus ${
                  isRunning ? 'animate-pulse' : ''
                }`}
                strokeWidth={2.5}
              />
            </div>
          );
        }

        // Active break session - show pulsing green ring - not working * fix later *
        if (isActiveBreak) {
          return (
            <div key={i} className="relative">
              <div
                className={`w-2 h-2 rounded-full border-2 border-neon-break ${
                  isRunning ? 'animate-pulse' : ''
                }`}
              />
            </div>
          );
        }

        // Upcoming sessions - show muted outline
        return (
          <div key={i} className="relative">
            {isFocusSlot ? (
              <Circle size={24} className="text-text-base/30" strokeWidth={2} />
            ) : (
              <div className="w-3 h-3 rounded-full border-2 border-text-base/30" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SessionDisplay;
