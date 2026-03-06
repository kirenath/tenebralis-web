"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/services/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#EBF0FA] selection:bg-black/10">
      {/* Refined Ethereal Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Soft, diffuse gradient orbs */}
        <div className="absolute top-[10%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-[#DCE6FB] blur-[100px] opacity-70 animate-pulse-slow" />
        <div className="absolute bottom-[0%] right-[10%] w-[70vw] h-[70vw] rounded-full bg-[#F3EAFD] blur-[120px] opacity-60 animate-pulse-slow" style={{ animationDelay: '2s' }} />
        {/* High frequency subtle noise overlay to add texture (optional but adds premium feel) */}
        <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Spring-like ease out
        className="relative z-10 w-full max-w-sm px-4"
      >
        {/* Abstract/Minimal Logo Area */}
        <div className="text-center space-y-4 mb-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto w-16 h-16 rounded-[1.25rem] bg-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-2xl border border-white/60 flex items-center justify-center mb-6"
          >
            <Lock className="w-6 h-6 text-slate-800" strokeWidth={1.5} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-[28px] font-semibold tracking-tight text-slate-900"
          >
            界影浮光
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-[13px] font-medium tracking-[0.1em] uppercase text-slate-500/80"
          >
            Tenebralis Dream System
          </motion.p>
        </div>

        {/* Vision Pro Style Glass Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[2.5rem] bg-white/30 backdrop-blur-[40px] shadow-[0_8px_32px_0_rgba(150,150,165,0.15)] overflow-hidden"
        >
          {/* Subtle 1px inner border for depth */}
          <div className="absolute inset-0 rounded-[2.5rem] border-[0.5px] border-white/60 pointer-events-none" />
          {/* Ultra soft top gradient for reflection */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/30 to-transparent pointer-events-none rounded-t-[2.5rem]" />
          
          <form onSubmit={handleLogin} className="relative z-10 p-8 sm:p-10 space-y-7">
            
            {/* Input Group */}
            <div className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="email" className="text-[13px] font-medium text-slate-600/90 pl-1">
                  账号验证
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400 group-focus-within:text-slate-700 transition-colors duration-300" strokeWidth={1.5} />
                  <input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-[52px] pl-[42px] pr-4 rounded-2xl bg-white/40 border border-white/30 text-slate-800 placeholder:text-slate-400/80 text-[15px] focus:outline-none focus:bg-white/60 focus:border-white/80 focus:ring-4 focus:ring-black/5 transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center pr-1">
                  <label htmlFor="password" className="text-[13px] font-medium text-slate-600/90 pl-1">
                    访问密钥
                  </label>
                  {/* Optional: Add a "Forgot Password" link here in the future */}
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400 group-focus-within:text-slate-700 transition-colors duration-300" strokeWidth={1.5} />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full h-[52px] pl-[42px] pr-12 rounded-2xl bg-white/40 border border-white/30 text-slate-800 placeholder:text-slate-400/80 text-[15px] focus:outline-none focus:bg-white/60 focus:border-white/80 focus:ring-4 focus:ring-black/5 transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] font-mono tracking-widest"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors duration-300"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-[18px] h-[18px]" strokeWidth={1.5} /> : <Eye className="w-[18px] h-[18px]" strokeWidth={1.5} />}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                className="overflow-hidden"
              >
                <div className="text-[13px] text-red-600 font-medium bg-red-50/50 backdrop-blur-md px-4 py-3 rounded-xl border border-red-100/50 flex items-center gap-2">
                  <div className="w-1 h-3 rounded-full bg-red-500 shrink-0" />
                  {error}
                </div>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="relative w-full h-[52px] mt-2 rounded-2xl bg-slate-900 text-white font-medium text-[15px] shadow-[0_8px_16px_-4px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.25)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none group overflow-hidden"
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              
              <div className="relative flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <Loader2 className="w-[18px] h-[18px] animate-spin text-white/80" />
                    <span className="text-white/90">正在连接...</span>
                  </>
                ) : (
                  <>
                    <span>解除锁定</span>
                    <ArrowRight className="w-[18px] h-[18px] text-white/70 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" strokeWidth={2} />
                  </>
                )}
              </div>
            </button>
          </form>
        </motion.div>

        {/* Minimal Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-10 text-center"
        >
          <p className="text-[14px] text-slate-500 font-medium">
            未注册系统终端？{" "}
            <Link
              href="/register"
              className="text-slate-900 transition-all hover:opacity-70 border-b border-slate-900/20 hover:border-slate-900/50 pb-0.5"
            >
              申请接入
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
