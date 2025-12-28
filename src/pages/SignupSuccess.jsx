import { NavLink } from 'react-router-dom';

const SignupSuccess = () => {
  return (
    <main className="flex items-center justify-center min-h-screen w-full p-8`">
      <article className="flex flex-col items-center justify-center gap-8 w-120 bg-surface-1/50 p-8 rounded-2xl">
        <h1 className="mx-auto mb-4 font-timer text-neon-focus text-3xl uppercase drop-shadow-neon-focus">
          Verify your email
        </h1>
        <p className="text-lg mb-2">
          We've sent you a verification email. Please verify your account before
          logging in.
        </p>
        <NavLink
          to={'/login'}
          className="text-text-base/80 text-xl font-semibold cursor-pointer hover:text-text-base transition-colors"
        >
          Go to Login
        </NavLink>
      </article>
    </main>
  );
};

export default SignupSuccess;
