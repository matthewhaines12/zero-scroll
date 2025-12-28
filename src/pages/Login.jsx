import { MODES } from '../services/utils/constants';
import { useModeContext } from '../context/ModeContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const { mode } = useModeContext();
  const { login } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await login({ email, password });
      navigate('/');
      console.log('Congrats login');
    } catch (err) {
      console.error(err);
      alert('Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) return;

  return (
    <main
      className={`${MODES[mode]} flex flex-col gap-2 items-center min-h-screen justify-center w-full p-8`}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-8 w-120 bg-surface-1/50 p-8 rounded-2xl"
      >
        <h2 className="mx-auto mb-4 font-timer text-neon-focus text-3xl uppercase drop-shadow-neon-focus break:text-neon-break break:drop-shadow-neon-break">
          LOGIN
        </h2>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          className="bg-surface-2 rounded-2xl px-4 py-3 w-full outline-none
              border border-transparent focus:border-neon-focus/50 focus:shadow-neon-glow-focus-small
              placeholder:text-text-muted transition-all break:focus:border-neon-break/50 focus:break:shadow-neon-glow-break-small"
          placeholder="Enter your email"
        />
        <div className="relative mb-4">
          <input
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            className="bg-surface-2 rounded-2xl px-4 py-3 w-full outline-none
                border border-transparent focus:border-neon-focus/50 focus:shadow-neon-glow-focus-small
                placeholder:text-text-muted transition-all break:focus:border-neon-break/50 focus:break:shadow-neon-glow-break-small pr-12"
            placeholder="Enter your password"
          />
          <button
            type="button"
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
          {isSubmitting ? 'LOGGING IN...' : 'LOGIN'}
        </button>

        <p className="text-text-muted">
          Need an account?{' '}
          <NavLink
            to={'/signup'}
            className="text-text-base font-semibold hover:opacity-85 cursor-pointer"
          >
            Create account
          </NavLink>
        </p>
      </form>
    </main>
  );
};

export default Login;
