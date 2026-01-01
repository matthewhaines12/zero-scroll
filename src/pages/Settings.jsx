import { useAuthContext } from '../context/AuthContext';
import { formatDateOnly } from '../services/utils/formateDate';

const Settings = () => {
  const { user, logout, deleteAccount } = useAuthContext();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const handleDeleteAccount = async () => {
    if (
      confirm(
        'Are you sure you want to delete your account? This cannot be undone.'
      )
    ) {
      try {
        await deleteAccount();
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen w-full p-8">
      <article className="flex flex-col gap-8 max-w-2xl w-full bg-surface-1/50 p-8 rounded-2xl border border-surface-2">
        <header className="text-center">
          <h1 className="font-timer text-neon-focus text-3xl uppercase drop-shadow-neon-focus mb-2">
            Settings
          </h1>
          <p className="text-text-muted text-sm">Configure your preferences</p>
        </header>

        {/* Account Settings */}
        <section className="flex flex-col gap-4 bg-surface-2/30 p-6 rounded-xl border border-surface-2">
          <h2 className="font-timer text-lg uppercase text-neon-focus drop-shadow-neon-focus">
            Account
          </h2>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center py-2">
              <span className="text-text-muted text-sm">Username</span>
              <span className="text-text-base">{user.username}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-text-muted text-sm">Email</span>
              <span className="text-text-base">{user.email}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-text-muted text-sm">Member Since</span>
              <span className="text-text-base">
                {formatDateOnly(user.createdAt)}
              </span>
            </div>
          </div>
        </section>

        {/* Preferences */}
        <section className="flex flex-col gap-4 bg-surface-2/30 p-6 rounded-xl border border-surface-2">
          <h2 className="font-timer text-lg uppercase text-neon-focus drop-shadow-neon-focus">
            Preferences
          </h2>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-text-base font-semibold">Sound Effects</p>
                <p className="text-text-muted text-xs">
                  Play sounds when timer ends
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-surface-1 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-text-muted after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-focus peer-checked:after:bg-white"></div>
              </label>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-text-base font-semibold">Notifications</p>
                <p className="text-text-muted text-xs">
                  Desktop notifications for breaks
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-surface-1 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-text-muted after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-focus peer-checked:after:bg-white"></div>
              </label>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-text-base font-semibold">
                  Auto Start Breaks
                </p>
                <p className="text-text-muted text-xs">
                  Automatically start break timer
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-surface-1 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-text-muted after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-focus peer-checked:after:bg-white"></div>
              </label>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="flex flex-col gap-4 bg-surface-2/30 p-6 rounded-xl border border-surface-2">
          <h2 className="font-timer text-lg uppercase text-neon-focus drop-shadow-neon-focus">
            Statistics
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1 p-4 bg-surface-1 rounded-lg">
              <span className="text-text-muted text-xs uppercase">
                Total Sessions
              </span>
              <span className="font-timer text-2xl text-neon-focus">127</span>
            </div>
            <div className="flex flex-col gap-1 p-4 bg-surface-1 rounded-lg">
              <span className="text-text-muted text-xs uppercase">
                Total Time
              </span>
              <span className="font-timer text-2xl text-neon-focus">42h</span>
            </div>
            <div className="flex flex-col gap-1 p-4 bg-surface-1 rounded-lg">
              <span className="text-text-muted text-xs uppercase">
                Tasks Done
              </span>
              <span className="font-timer text-2xl text-neon-focus">89</span>
            </div>
            <div className="flex flex-col gap-1 p-4 bg-surface-1 rounded-lg">
              <span className="text-text-muted text-xs uppercase">Streak</span>
              <span className="font-timer text-2xl text-neon-focus">7d</span>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="flex flex-col gap-4 p-6 bg-red-500/10 rounded-xl border border-red-500/50">
          <h2 className="font-timer text-lg uppercase text-red-400 mb-2">
            Danger Zone
          </h2>
          <div className="flex flex-col gap-4">
            <button
              onClick={handleLogout}
              className="w-full font-bold px-4 py-3 bg-surface-1 border border-text-base rounded-xl hover:opacity-85 transition-opacity cursor-pointer"
            >
              Logout
            </button>
            <button
              onClick={handleDeleteAccount}
              className="w-full font-bold px-4 py-3 bg-red-500/10 border border-red-500 rounded-xl hover:opacity-85 transition-opacity cursor-pointer"
            >
              Delete Account
            </button>
          </div>
        </section>
      </article>
    </main>
  );
};

export default Settings;
