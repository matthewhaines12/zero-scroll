import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { Loader2, CheckCircle2 } from 'lucide-react';

const VerifyEmail = () => {
  const { verifyEmail } = useAuthContext();
  const [status, setStatus] = useState('verifying');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const emailToken = params.get('token');

  // console.log(emailToken);

  useEffect(() => {
    const verify = async () => {
      if (!emailToken) {
        setStatus('error');
        setErrorMessage('No verification token provided');
        return;
      }

      try {
        await verifyEmail(emailToken);
        setStatus('success');
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } catch (err) {
        setStatus('error');
        setErrorMessage(
          err.response?.data?.error ||
            'Verification failed. The link may be expired or invalid.'
        );
      }
    };

    verify();
  }, [emailToken, verifyEmail]);

  return (
    <main className="flex items-center justify-center min-h-screen w-full">
      <article className="flex flex-col items-center justify-center p-8 gap-8 w-120 bg-surface-1/50 rounded-2xl border border-surface-2">
        {status === 'verifying' && (
          <>
            <Loader2 className="w-16 h-16 text-neon-focus animate-spin" />
            <div className="text-center">
              <h1 className="font-timer text-neon-focus text-3xl uppercase drop-shadow-neon-focus mb-4">
                Verifying Email
              </h1>
              <p className="text-text-muted text-sm">Please wait...</p>
            </div>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="text-center">
              <h1 className="font-timer text-neon-break text-3xl uppercase drop-shadow-neon-break mb-4">
                Email Verified!
              </h1>
              <p className="text-text-muted text-sm">Redirecting to login...</p>
            </div>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="text-center">
              <h1 className="font-timer text-priority-high text-3xl uppercase drop-shadow-neon-glow-high mb-4">
                Verification Failed
              </h1>
              <p className="text-text-muted text-sm mb-6">{errorMessage}</p>

              <button
                onClick={() => navigate('/login')}
                className="px-6 py-2 bg-surface-2 border border-text-base rounded-xl hover:opacity-85 cursor-pointer"
              >
                Go to Login
              </button>
            </div>
          </>
        )}
      </article>
    </main>
  );
};

export default VerifyEmail;
