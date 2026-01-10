// // completed sessions vs ended early vs counts towards stats min;
// import Consistency from '../components/stats/Consistency';
// import BestFocusHours from '../components/stats/BestFocusHours';
// import SessionOutcomes from '../components/stats/SessionOutcomes';

// const Analytics = () => {
//   return (
//     <main className="min-h-screen p-4 md:p-8 flex flex-col gap-4 md:gap-6 lg:h-dvh lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:auto-rows-fr overflow-y-auto custom-scrollbar">
//       <Consistency />
//       <BestFocusHours />
//       <SessionOutcomes />
//       <div className="border-2"></div>
//     </main>
//   );
// };

// export default Analytics;

// completed sessions vs ended early vs counts towards stats min;
import Consistency from '../components/stats/Consistency';
import BestFocusHours from '../components/stats/BestFocusHours';
import SessionOutcomes from '../components/stats/SessionOutcomes';

const Analytics = () => {
  return (
    <main className="min-h-screen p-4 md:p-8 flex flex-col gap-4 md:gap-6 lg:h-dvh overflow-y-auto custom-scrollbar">
      <Consistency />
      <section className="flex gap-6">
        <BestFocusHours />
        <SessionOutcomes />
      </section>
    </main>
  );
};

export default Analytics;
