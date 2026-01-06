import { useModeContext } from '../../context/ModeContext';
import { useSessionContext } from '../../context/SessionContext';
import { useTaskContext } from '../../context/TaskContext';
import { useSettingsContext } from '../../context/SettingsContext';
import { MODES } from '../../services/utils/constants';
import { Target, BookOpenText, ClipboardList } from 'lucide-react';

const QuickStats = () => {
  const { mode } = useModeContext();
  const {
    totalFocusSessions,
    totalDeepWorkMins,
    loading: sessionLoading,
  } = useSessionContext();
  const { completedTasksToday, loading: taskLoading } = useTaskContext();
  const { preferences } = useSettingsContext();

  const convertMinsToHoursAndMins = (totalMins) => {
    const hours = Math.floor(totalMins / 60);
    const mins = totalMins % 60;

    if (hours > 0 && mins > 0) {
      return `${hours}hr ${mins}m`;
    } else if (hours > 0) {
      return `${hours}hr`;
    } else if (mins > 0) {
      return `${mins}m`;
    } else {
      return '0m';
    }
  };

  const stats = [
    {
      id: 'sessions-done',
      icon: Target,
      label: 'SESSIONS DONE',
      value: sessionLoading
        ? '-'
        : `${totalFocusSessions} / ${preferences.dailyGoal}`,
      color: 'text-blue-400',
    },
    {
      id: 'time-spent',
      icon: BookOpenText,
      label: 'DEEP WORK',
      value: sessionLoading
        ? '-'
        : convertMinsToHoursAndMins(totalDeepWorkMins),
      color: 'text-orange-400',
    },
    {
      // Replace with something better later
      id: 'tasks-completed',
      icon: ClipboardList,
      label: 'TASKS COMPLETED',
      value: taskLoading ? '-' : completedTasksToday,
      color: 'text-green-400',
    },
  ];

  return (
    <article
      className={`${MODES[mode]} flex flex-col h-full w-full bg-surface-1/50 rounded-2xl p-6 border border-surface-2`}
    >
      <header className="mb-6">
        <h2 className="font-timer text-neon-focus text-xl uppercase drop-shadow-neon-focus break:text-neon-break break:drop-shadow-neon-break">
          Daily Insight
        </h2>
      </header>
      <div className="flex flex-col h-full justify-between gap-4">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="flex items-center gap-3 p-3 rounded-xl bg-surface-2/50 hover:bg-surface-2 transition-colors"
          >
            <div
              className={`p-2 rounded-lg bg-primary-dark/40 ${stat.color} shrink-0`}
            >
              <stat.icon size={20} strokeWidth={2.5} />
            </div>
            <p className="text-sm text-text-muted font-medium">{stat.label}</p>
            <p className="ml-auto font-timer text-lg text-text-base">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
};

export default QuickStats;
