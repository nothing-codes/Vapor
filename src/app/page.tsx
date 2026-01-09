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

  return (
    <>
      <div className="animated-bg">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 15 + 's',
              animationDuration: Math.random() * 10 + 10 + 's',
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center py-20">
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-vapor-blue via-vapor-lightblue to-vapor-blue bg-clip-text text-transparent animate-pulse">
            VAPOR
          </h1>
          <p className="text-2xl text-gray-300 mb-12 animate-fade-in">
            Платформа для игр и развлечений
          </p>

          {user ? (
            <div className="bg-vapor-darker/80 backdrop-blur-md p-8 rounded-xl max-w-md mx-auto glow border border-vapor-blue/30">
              <p className="text-xl mb-6">Добро пожаловать, <span className="text-vapor-lightblue">{user.email}</span>!</p>
              <Link
                href="/profile"
                className="bg-vapor-blue hover:bg-vapor-lightblue text-white px-8 py-3 rounded-lg font-medium transition-all hover:scale-105 inline-block glow"
              >
                Перейти в профиль
              </Link>
            </div>
          ) : (
            <div className="bg-vapor-darker/80 backdrop-blur-md p-8 rounded-xl max-w-md mx-auto glow border border-vapor-blue/30">
              <p className="text-xl mb-6 text-gray-300">Присоединяйтесь к миллионам игроков!</p>
              <div className="flex gap-4 justify-center">
                <Link
                  href="/login"
                  className="bg-vapor-blue hover:bg-vapor-lightblue text-white px-8 py-4 rounded-lg text-lg transition-all hover:scale-105 glow"
                >
                  Войти
                </Link>
                <Link
                  href="/register"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg transition-all hover:scale-105 glow"
                >
                  Регистрация
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-vapor-darker/80 backdrop-blur-md p-6 rounded-xl border border-vapor-blue/20 hover:border-vapor-blue/50 transition-all hover:scale-105">
            <div className="text-4xl mb-3">🎮</div>
            <h3 className="text-xl font-bold mb-3 text-vapor-lightblue">Тысячи игр</h3>
            <p className="text-gray-400">Огромная библиотека игр на любой вкус</p>
          </div>
          <div className="bg-vapor-darker/80 backdrop-blur-md p-6 rounded-xl border border-vapor-blue/20 hover:border-vapor-blue/50 transition-all hover:scale-105">
            <div className="text-4xl mb-3">👥</div>
            <h3 className="text-xl font-bold mb-3 text-vapor-lightblue">Сообщество</h3>
            <p className="text-gray-400">Играйте с друзьями и находите новых</p>
          </div>
          <div className="bg-vapor-darker/80 backdrop-blur-md p-6 rounded-xl border border-vapor-blue/20 hover:border-vapor-blue/50 transition-all hover:scale-105">
            <div className="text-4xl mb-3">💰</div>
            <h3 className="text-xl font-bold mb-3 text-vapor-lightblue">Скидки</h3>
            <p className="text-gray-400">Регулярные распродажи и специальные предложения</p>
          </div>
        </div>

        {/* Популярные игры */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-8 text-vapor-lightblue">🔥 Популярные игры</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Cyber Quest 2077', genre: 'RPG', price: '1999₽' },
              { name: 'Battle Royale X', genre: 'Action', price: 'Бесплатно' },
              { name: 'Space Explorer', genre: 'Adventure', price: '899₽' },
              { name: 'Racing Legends', genre: 'Racing', price: '1499₽' },
            ].map((game, i) => (
              <div 
                key={i}
                className="bg-vapor-darker/80 backdrop-blur-md rounded-xl overflow-hidden border border-vapor-blue/20 hover:border-vapor-blue/50 transition-all hover:scale-105 cursor-pointer"
              >
                <div className="h-40 bg-gradient-to-br from-vapor-blue/30 to-vapor-darker flex items-center justify-center text-6xl">
                  🎮
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{game.name}</h3>
                  <p className="text-gray-400 text-sm mb-2">{game.genre}</p>
                  <p className="text-vapor-lightblue font-bold">{game.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Статистика */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-vapor-darker/80 backdrop-blur-md p-8 rounded-xl border border-vapor-blue/20 text-center">
            <div className="text-4xl font-bold text-vapor-lightblue mb-2">10M+</div>
            <p className="text-gray-400">Активных игроков</p>
          </div>
          <div className="bg-vapor-darker/80 backdrop-blur-md p-8 rounded-xl border border-vapor-blue/20 text-center">
            <div className="text-4xl font-bold text-vapor-lightblue mb-2">50K+</div>
            <p className="text-gray-400">Игр в каталоге</p>
          </div>
          <div className="bg-vapor-darker/80 backdrop-blur-md p-8 rounded-xl border border-vapor-blue/20 text-center">
            <div className="text-4xl font-bold text-vapor-lightblue mb-2">24/7</div>
            <p className="text-gray-400">Поддержка</p>
          </div>
        </div>
      </div>
    </>
  )
}
