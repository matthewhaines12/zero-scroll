import { X } from 'lucide-react';
import { DEFAULT_TIMER_SETTINGS } from '../../services/utils/constants';

const TimerSettings = ({ onClose }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-text-base/90 font-bold">Session Settings</h2>

        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-surface-1/40 cursor-pointer"
        >
          <X size={22} />
        </button>
      </div>

      <form className="flex flex-col gap-3">
        {Object.entries(DEFAULT_TIMER_SETTINGS).map(([key, setting]) => (
          <div key={key} className="flex justify-between items-center">
            <label className="text-sm text-text-muted font-bold">{key}</label>

            <div className="flex items-center bg-surface-1 rounded-xl px-2 py-1 gap-1">
              <input
                type="text"
                className="bg-transparent w-10 text-center font-bold outline-none"
                defaultValue={setting.value}
                placeholder={setting.value}
              />
              <span className="text-sm text-text-muted">{setting.unit}</span>
            </div>
          </div>
        ))}
      </form>

      <button
        className="bg-text-base text-black uppercase text-sm font-bold
                         self-center px-6 py-2 rounded-2xl hover:opacity-85 cursor-pointer"
      >
        Start Session
      </button>
    </div>
  );
};

export default TimerSettings;
