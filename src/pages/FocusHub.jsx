import Tasks from '../components/tasks/Tasks';
import TimerDisplay from '../components/timer/TimerDisplay';
import AudioSlider from '../components/audio/AudioSlider';
import QuickStats from '../components/stats/QuickStats';

const FocusHub = () => {
  return (
    <main className="h-screen p-8 grid grid-cols-[1fr_1.2fr_0.8fr] gap-6">
      <Tasks />
      <TimerDisplay />
      <section className="flex flex-col gap-6 ">
        <AudioSlider />
        <QuickStats />
      </section>
    </main>
  );
};

export default FocusHub;
