import { useModeContext } from '../../context/ModeContext';
import { MODES } from '../../services/utils/constants';

const QuickStats = () => {
  const { mode } = useModeContext();

  return (
    <article
      className={`${MODES[mode]} flex flex-col h-2/5 w-full bg-surface-1/50 rounded-2xl p-6 border border-surface-2`}
    >
      <header className="mb-6">
        <h2 className="font-timer text-neon-focus text-xl uppercase drop-shadow-neon-focus break:text-neon-break break:drop-shadow-neon-break">
          Quick Stats
        </h2>
        {/* <p className="text-text-muted text-xs mt-1">CURRENT SESSION</p> */}
      </header>
    </article>
  );
};

export default QuickStats;
