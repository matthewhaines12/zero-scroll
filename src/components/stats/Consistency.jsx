import { useModeContext } from '../../context/ModeContext';
import { MODES } from '../../services/utils/constants';
import ConsistencyChart from '../charts/ConsistencyChart';
import PrevDaysToggle from './PrevDaysToggle';
import { getFocusConsistency } from '../../services/api/analytics.api';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { Repeat, Loader2 } from 'lucide-react';

const Consistency = () => {
  const { mode } = useModeContext();
  const { status, accessToken } = useAuthContext();

  const [prevDays, setPrevDays] = useState(14);
  const [consistencyData, setConsistencyData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status !== 'authenticated') return;

    const fetchConsistency = async () => {
      setLoading(true);
      try {
        const res = await getFocusConsistency(prevDays);
        setConsistencyData(res);
      } catch (err) {
        // Silently handle error
      } finally {
        setLoading(false);
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
        {loading ? (
          <Loader2 className="w-8 h-8 animate-spin text-neon-focus" />
        ) : (
          <ConsistencyChart data={consistencyData} mode={mode} />
        )}
      </div>
    </article>
  );
};

export default Consistency;
