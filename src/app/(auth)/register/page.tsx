"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Mail, Lock, ShieldCheck, ArrowRight, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/services/supabase/client";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // OTP verification state
  const [step, setStep] = useState<"register" | "verify">("register");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  async function handleRegister(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("密钥不一致，请重新确认");
      return;
    }

    if (password.length < 8) {
      setError("出于安全协议，密钥至少需要 8 位");
      return;
    }

    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
      setError("密钥需包含大小写字母、数字及特殊符号的组合");
      return;
    }

    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setStep("verify");
      setLoading(false);
    }
  }

  function handleOtpChange(index: number, value: string) {
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleOtpKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handleOtpPaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("");
      setOtp(digits);
      inputRefs.current[5]?.focus();
    }
  }

  async function handleVerify(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const code = otp.join("");
    if (code.length !== 6) {
      setError("输入序列不完整");
      return;
    }

    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: "email",
    });

    if (error) {
      setError("验证协议失败：" + error.message);
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
        <div className="absolute top-[10%] right-[20%] w-[60vw] h-[60vw] rounded-full bg-[#DCE6FB] blur-[100px] opacity-70 animate-pulse-slow" />
        <div className="absolute bottom-[0%] left-[10%] w-[70vw] h-[70vw] rounded-full bg-[#F3EAFD] blur-[120px] opacity-60 animate-pulse-slow" style={{ animationDelay: '3s' }} />
        <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-sm px-4">
        <AnimatePresence mode="wait">
          {step === "register" ? (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -20, filter: "blur(4px)", transition: { duration: 0.3 } }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Abstract/Minimal Logo Area */}
              <div className="text-center space-y-4 mb-10">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="mx-auto w-16 h-16 rounded-[1.25rem] bg-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-2xl border border-white/60 flex items-center justify-center mb-6"
                >
                  <ShieldCheck className="w-6 h-6 text-slate-800" strokeWidth={1.5} />
                </motion.div>
                <h1 className="text-[28px] font-semibold tracking-tight text-slate-900">
                  权限申请
                </h1>
                <p className="text-[13px] font-medium tracking-[0.05em] text-slate-500/80">
                  注册 Tenebralis 终端节点
                </p>
              </div>

              {/* Vision Pro Style Glass Panel */}
              <div className="relative rounded-[2.5rem] bg-white/30 backdrop-blur-[40px] shadow-[0_8px_32px_0_rgba(150,150,165,0.15)] overflow-hidden">
                <div className="absolute inset-0 rounded-[2.5rem] border-[0.5px] border-white/60 pointer-events-none" />
                <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/30 to-transparent pointer-events-none rounded-t-[2.5rem]" />
                
                <form onSubmit={handleRegister} className="relative z-10 p-8 sm:p-10 space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-[13px] font-medium text-slate-600/90 pl-1">
                        通信地址
                      </label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400 group-focus-within:text-slate-700 transition-colors duration-300" strokeWidth={1.5} />
                        <input
                          id="email"
                          type="email"
                          placeholder="node@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full h-[52px] pl-[42px] pr-4 rounded-2xl bg-white/40 border border-white/30 text-slate-800 placeholder:text-slate-400/80 text-[15px] focus:outline-none focus:bg-white/60 focus:border-white/80 focus:ring-4 focus:ring-black/5 transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="password" className="text-[13px] font-medium text-slate-600/90 pl-1">
                        设置安全密钥
                      </label>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400 group-focus-within:text-slate-700 transition-colors duration-300" strokeWidth={1.5} />
                        <input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="至少 8 位，含大小写、数字及符号"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="w-full h-[52px] pl-[42px] pr-12 rounded-2xl bg-white/40 border border-white/30 text-slate-800 placeholder:text-slate-400/80 text-[13px] focus:outline-none focus:bg-white/60 focus:border-white/80 focus:ring-4 focus:ring-black/5 transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] font-mono tracking-widest"
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

                    <div className="space-y-2">
                      <label htmlFor="confirmPassword" className="text-[13px] font-medium text-slate-600/90 pl-1">
                        确认安全密钥
                      </label>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400 group-focus-within:text-slate-700 transition-colors duration-300" strokeWidth={1.5} />
                        <input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="再次输入密钥"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          className="w-full h-[52px] pl-[42px] pr-12 rounded-2xl bg-white/40 border border-white/30 text-slate-800 placeholder:text-slate-400/80 text-[13px] focus:outline-none focus:bg-white/60 focus:border-white/80 focus:ring-4 focus:ring-black/5 transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] font-mono tracking-widest"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors duration-300"
                          tabIndex={-1}
                        >
                          {showConfirmPassword ? <EyeOff className="w-[18px] h-[18px]" strokeWidth={1.5} /> : <Eye className="w-[18px] h-[18px]" strokeWidth={1.5} />}
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
                    className="relative w-full h-[52px] mt-4 rounded-2xl bg-slate-900 text-white font-medium text-[15px] shadow-[0_8px_16px_-4px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.25)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                    <div className="relative flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <Loader2 className="w-[18px] h-[18px] animate-spin text-white/80" />
                          <span className="text-white/90">正在建立连接...</span>
                        </>
                      ) : (
                        <>
                          <span>发出申请</span>
                          <ArrowRight className="w-[18px] h-[18px] text-white/70 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" strokeWidth={2} />
                        </>
                      )}
                    </div>
                  </button>
                </form>
              </div>

              {/* Minimal Footer */}
              <div className="mt-10 text-center">
                <p className="text-[14px] text-slate-500 font-medium">
                  已有终端权限？{" "}
                  <Link
                    href="/login"
                    className="text-slate-900 transition-all hover:opacity-70 border-b border-slate-900/20 hover:border-slate-900/50 pb-0.5"
                  >
                    直接连接
                  </Link>
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="verify"
              initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: 20, filter: "blur(4px)", transition: { duration: 0.3 } }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Header */}
              <div className="text-center space-y-3 mb-8">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="mx-auto w-16 h-16 rounded-[1.25rem] bg-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-2xl border border-white/60 flex items-center justify-center mb-6"
                >
                  <Mail className="w-6 h-6 text-slate-800" strokeWidth={1.5} />
                </motion.div>
                <h1 className="text-[28px] font-semibold tracking-tight text-slate-900">
                  频段校验
                </h1>
                <p className="text-[13px] font-medium tracking-[0.05em] text-slate-500/80 px-4">
                  验证序列已发送至 <span className="text-slate-800 font-semibold">{email}</span>
                </p>
              </div>

              {/* Vision Pro Style Glass Panel (Verify) */}
              <div className="relative rounded-[2.5rem] bg-white/30 backdrop-blur-[40px] shadow-[0_8px_32px_0_rgba(150,150,165,0.15)] overflow-hidden">
                <div className="absolute inset-0 rounded-[2.5rem] border-[0.5px] border-white/60 pointer-events-none" />
                <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/30 to-transparent pointer-events-none rounded-t-[2.5rem]" />
                
                <form onSubmit={handleVerify} className="relative z-10 p-8 sm:p-10 space-y-8">
                  <div className="space-y-6">
                    <label className="text-[13px] font-medium text-slate-600/90 block text-center">
                      输入 6 位系统序列
                    </label>
                    <div className="flex justify-between gap-2" onPaste={handleOtpPaste}>
                      {otp.map((digit, index) => (
                        <motion.input
                          key={index}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                          ref={(el) => { inputRefs.current[index] = el; }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          className="flex h-12 w-10 sm:h-14 sm:w-12 items-center justify-center rounded-[14px] bg-white/50 border border-white/40 text-center text-xl font-bold text-slate-900 transition-all duration-300 focus:outline-none focus:bg-white focus:border-white focus:ring-4 focus:ring-black/5 focus:-translate-y-1 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] hover:bg-white/70 selection:bg-transparent"
                        />
                      ))}
                    </div>
                  </div>

                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                      className="overflow-hidden"
                    >
                      <div className="text-[13px] text-red-600 font-medium bg-red-50/50 backdrop-blur-md px-4 py-3 rounded-xl border border-red-100/50 flex items-center justify-center gap-2">
                        {error}
                      </div>
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={loading || otp.join("").length !== 6}
                    className="relative w-full h-[52px] rounded-2xl bg-slate-900 text-white font-medium text-[15px] shadow-[0_8px_16px_-4px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.25)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                    <div className="relative flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <Loader2 className="w-[18px] h-[18px] animate-spin text-white/80" />
                          <span className="text-white/90">正在校验协议...</span>
                        </>
                      ) : (
                        <>
                          <span>激活终端</span>
                          <Lock className="w-4 h-4 ml-1 text-white/70 group-hover:text-white transition-colors" strokeWidth={2} />
                        </>
                      )}
                    </div>
                  </button>
                </form>
              </div>

              {/* Minimal Footer */}
              <div className="mt-10 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setStep("register");
                    setOtp(["", "", "", "", "", ""]);
                    setError(null);
                  }}
                  className="inline-flex items-center text-[14px] font-medium text-slate-500 hover:text-slate-900 transition-colors group border-b border-transparent hover:border-slate-900/20 pb-0.5"
                >
                  <ArrowLeft className="w-4 h-4 mr-1.5 group-hover:-translate-x-1 transition-transform" />
                  修改通信地址
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
