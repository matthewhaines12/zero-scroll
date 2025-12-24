import { MODES } from '../services/utils/constants';
import { useModeContext } from '../context/ModeContext';
import { NavLink } from 'react-router-dom';

const Signup = () => {
  const { mode } = useModeContext();

  return (
    <main
      className={`${MODES[mode]} flex flex-col gap-2 items-center min-h-screen justify-center w-full p-8`}
    >
      <form className="flex flex-col gap-8 w-120 bg-surface-1/50 p-8 rounded-2xl">
        <h2 className="mx-auto mb-4 font-timer text-neon-focus text-3xl uppercase drop-shadow-neon-focus break:text-neon-break break:drop-shadow-neon-break">
          SIGNUP
        </h2>
        <input
          type="text"
          className="bg-surface-2 rounded-2xl px-4 py-3 w-full"
          placeholder="Create a username"
        />
        <input
          type="text"
          className="bg-surface-2 rounded-2xl px-4 py-3 w-full mb-4"
          placeholder="Enter an email"
        />
        <input
          type="text"
          className="bg-surface-2 rounded-2xl px-4 py-3 w-full mb-4"
          placeholder="Create a valid password"
        />

        <button className="bg-white text-primary-dark px-4 py-3 text-xl font-bold rounded-2xl w-full">
          CREATE ACCOUNT
        </button>

        <p className="text-text-muted">
          Already have an account?{' '}
          <NavLink
            to={'/login'}
            className="text-text-base hover:opacity-85 cursor-pointer"
          >
            Login
          </NavLink>
        </p>
      </form>
    </main>
  );
};

export default Signup;
