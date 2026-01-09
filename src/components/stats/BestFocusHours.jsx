import { useModeContext } from '../../context/ModeContext';
import { MODES } from '../../services/utils/constants';
import FocusHoursChart from '../charts/FocusHoursChart';
import { getBestFocusHours } from '../../services/api/analytics.api';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { Hourglass } from 'lucide-react';

const BestFocusHours = () => {
  const { mode } = useModeContext();
  const { status, accessToken } = useAuthContext();

  const [focusHoursData, setFocusHoursData] = useState(null);
  const prevDays = 14;

  useEffect(() => {
    if (status !== 'authenticated') return;

    const fetchConsistency = async () => {
      try {
        const res = await getBestFocusHours(prevDays, accessToken);
        setFocusHoursData(res);
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
        <div className="flex items-center h-[38px] gap-3">
          <Hourglass size={20} className="text-text-base/80" />
          <h2 className="font-timer text-neon-focus text-xl uppercase drop-shadow-neon-focus break:text-neon-break break:drop-shadow-neon-break">
            Best Focus Hours
          </h2>
        </div>
      </header>

      {/* chart here */}
      <FocusHoursChart data={focusHoursData} mode={mode} />
    </article>
  );
};

export default BestFocusHours;
