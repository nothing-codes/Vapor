'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

interface AuthFormProps {
  mode: 'login' | 'register'
}

export default function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (mode === 'register') {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        router.push('/verify-email')
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        router.push('/')
      }
    } catch (err: any) {
      setError(err.message || 'Произошла ошибка')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl focus:border-white focus:outline-none text-white placeholder-white/50 backdrop-blur-sm"
          placeholder="Email"
        />
      </div>

      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl focus:border-white focus:outline-none text-white placeholder-white/50 backdrop-blur-sm"
          placeholder="Пароль"
        />
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500/50 text-white px-5 py-4 rounded-2xl backdrop-blur-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-white text-purple-600 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105 disabled:opacity-50 btn-ripple"
      >
        {loading ? 'Загрузка...' : mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
      </button>
    </form>
  )
}
