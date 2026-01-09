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
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 15 + 's',
              animationDuration: Math.random() * 10 + 15 + 's',
            }}
          />
        ))}
      </div>

      {/* Characters */}
      <div className="fixed left-0 bottom-0 z-0 opacity-40 hover:opacity-80 transition-all duration-700 animate-slide-left">
        <img src="/assets/dio.png" alt="DIO" className="h-[500px] w-auto" />
      </div>
      <div className="fixed right-0 bottom-0 z-0 opacity-40 hover:opacity-80 transition-all duration-700 animate-slide-right">
        <img src="/assets/jojo.png" alt="JoJo" className="h-[500px] w-auto" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center py-20">
          <h1 className="text-8xl font-bold mb-6 bg-gradient-to-r from-vapor-blue via-vapor-lightblue to-vapor-blue bg-clip-text text-transparent neon-text gradient-animate">
            VAPOR
          </h1>
          <p className="text-3xl text-gray-300 mb-12 animate-fade-in">
            ✨ Платформа для игр и развлечений ✨
          </p>

          {user ? (
            <div className="bg-vapor-darker/90 backdrop-blur-xl p-10 rounded-2xl max-w-md mx-auto glow border-2 border-vapor-blue/40 card-hover">
              <div className="text-6xl mb-4 animate-bounce-slow">🎮</div>
              <p className="text-2xl mb-6">Добро пожаловать!</p>
              <p className="text-vapor-lightblue mb-8 text-lg">{user.email}</p>
              <Link
                href="/profile"
                className="bg-gradient-to-r from-vapor-blue to-vapor-lightblue text-white px-10 py-4 rounded-xl font-bold text-lg transition-all hover:scale-110 inline-block glow btn-press"
              >
                🚀 Перейти в профиль
              </Link>
            </div>
          ) : (
            <div className="bg-vapor-darker/90 backdrop-blur-xl p-10 rounded-2xl max-w-md mx-auto glow border-2 border-vapor-blue/40 card-hover">
              <div className="text-6xl mb-4 animate-bounce-slow">🌟</div>
              <p className="text-2xl mb-8 text-gray-300">Присоединяйтесь к миллионам игроков!</p>
              <div className="flex gap-4 justify-center">
                <Link
                  href="/login"
                  className="bg-gradient-to-r from-vapor-blue to-vapor-lightblue text-white px-8 py-4 rounded-xl text-lg font-bold transition-all hover:scale-110 glow btn-press"
                >
                  Войти
                </Link>
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-green-600 to-green-500 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all hover:scale-110 glow btn-press"
                >
                  Регистрация
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="bg-vapor-darker/90 backdrop-blur-xl p-8 rounded-2xl border-2 border-vapor-blue/30 card-hover">
            <div className="text-6xl mb-4 animate-bounce-slow">🎮</div>
            <h3 className="text-2xl font-bold mb-4 text-vapor-lightblue">Тысячи игр</h3>
            <p className="text-gray-400 text-lg">Огромная библиотека игр на любой вкус</p>
          </div>
          <div className="bg-vapor-darker/90 backdrop-blur-xl p-8 rounded-2xl border-2 border-purple-500/30 card-hover">
            <div className="text-6xl mb-4 animate-bounce-slow" style={{ animationDelay: '0.5s' }}>👥</div>
            <h3 className="text-2xl font-bold mb-4 text-purple-400">Сообщество</h3>
            <p className="text-gray-400 text-lg">Играйте с друзьями и находите новых</p>
          </div>
          <div className="bg-vapor-darker/90 backdrop-blur-xl p-8 rounded-2xl border-2 border-yellow-500/30 card-hover">
            <div className="text-6xl mb-4 animate-bounce-slow" style={{ animationDelay: '1s' }}>💰</div>
            <h3 className="text-2xl font-bold mb-4 text-yellow-400">Скидки</h3>
            <p className="text-gray-400 text-lg">Регулярные распродажи и специальные предложения</p>
          </div>
        </div>

        {/* Популярные игры */}
        <div className="mt-24">
          <h2 className="text-5xl font-bold mb-10 text-center bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            🔥 Популярные игры
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Cyber Quest 2077', genre: 'RPG', price: '1999₽', emoji: '🤖', color: 'from-blue-600 to-purple-600' },
              { name: 'Battle Royale X', genre: 'Action', price: 'Бесплатно', emoji: '⚔️', color: 'from-red-600 to-orange-600' },
              { name: 'Space Explorer', genre: 'Adventure', price: '899₽', emoji: '🚀', color: 'from-indigo-600 to-blue-600' },
              { name: 'Racing Legends', genre: 'Racing', price: '1499₽', emoji: '🏎️', color: 'from-yellow-600 to-red-600' },
            ].map((game, i) => (
              <div 
                key={i}
                className="bg-vapor-darker/90 backdrop-blur-xl rounded-2xl overflow-hidden border-2 border-vapor-blue/30 card-hover cursor-pointer"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`h-48 bg-gradient-to-br ${game.color} flex items-center justify-center text-7xl relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <span className="relative z-10 animate-bounce-slow">{game.emoji}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-xl mb-2">{game.name}</h3>
                  <p className="text-gray-400 text-sm mb-3">{game.genre}</p>
                  <p className="text-vapor-lightblue font-bold text-lg">{game.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Новости и обновления */}
        <div className="mt-24">
          <h2 className="text-5xl font-bold mb-10 text-center bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
            📰 Новости
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-vapor-darker/90 backdrop-blur-xl p-8 rounded-2xl border-2 border-green-500/30 card-hover">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">🎉</span>
                <div className="text-sm text-gray-400">2 часа назад</div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-green-400">Зимняя распродажа началась!</h3>
              <p className="text-gray-300 mb-6 text-lg">Скидки до 90% на тысячи игр. Не пропустите лучшие предложения года!</p>
              <button className="text-vapor-lightblue hover:text-vapor-blue font-bold text-lg hover:underline">
                Читать далее →
              </button>
            </div>
            <div className="bg-vapor-darker/90 backdrop-blur-xl p-8 rounded-2xl border-2 border-blue-500/30 card-hover">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">⚡</span>
                <div className="text-sm text-gray-400">1 день назад</div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Новое обновление клиента</h3>
              <p className="text-gray-300 mb-6 text-lg">Улучшенная производительность, новые функции и исправления ошибок.</p>
              <button className="text-vapor-lightblue hover:text-vapor-blue font-bold text-lg hover:underline">
                Читать далее →
              </button>
            </div>
          </div>
        </div>

        {/* Статистика */}
        <div className="mt-24 mb-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-vapor-blue/20 to-vapor-darker backdrop-blur-xl p-10 rounded-2xl border-2 border-vapor-blue/40 text-center card-hover">
            <div className="text-6xl font-bold text-vapor-lightblue mb-3 neon-text">10M+</div>
            <p className="text-gray-300 text-xl">Активных игроков</p>
          </div>
          <div className="bg-gradient-to-br from-purple-600/20 to-vapor-darker backdrop-blur-xl p-10 rounded-2xl border-2 border-purple-500/40 text-center card-hover">
            <div className="text-6xl font-bold text-purple-400 mb-3 neon-text">50K+</div>
            <p className="text-gray-300 text-xl">Игр в каталоге</p>
          </div>
          <div className="bg-gradient-to-br from-green-600/20 to-vapor-darker backdrop-blur-xl p-10 rounded-2xl border-2 border-green-500/40 text-center card-hover">
            <div className="text-6xl font-bold text-green-400 mb-3 neon-text">24/7</div>
            <p className="text-gray-300 text-xl">Поддержка</p>
          </div>
        </div>
      </div>
    </>
  )
}
