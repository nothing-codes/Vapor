'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import Link from 'next/link'

export default function Home() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center py-20">
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-vapor-blue to-vapor-lightblue bg-clip-text text-transparent">
          VAPOR
        </h1>
        <p className="text-2xl text-gray-400 mb-12">
          Платформа для игр и развлечений
        </p>

        {user ? (
          <div className="bg-vapor-darker p-8 rounded-lg max-w-md mx-auto">
            <p className="text-xl mb-4">Добро пожаловать, {user.email}!</p>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded transition"
            >
              Выйти
            </button>
          </div>
        ) : (
          <div className="flex gap-4 justify-center">
            <Link
              href="/login"
              className="bg-vapor-blue hover:bg-vapor-lightblue text-white px-8 py-4 rounded text-lg transition"
            >
              Войти
            </Link>
            <Link
              href="/register"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded text-lg transition"
            >
              Регистрация
            </Link>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        <div className="bg-vapor-darker p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-3">🎮 Тысячи игр</h3>
          <p className="text-gray-400">Огромная библиотека игр на любой вкус</p>
        </div>
        <div className="bg-vapor-darker p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-3">👥 Сообщество</h3>
          <p className="text-gray-400">Играйте с друзьями и находите новых</p>
        </div>
        <div className="bg-vapor-darker p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-3">💰 Скидки</h3>
          <p className="text-gray-400">Регулярные распродажи и специальные предложения</p>
        </div>
      </div>
    </div>
  )
}
