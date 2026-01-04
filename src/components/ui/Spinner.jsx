import { Loader2 } from 'lucide-react';

const Spinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <Loader2 className="w-16 h-16 animate-spin text-neon-focus" />
    </div>
  );
};

export default Spinner;
