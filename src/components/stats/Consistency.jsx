import { useModeContext } from '../../context/ModeContext';
import { MODES } from '../../services/utils/constants';
import ConsistencyChart from '../charts/ConsistencyChart';
import PrevDaysToggle from './PrevDaysToggle';
import { getFocusConsistency } from '../../services/api/analytics.api';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { Repeat } from 'lucide-react';

const Consistency = () => {
  const { mode } = useModeContext();
  const { status, accessToken } = useAuthContext();

  const [prevDays, setPrevDays] = useState(14);
  const [consistencyData, setConsistencyData] = useState(null);

  useEffect(() => {
    if (status !== 'authenticated') return;

    const fetchConsistency = async () => {
      try {
        const res = await getFocusConsistency(prevDays);
        setConsistencyData(res);
      } catch (err) {
        // Silently handle error
      }
    };

    fetchConsistency();
  }, [prevDays]);

  return (
    <article
      className={`${MODES[mode]} flex flex-col h-full w-full bg-surface-1/50 rounded-2xl p-6 border border-surface-2`}
    >
      <header className="flex items-center justify-between mb-6 gap-2">
        <div className="flex items-center gap-3">
          <Repeat size={20} className="text-text-base/80" />
          <h2 className="font-timer text-neon-focus text-xl uppercase drop-shadow-neon-focus break:text-neon-break break:drop-shadow-neon-break">
            Daily Focus Minutes
          </h2>
        </div>
        <PrevDaysToggle value={prevDays} onChange={setPrevDays} />
      </header>

      {/* chart here */}
      <div className="flex-1 flex items-center justify-center min-h-0">
        <ConsistencyChart data={consistencyData} mode={mode} />
      </div>
    </article>
  );
};

export default Consistency;
