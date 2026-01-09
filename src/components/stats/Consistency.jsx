import { useModeContext } from '../../context/ModeContext';
import { MODES } from '../../services/utils/constants';
import ConsistencyChart from '../charts/ConsistencyChart';
import ConsistencyToggle from './ConsistencyToggle';
import { getFocusConsistency } from '../../services/api/analytics.api';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext';

const Consistency = () => {
  const { mode } = useModeContext();
  const { status, accessToken } = useAuthContext();

  const [prevDays, setPrevDays] = useState(7);
  const [consistencyData, setConsistencyData] = useState(null);

  useEffect(() => {
    if (status !== 'authenticated') return;

    const fetchConsistency = async () => {
      try {
        const res = await getFocusConsistency(prevDays, accessToken);
        setConsistencyData(res);
      } catch (err) {
        console.error('Failed to fetch consistency data:', err);
      }
    };

    fetchConsistency();
  }, [prevDays]);

  return (
    <article
      className={`${MODES[mode]} flex flex-col h-full w-full bg-surface-1/50 rounded-2xl p-6 border border-surface-2`}
    >
      <header className="flex justify-between items-center gap-2 mb-6">
        <h2 className="font-timer text-neon-focus text-xl uppercase drop-shadow-neon-focus break:text-neon-break break:drop-shadow-neon-break">
          Daily Focus Minutes
        </h2>
        <ConsistencyToggle value={prevDays} onChange={setPrevDays} />
      </header>

      {/* chart here */}
      <div className="flex-1 flex items-center justify-center min-h-0">
        <ConsistencyChart data={consistencyData} mode={mode} />
      </div>
    </article>
  );
};

export default Consistency;
