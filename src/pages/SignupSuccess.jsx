import { NavLink } from 'react-router-dom';

const SignupSuccess = () => {
  return (
    <main className="flex items-center justify-center min-h-screen w-full p-8`">
      <article className="flex flex-col items-center justify-center gap-8 w-120 bg-surface-1/50 p-8 rounded-2xl border border-surface-2">
        <header className="flex flex-col gap-2 text-center mb-2">
          <h1 className="font-timer text-neon-focus text-3xl uppercase drop-shadow-neon-focus mb-2">
            Verify your email
          </h1>
          <p className="text-center text-sm text-text-muted">
            Thank you for creating an account!
          </p>
        </header>
        <p className="text-center">
          We've sent you a verification email. Please verify your account before
          logging in. Verification link expires in 10m.
        </p>
        <NavLink
          to={'/login'}
          className="px-6 py-2 bg-surface-1 border border-text-base rounded-xl hover:opacity-85 cursor-pointer"
        >
          Go to Login
        </NavLink>
      </article>
    </main>
  );
};

export default SignupSuccess;
