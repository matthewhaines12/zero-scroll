import { useModeContext } from '../../context/ModeContext';
import { MODES } from '../../services/utils/constants';
import FocusHoursChart from '../charts/FocusHoursChart';
import PrevDaysToggle from './PrevDaysToggle';
import { getBestFocusHours } from '../../services/api/analytics.api';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { Hourglass, Loader2 } from 'lucide-react';

const BestFocusHours = () => {
  const { mode } = useModeContext();
  const { status, accessToken } = useAuthContext();

  const [focusHoursData, setFocusHoursData] = useState(null);
  const [prevDays, setPrevDays] = useState(14);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status !== 'authenticated') return;

    const fetchBestFocusHours = async () => {
      setLoading(true);
      try {
        const res = await getBestFocusHours(prevDays);
        setFocusHoursData(res);
      } catch (err) {
        // Silently handle error
      } finally {
        setLoading(false);
      }
    };

    fetchBestFocusHours();
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
        <PrevDaysToggle value={prevDays} onChange={setPrevDays} />
      </header>

      {/* chart here */}
      {loading ? (
        <div className="flex items-center justify-center w-full h-[250px]">
          <Loader2 className="w-8 h-8 animate-spin text-neon-focus" />
        </div>
      ) : (
        <FocusHoursChart data={focusHoursData} mode={mode} />
      )}
    </article>
  );
};

export default BestFocusHours;
