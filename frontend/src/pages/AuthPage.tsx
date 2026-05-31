import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { FileText } from 'lucide-react';

export default function AuthPage({ mode }: { mode: 'login' | 'register' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Only load GIS script if not already present
    const existingScript = document.getElementById('google-jssdk');
    if (existingScript) return;

    const script = document.createElement('script');
    script.id = 'google-jssdk';
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      const google = (window as any).google;
      if (google) {
        google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || "your-google-client-id.apps.googleusercontent.com",
          callback: handleGoogleCredentialResponse,
        });
        google.accounts.id.renderButton(
          document.getElementById("googleSignInButton"),
          { theme: "outline", size: "large", width: 384 }
        );
      }
    };
  }, []);

  const handleGoogleCredentialResponse = async (response: any) => {
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/google', { credential: response.credential });
      localStorage.setItem("token", res.data.access_token);
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.response?.data?.detail || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'register') {
        await api.post('/auth/register', { email, password, full_name: fullName });
      }
      
      const res = await api.post('/auth/login', new URLSearchParams({
        username: email,
        password: password,
      }), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      
      localStorage.setItem("token", res.data.access_token);
      if (mode === 'register') {
        window.location.href = '/';
      } else {
        window.location.href = '/dashboard';
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-white flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-indigo-100 p-3">
             <FileText className="h-8 w-8 text-indigo-600" />
          </div>
        </div>
        <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
          {mode === 'login' ? 'Welcome back' : 'Create your account'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {mode === 'login' ? 'Sign in to access your dashboard' : 'Join Resume Analysis and boost your ATS score'}
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-5" onSubmit={handleSubmit}>
          {error && <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-100 font-medium">{error}</div>}
          
          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
              <div className="mt-2">
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="block w-full rounded-lg border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                  placeholder="John Doe"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div className="mt-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-lg border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
              {mode === 'login' && (
                 <div className="text-sm">
                   <Link to="/forgot-password" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</Link>
                 </div>
              )}
            </div>
            <div className="mt-2">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-lg border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-lg bg-indigo-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition disabled:opacity-50 mt-4"
            >
              {loading ? 'Processing...' : (mode === 'login' ? 'Sign in' : 'Sign up')}
            </button>
          </div>
        </form>

        <div className="relative mt-8">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm font-medium">
            <span className="bg-white px-4 text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 flex flex-col space-y-3">
          <div id="googleSignInButton" className="flex justify-center"></div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-500">
          {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
          <Link to={mode === 'login' ? '/register' : '/login'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </Link>
        </p>
      </div>
    </div>
  );
}
