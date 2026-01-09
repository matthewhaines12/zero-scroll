// When do I foucs best hours? Consistency past 7 days (14, 30), completed sessions vs ended early vs counts towards stats min;
import Consistency from '../components/stats/Consistency';
import BestFocusHours from '../components/stats/BestFocusHours';

const Analytics = () => {
  return (
    <main className="min-h-screen p-4 md:p-8 flex flex-col gap-4 md:gap-6 lg:h-dvh lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:auto-rows-fr overflow-y-auto custom-scrollbar">
      <Consistency />
      <BestFocusHours />
      <div className="border-2"></div>
      <div className="border-2"></div>
    </main>
  );
};

export default Analytics;
