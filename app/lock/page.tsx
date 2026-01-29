'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useReducedMotion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { PhoneFrame } from '@/components/phone'

export default function LockPage() {
  const router = useRouter()
  const supabase = createClient()
  
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [currentTime, setCurrentTime] = useState(new Date())

  const prefersReducedMotion = useReducedMotion()

  // Clock tick
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
  }

  const formatDate = (date: Date) => {
    const mm = String(date.getMonth() + 1).padStart(2, '0')
    const dd = String(date.getDate()).padStart(2, '0')
    const w = date.toLocaleDateString('en-US', { weekday: 'short' })
    return `${mm}/${dd} ${w}`
  }

  const decorations = useMemo(
    () => [
      { id: 'star-1', glyph: '✨', className: 'text-2xl', x: '10%', y: '18%', delay: 0.0 },
      { id: 'bow-1', glyph: '🎀', className: 'text-2xl', x: '78%', y: '14%', delay: 0.2 },
      { id: 'candy-1', glyph: '🍬', className: 'text-2xl', x: '85%', y: '70%', delay: 0.1 },
      { id: 'star-2', glyph: '✨', className: 'text-xl', x: '12%', y: '72%', delay: 0.35 },
      { id: 'bow-2', glyph: '🎀', className: 'text-xl', x: '18%', y: '86%', delay: 0.5 },
      { id: 'candy-2', glyph: '🍬', className: 'text-xl', x: '70%', y: '86%', delay: 0.65 },
    ],
    []
  )

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError('Authentication failed. Please check your credentials.')
      setLoading(false)
      return
    }

    router.push('/')
    router.refresh()
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      setLoading(false)
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setError('Sign up failed: ' + error.message)
      setLoading(false)
      return
    }

    // 注册成功后自动登录
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (loginError) {
      setError('Account created. Please verify your email, then sign in.')
      setMode('login')
      setLoading(false)
      return
    }

    router.push('/')
    router.refresh()
  }

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login')
    setError('')
    setPassword('')
    setConfirmPassword('')
  }

  return (
    <PhoneFrame>
        <div className="relative flex-1 overflow-hidden bg-[#FFF8F0] font-rounded [font-variant-numeric:tabular-nums]">
          <div className="font-dynapuff">
        {/* 软软的云朵/光晕背景 */}
        <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-pink-200/50 blur-3xl" />
          <div className="absolute top-20 right-[-80px] h-72 w-72 rounded-full bg-rose-200/50 blur-3xl" />
          <div className="absolute bottom-[-120px] left-1/3 h-80 w-80 rounded-full bg-pink-100/70 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(251,207,232,0.35),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(253,164,175,0.25),transparent_55%),radial-gradient(circle_at_55%_85%,rgba(253,230,138,0.18),transparent_55%)]" />
        </div>

        {/* 漂浮装饰：✨🎀🍬 */}
        <div className="pointer-events-none absolute inset-0">
          {decorations.map((d) => (
            <motion.div
              key={d.id}
              className={`absolute select-none drop-shadow-[0_8px_0_rgba(248,113,113,0.15)] ${d.className}`}
              style={{ left: d.x, top: d.y }}
              initial={prefersReducedMotion ? undefined : { y: 0, rotate: -4, opacity: 0.0 }}
              animate={
                prefersReducedMotion
                  ? { opacity: 0.9 }
                  : {
                      y: [0, -10, 0],
                      rotate: [-4, 4, -4],
                      opacity: [0.75, 1, 0.75],
                    }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : {
                      duration: 4.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: d.delay,
                    }
              }
              aria-hidden="true"
            >
              <span>{d.glyph}</span>
            </motion.div>
          ))}
        </div>

        {/* 内容区 */}
        <div className="relative z-10 flex h-full flex-col px-6 pb-8 pt-16">
          {/* 顶部：时间（像梦幻手账的小标题） */}
          <div className="mb-8 text-center">
            <div className="text-[68px] leading-none font-extralight tracking-tight text-amber-900/90 font-dynapuff">
              {formatTime(currentTime)}
            </div>
            <div className="mt-2 text-lg font-medium tracking-wide text-amber-900/70 font-dynapuff">
              {formatDate(currentTime)}
            </div>
          </div>

          {/* 魔法镜子卡片 */}
          <div className="mx-auto w-full max-w-sm flex flex-col items-center">
            <div
              className="relative w-full rounded-[36px] border-4 border-pink-300 bg-white/70 px-6 pb-6 pt-7
                shadow-[10px_12px_0_rgba(251,113,133,0.25)] backdrop-blur"
            >
              {/* 贴纸高光 */}
              <div className="pointer-events-none absolute top-4 right-5 h-16 w-16 rounded-full bg-pink-200/30 blur-xl" />

              <div className="text-center w-full flex flex-col items-center">
                <h1 className="text-lg font-semibold tracking-[0.18em] text-amber-900 font-dynapuff">
                  Tenebralis System
                </h1>

              </div>

              <form
                onSubmit={mode === 'login' ? handleLogin : handleRegister}
                className="mt-6 space-y-4"
              >
                {/* Email */}
                <div className="space-y-1.5">
                  <label className="px-1 text-sm font-bold tracking-[0.22em] text-amber-900/80">
                    Email
                  </label>
                  <motion.input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@example.com"
                    required
                    disabled={loading}
                    whileFocus={prefersReducedMotion ? undefined : { scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 520, damping: 18 }}
                    className="w-full rounded-full border-2 border-pink-200 bg-white px-5 py-3 text-sm text-amber-900
                      placeholder:text-pink-300/80 placeholder:font-semibold placeholder:tracking-[0.18em] shadow-[0_4px_0_rgba(251,113,133,0.15)]
                      focus:border-pink-400 focus:outline-none focus:ring-4 focus:ring-pink-200/50
                      disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>

                {/* Key */}
                <div className="space-y-1.5">
                  <label className="px-1 text-sm font-bold tracking-[0.22em] text-amber-900/80">
                    Key
                  </label>
                  <motion.input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your pact key"
                    required
                    disabled={loading}
                    whileFocus={prefersReducedMotion ? undefined : { scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 520, damping: 18 }}
                    className="w-full rounded-full border-2 border-pink-200 bg-white px-5 py-3 text-sm text-amber-900
                      placeholder:text-pink-300/80 placeholder:font-semibold placeholder:tracking-[0.18em] shadow-[0_4px_0_rgba(251,113,133,0.15)]
                      focus:border-pink-400 focus:outline-none focus:ring-4 focus:ring-pink-200/50
                      disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>

                {/* 确认密钥（仅注册） */}
                {mode === 'register' && (
                  <div className="space-y-1.5">
                    <label className="px-1 text-sm font-bold tracking-[0.22em] text-amber-900/80">
                      Confirm
                    </label>
                    <motion.input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter your pact key"
                      required
                      disabled={loading}
                      whileFocus={prefersReducedMotion ? undefined : { scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 520, damping: 18 }}
                      className="w-full rounded-full border-2 border-pink-200 bg-white px-5 py-3 text-sm text-amber-900
                        placeholder:text-pink-300/80 shadow-[0_4px_0_rgba(251,113,133,0.15)]
                        focus:border-pink-400 focus:outline-none focus:ring-4 focus:ring-pink-200/50
                        disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>
                )}

                {/* 错误提示（也做成小贴纸） */}
                {error && (
                  <div className="rounded-2xl border-2 border-rose-200 bg-rose-50 px-4 py-3 shadow-[0_4px_0_rgba(251,113,133,0.12)]">
                    <p className="text-center text-xs font-semibold tracking-wide text-rose-600">
                      {error}
                    </p>
                  </div>
                )}

                {/* 主按钮：爱心糖果 */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
                  className="group relative mt-2 w-full select-none rounded-[28px]
                    bg-gradient-to-r from-pink-300 to-rose-400 px-6 py-4 text-sm font-extrabold tracking-[0.2em]
                    text-white shadow-[0_10px_0_rgba(244,63,94,0.35)]
                    outline-none ring-offset-2 focus-visible:ring-4 focus-visible:ring-pink-200
                    disabled:cursor-not-allowed disabled:opacity-70"
                  aria-label={mode === 'login' ? 'Sign in' : 'Sign up'}
                >
                  {/* 果冻高光 */}
                  <span className="pointer-events-none absolute inset-0 rounded-[28px] bg-[linear-gradient(180deg,rgba(255,255,255,0.55),rgba(255,255,255,0)_55%)] opacity-70" />
                  <span className="relative inline-flex items-center justify-center gap-2">
                    <span className="text-base">❤</span>
                    <span>{loading ? 'Linking…' : mode === 'login' ? 'Sign In' : 'Sign Up'}</span>
                  </span>
                </motion.button>

                {/* 次级动作：切换登录/注册 */}
                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={switchMode}
                    disabled={loading}
                    className="text-xs font-semibold tracking-wider text-amber-900/60 underline decoration-pink-300/60 underline-offset-4
                      hover:text-amber-900 disabled:opacity-60"
                  >
                    {mode === 'login' ? "New here? Create an account" : 'Already have an account? Sign in'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* 底部小注 */}
          <div className="mt-auto pt-6 text-center">
            <p className="text-[11px] font-medium tracking-wider text-amber-900/45 font-dynapuff">
              2026 © TENEBRALIS SYSTEM
            </p>
          </div>
        </div>
      </div>
      </div>
    </PhoneFrame>
  )
}
