import { X } from 'lucide-react';
import { useSettingsContext } from '../../context/SettingsContext';

const TimerSettings = ({ onClose }) => {
  const { timerSettings, setTimerSettings } = useSettingsContext();

  const handleApplySettings = (e) => {
    e.preventDefault();

    console.log('submit clicked');
    console.log(timerSettings);
    onClose();
  };

  const handleSettingChange = (key, value) => {
    const newValue = value;

    setTimerSettings((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        value: newValue,
      },
    }));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-text-base/90 font-bold">Session Settings</h2>

        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-surface-1/40 cursor-pointer"
        >
          <X size={22} />
        </button>
      </div>

      <form onSubmit={handleApplySettings} className="flex flex-col gap-2">
        <div className="flex flex-col gap-4">
          {Object.entries(timerSettings).map(([key, setting]) => (
            <div key={key} className="flex justify-between items-center ">
              <label className="text-sm text-text-muted font-bold">{key}</label>
              <div className="flex items-center bg-surface-1 rounded-xl px-2 py-1 gap-1">
                <input
                  type="text"
                  inputMode="numeric"
                  required
                  value={setting.value}
                  placeholder={setting.value}
                  minLength={1}
                  maxLength={2}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                  }}
                  onChange={(e) => handleSettingChange(key, e.target.value)}
                  className="bg-transparent w-10 text-center font-bold outline-none"
                />
                <span className="text-sm text-text-muted">{setting.unit}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => onClose()}
            className="bg-primary-dark uppercase text-sm font-bold self-center px-4 py-2 rounded-2xl hover:opacity-85 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-text-base text-black uppercase text-sm font-bold self-center px-4 py-2 rounded-2xl hover:opacity-85 cursor-pointer"
          >
            Apply Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default TimerSettings;
