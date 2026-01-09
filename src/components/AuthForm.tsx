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
  const [success, setSuccess] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      if (mode === 'register') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        })
        if (error) throw error
        router.push('/verify-email')
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
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
        <label htmlFor="email" className="block text-sm font-bold mb-2 text-gray-300">
          📧 Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-4 bg-vapor-dark/50 border-2 border-gray-600 rounded-xl focus:border-vapor-blue focus:outline-none focus:ring-2 focus:ring-vapor-blue/50 text-white text-lg transition-all"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-bold mb-2 text-gray-300">
          🔒 Пароль
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="w-full px-4 py-4 bg-vapor-dark/50 border-2 border-gray-600 rounded-xl focus:border-vapor-blue focus:outline-none focus:ring-2 focus:ring-vapor-blue/50 text-white text-lg transition-all"
          placeholder="••••••••"
        />
      </div>

      {error && (
        <div className="bg-red-900/50 border-2 border-red-500 text-red-200 px-5 py-4 rounded-xl animate-pulse font-bold">
          ⚠️ {error}
        </div>
      )}

      {success && (
        <div className="bg-green-900/50 border-2 border-green-500 text-green-200 px-5 py-4 rounded-xl font-bold">
          ✅ {success}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-vapor-blue to-vapor-lightblue text-white py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 disabled:opacity-50 glow btn-press"
      >
        {loading ? '⏳ Загрузка...' : mode === 'login' ? '🚀 Войти' : '✨ Зарегистрироваться'}
      </button>
    </form>
  )
}
