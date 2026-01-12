import { useModeContext } from '../../context/ModeContext';
import { MODES } from '../../services/utils/constants';
import OutcomesChart from '../charts/OutcomesChart';
import PrevDaysToggle from './PrevDaysToggle';
import { getSessionOutcomes } from '../../services/api/analytics.api';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { PieChart } from 'lucide-react';

const SessionOutcomes = () => {
  const { mode } = useModeContext();
  const { status, accessToken } = useAuthContext();

  const [prevDays, setPrevDays] = useState(14);
  const [sessionOutcomesData, setSessionOutcomesData] = useState(null);

  useEffect(() => {
    if (status !== 'authenticated') return;

    const fetchSessionOutcomes = async () => {
      try {
        const res = await getSessionOutcomes(prevDays);
        setSessionOutcomesData(res);
      } catch (err) {
        console.error('Failed to fetch session outcomes data:', err);
      }
    };

    fetchSessionOutcomes();
  }, [prevDays]);

  return (
    <article
      className={`${MODES[mode]} flex flex-col h-full w-full bg-surface-1/50 rounded-2xl p-6 border border-surface-2`}
    >
      <header className="flex items-center justify-between mb-6 gap-2">
        <div className="flex items-center gap-3">
          <PieChart size={20} className="text-text-base/80" />
          <h2 className="font-timer text-neon-focus text-xl uppercase drop-shadow-neon-focus break:text-neon-break break:drop-shadow-neon-break">
            Session Outcomes
          </h2>
        </div>
        <PrevDaysToggle value={prevDays} onChange={setPrevDays} />
      </header>

      {/* chart here */}
      <div className="flex-1 flex items-center justify-center min-h-0">
        <OutcomesChart data={sessionOutcomesData} mode={mode} />
      </div>
    </article>
  );
};

export default SessionOutcomes;
