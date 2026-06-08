import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Eye, EyeOff, ArrowRight, Chrome, Github } from 'lucide-react';
import { useApp } from './AppContext';

interface AuthPageProps {
  onNavigate: (page: string) => void;
}

export function AuthPage({ onNavigate }: AuthPageProps) {
  const { login } = useApp();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (mode === 'signup' && !name.trim()) errs.name = 'Name is required';
    if (!email.includes('@')) errs.email = 'Valid email required';
    if (password.length < 6) errs.password = 'Password must be at least 6 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    login(email, mode === 'signup' ? name : email.split('@')[0]);
    setLoading(false);
    onNavigate('home');
  };

  return (
    <div className="min-h-screen bg-[#0c0c14] flex items-center justify-center px-4 py-12">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-indigo-500/[0.04] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <button onClick={() => onNavigate('home')} className="flex flex-col items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:bg-indigo-400 transition-all">
              <Star className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-white/50" style={{ fontSize: '13px' }}>CollegeIQ</span>
          </button>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#11111c]/80 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Tab switcher */}
          <div className="flex border-b border-white/[0.06]">
            {(['login', 'signup'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => { setMode(tab); setErrors({}); }}
                className={`flex-1 py-3.5 capitalize transition-all duration-150 relative ${
                  mode === tab ? 'text-white' : 'text-white/35 hover:text-white/55'
                }`}
                style={{ fontSize: '14px', fontWeight: 500 }}
              >
                {tab === 'login' ? 'Sign In' : 'Create Account'}
                {mode === tab && (
                  <motion.div
                    layoutId="authTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="p-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, x: mode === 'login' ? -8 : 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: mode === 'login' ? 8 : -8 }}
                transition={{ duration: 0.18 }}
              >
                <h2 className="text-white mb-1" style={{ fontSize: '20px', fontWeight: 600, letterSpacing: '-0.01em' }}>
                  {mode === 'login' ? 'Welcome back' : 'Create your account'}
                </h2>
                <p className="text-white/35 mb-6" style={{ fontSize: '13px' }}>
                  {mode === 'login'
                    ? 'Sign in to access your saved colleges and preferences'
                    : 'Join thousands of students discovering their perfect college'}
                </p>

                {/* Social buttons */}
                <div className="grid grid-cols-2 gap-2 mb-5">
                  {[
                    { icon: Chrome, label: 'Google' },
                    { icon: Github, label: 'GitHub' },
                  ].map(social => (
                    <button
                      key={social.label}
                      className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/60 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-150"
                      style={{ fontSize: '13px' }}
                    >
                      <social.icon className="w-4 h-4" />
                      {social.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3 mb-5">
                  <div className="flex-1 h-px bg-white/[0.06]" />
                  <span className="text-white/25" style={{ fontSize: '12px' }}>or continue with email</span>
                  <div className="flex-1 h-px bg-white/[0.06]" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === 'signup' && (
                    <div>
                      <label className="block text-white/50 mb-1.5" style={{ fontSize: '12px', fontWeight: 500 }}>Full Name</label>
                      <input
                        value={name}
                        onChange={e => { setName(e.target.value); setErrors(err => ({ ...err, name: '' })); }}
                        placeholder="Arjun Sharma"
                        className={`w-full bg-white/[0.04] border rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none transition-all duration-150 ${
                          errors.name ? 'border-red-500/50 focus:border-red-500/70' : 'border-white/[0.08] focus:border-indigo-500/50'
                        }`}
                        style={{ fontSize: '14px' }}
                      />
                      {errors.name && <p className="text-red-400 mt-1" style={{ fontSize: '11px' }}>{errors.name}</p>}
                    </div>
                  )}

                  <div>
                    <label className="block text-white/50 mb-1.5" style={{ fontSize: '12px', fontWeight: 500 }}>Email address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => { setEmail(e.target.value); setErrors(err => ({ ...err, email: '' })); }}
                      placeholder="arjun@example.com"
                      className={`w-full bg-white/[0.04] border rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none transition-all duration-150 ${
                        errors.email ? 'border-red-500/50 focus:border-red-500/70' : 'border-white/[0.08] focus:border-indigo-500/50'
                      }`}
                      style={{ fontSize: '14px' }}
                    />
                    {errors.email && <p className="text-red-400 mt-1" style={{ fontSize: '11px' }}>{errors.email}</p>}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-white/50" style={{ fontSize: '12px', fontWeight: 500 }}>Password</label>
                      {mode === 'login' && (
                        <button type="button" className="text-indigo-400 hover:text-indigo-300 transition-colors" style={{ fontSize: '12px' }}>
                          Forgot password?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={e => { setPassword(e.target.value); setErrors(err => ({ ...err, password: '' })); }}
                        placeholder="••••••••"
                        className={`w-full bg-white/[0.04] border rounded-xl px-4 py-3 pr-11 text-white placeholder-white/20 outline-none transition-all duration-150 ${
                          errors.password ? 'border-red-500/50 focus:border-red-500/70' : 'border-white/[0.08] focus:border-indigo-500/50'
                        }`}
                        style={{ fontSize: '14px' }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/55 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-400 mt-1" style={{ fontSize: '11px' }}>{errors.password}</p>}
                  </div>

                  {mode === 'signup' && (
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input type="checkbox" className="mt-0.5 accent-indigo-500" />
                      <span className="text-white/35" style={{ fontSize: '12px', lineHeight: '1.5' }}>
                        I agree to the{' '}
                        <button type="button" className="text-indigo-400 hover:text-indigo-300">Terms of Service</button>
                        {' '}and{' '}
                        <button type="button" className="text-indigo-400 hover:text-indigo-300">Privacy Policy</button>
                      </span>
                    </label>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white transition-all duration-150 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ fontSize: '14px', fontWeight: 500 }}
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        {mode === 'login' ? 'Sign In' : 'Create Account'}
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <p className="text-center text-white/25 mt-5" style={{ fontSize: '12px' }}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="text-indigo-400 hover:text-indigo-300 transition-colors">
            {mode === 'login' ? 'Sign up for free' : 'Sign in'}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
