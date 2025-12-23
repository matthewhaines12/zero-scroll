import Tasks from '../components/tasks/Tasks';
import FocusTimer from '../components/timer/FocusTimer';
import AudioSlider from '../components/audio/AudioSlider';
import QuickStats from '../components/stats/QuickStats';

const FocusHub = () => {
  return (
    <main className="min-h-screen p-4 md:p-8 flex flex-col gap-4 md:gap-6 lg:h-screen lg:max-h-screen lg:grid lg:grid-cols-[1fr_1.2fr_0.8fr] lg:overflow-hidden">
      <Tasks />
      <FocusTimer />
      <section className="flex flex-col gap-6 min-h-0">
        <AudioSlider />
        <QuickStats />
      </section>
    </main>
  );
};

export default FocusHub;
