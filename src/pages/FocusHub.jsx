import Tasks from '../components/tasks/Tasks';
import FocusTimer from '../components/timer/FocusTimer';
import AudioSlider from '../components/audio/AudioSlider';
import QuickStats from '../components/stats/QuickStats';

const FocusHub = () => {
  return (
    <main className="min-h-screen p-4 md:p-8 flex flex-col gap-4 md:gap-6 lg:h-dvh lg:grid lg:grid-cols-[1fr_1.2fr_0.8fr] overflow-y-auto custom-scrollbar">
      <Tasks />
      <FocusTimer />
      <section className="flex flex-col gap-6 min-h-0">
        <div className="flex-5 min-h-0">
          <AudioSlider />
        </div>
        <div className="flex-4">
          <QuickStats />
        </div>
      </section>
    </main>
  );
};

export default FocusHub;
