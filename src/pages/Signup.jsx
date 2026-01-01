import { MODES } from '../services/utils/constants';
import { useModeContext } from '../context/ModeContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

const Signup = () => {
  const { mode } = useModeContext();
  const { signup } = useAuthContext();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      setIsSubmitting(true);
      await signup({ username, email, password });
      navigate('/signup-success');
    } catch (err) {
      console.error(err);
      setErrorMessage(
        err.response?.data?.error || 'Signup failed. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return (
      <main className="flex items-center justify-center min-h-screen w-full">
        <article className="flex flex-col items-center justify-center gap-8 w-120 bg-surface-1/50 p-8 rounded-2xl border border-surface-2">
          <Loader2 className="w-16 h-16 text-neon-focus animate-spin" />
          <div className="text-center">
            <h1 className="font-timer text-neon-focus text-3xl uppercase drop-shadow-neon-focus mb-2">
              Creating Account
            </h1>
            <p className="text-text-muted text-sm">Please wait...</p>
          </div>
        </article>
      </main>
    );
  }

  return (
    <main
      className={`${MODES[mode]} flex flex-col gap-2 items-center min-h-screen justify-center w-full p-8`}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-8 w-120 bg-surface-1/50 p-8 rounded-2xl border border-surface-2"
      >
        <h2 className="mx-auto mb-4 font-timer text-neon-focus text-3xl uppercase drop-shadow-neon-focus break:text-neon-break break:drop-shadow-neon-break">
          SIGNUP
        </h2>

        {errorMessage && (
          <div className="border border-red-500 rounded-xl p-3 text-center">
            <p className="text-red-400 text-sm">{errorMessage}</p>
          </div>
        )}
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          name="username"
          className="bg-surface-2 rounded-2xl px-4 py-3 w-full outline-none
              border border-transparent focus:border-neon-focus/50 focus:shadow-neon-glow-focus-small
              placeholder:text-text-muted transition-all break:focus:border-neon-break/50 focus:break:shadow-neon-glow-break-small"
          placeholder="Create a username"
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          name="email"
          className="bg-surface-2 rounded-2xl px-4 py-3 w-full outline-none
              border border-transparent focus:border-neon-focus/50 focus:shadow-neon-glow-focus-small
              placeholder:text-text-muted transition-all break:focus:border-neon-break/50 focus:break:shadow-neon-glow-break-small"
          placeholder="Enter an email"
        />
        <div className="relative mb-4">
          <input
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            className="bg-surface-2 rounded-2xl px-4 py-3 w-full outline-none
                border border-transparent focus:border-neon-focus/50 focus:shadow-neon-glow-focus-small
                placeholder:text-text-muted transition-all break:focus:border-neon-break/50 focus:break:shadow-neon-glow-break-small pr-12"
            placeholder="Create a valid password"
          />
          <button
            type="button"
            name="password"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-base transition-colors cursor-pointer"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-surface-1 border border-neon-focus text-neon-focus px-4 py-3 text-xl font-bold rounded-2xl w-full cursor-pointer hover:opacity-85 break:border-neon-break break:text-neon-break"
        >
          {isSubmitting ? 'CREATING ACCOUNT...' : 'SIGNUP'}
        </button>

        <p className="text-text-muted">
          Already have an account?{' '}
          <NavLink
            to={'/login'}
            className="text-text-base font-semibold hover:opacity-85 cursor-pointer"
          >
            Login
          </NavLink>
        </p>
      </form>
    </main>
  );
};

export default Signup;
