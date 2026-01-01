import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <main className="flex items-center justify-center min-h-screen w-full`">
      <article className="flex flex-col items-center justify-center gap-8 w-120 p-8 bg-surface-1/50 rounded-2xl border border-surface-2">
        <h1 className="font-timer text-neon-focus text-5xl drop-shadow-neon-focus">
          404
        </h1>
        <h1 className="font-timer text-neon-focus text-3xl uppercase drop-shadow-neon-focus">
          PAGE NOT FOUND
        </h1>
        <p className="text-center text-sm text-text-muted mb-2">
          This is not the page you are looking for.
        </p>

        <Link
          to={'/login'}
          className="px-6 py-2 bg-surface-2 border border-text-base rounded-xl hover:opacity-85 cursor-pointer"
        >
          Go to Focus Hub
        </Link>
      </article>
    </main>
  );
};

export default NotFoundPage;
