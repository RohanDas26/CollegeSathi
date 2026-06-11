'use client';
import Link from 'next/link';
import { EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';

export default function AuthPage() {
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Signed in successfully!');
  };

  const handleOAuth = (provider: string) => {
    // Direct redirect to NextAuth provider endpoint
    window.location.href = `/api/auth/signin/${provider.toLowerCase()}?callbackUrl=${encodeURIComponent('/')}`;
  };

  const handleAction = (action: string) => {
    toast.success(`${action} flow initiated`);
  };

  return (
    <div className="flex h-[calc(100vh-64px)]">
      
      {/* Left Side */}
      <div className="w-1/2 relative hidden lg:block bg-slate-900">
        <img 
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop" 
          alt="Students throwing caps"
          className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
        
        <div className="absolute top-8 left-8 flex items-center gap-3 z-10">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30">
            <svg className="w-5 h-5 text-white fill-white" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          </div>
          <span className="text-xl font-bold text-white tracking-tight">College Sathi</span>
        </div>
        
        <div className="absolute inset-0 p-12 flex flex-col justify-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold text-white leading-tight mb-6 tracking-tight">
              Discover Your <br />
              <span className="text-blue-300">Perfect College.</span>
            </h1>
            <p className="text-slate-200 text-lg leading-relaxed">
              Join thousands of students making data-driven decisions about their future education and career.
            </p>
          </div>
        </div>

        <div className="absolute bottom-12 left-12 flex items-center gap-4 text-xs text-slate-400 font-medium">
          <span>© 2026 College Sathi</span>
          <span>•</span>
          <button onClick={() => handleAction('Privacy Policy')} className="hover:text-white transition-colors">Privacy</button>
          <span>•</span>
          <button onClick={() => handleAction('Terms of Service')} className="hover:text-white transition-colors">Terms</button>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 bg-slate-50 flex items-center justify-center p-8">
        <div className="w-full max-w-[440px] bg-white rounded-[2rem] p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">Welcome back</h2>
            <p className="text-slate-500 text-sm">Please enter your details to sign in</p>
          </div>

          <form className="space-y-5" onSubmit={handleSignIn}>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Email address</label>
              <input 
                type="email" 
                placeholder="name@example.com"
                className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700">Password</label>
                <button type="button" onClick={() => handleAction('Password reset')} className="text-xs font-bold text-blue-600 hover:text-blue-700">Forgot password?</button>
              </div>
              <div className="relative">
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
                <button type="button" onClick={() => toast('Toggled password visibility', { icon: '👁️' })} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <EyeOff className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button type="submit" className="w-full bg-[#0f172a] hover:bg-slate-800 text-white font-bold py-3.5 rounded-lg transition-colors text-sm mt-2">
              Sign In
            </button>
          </form>

          <div className="my-8 flex items-center gap-4 before:h-px before:flex-1 before:bg-slate-100 after:h-px after:flex-1 after:bg-slate-100">
            <span className="text-xs text-slate-400 font-medium">Or continue with</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <button onClick={() => handleOAuth('Google')} className="flex items-center justify-center gap-2 border border-slate-200 rounded-lg py-2.5 hover:bg-slate-50 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              <span className="text-xs font-bold text-slate-700">Google</span>
            </button>
            <button onClick={() => handleOAuth('GitHub')} className="flex items-center justify-center gap-2 border border-slate-200 rounded-lg py-2.5 hover:bg-slate-50 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"></path></svg>
              <span className="text-xs font-bold text-slate-700">GitHub</span>
            </button>
          </div>

          <p className="text-center text-xs text-slate-500 font-medium">
            Don't have an account? <button onClick={() => handleAction('Sign up')} className="text-blue-600 font-bold hover:text-blue-700">Sign up</button>
          </p>

        </div>
      </div>

    </div>
  );
}
