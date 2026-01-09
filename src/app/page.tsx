'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import Link from 'next/link'
import { Gamepad2, Users, Zap } from 'lucide-react'

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
      <div className="animated-bg"></div>
      
      {/* Floating orbs */}
      <div className="orb" style={{ width: '400px', height: '400px', top: '10%', left: '10%' }}></div>
      <div className="orb" style={{ width: '300px', height: '300px', top: '60%', right: '15%', animationDelay: '5s' }}></div>
      <div className="orb" style={{ width: '250px', height: '250px', bottom: '10%', left: '50%', animationDelay: '10s' }}></div>

      {/* Character Images */}
      <img 
        src="/assets/dio.png" 
        alt="DIO" 
        className="fixed bottom-0 left-0 h-[500px] w-auto z-20 slide-left pointer-events-none"
      />
      <img 
        src="/assets/jojo.png" 
        alt="JoJo" 
        className="fixed bottom-0 right-0 h-[500px] w-auto z-20 slide-right pointer-events-none"
      />

      <div className="max-w-5xl mx-auto relative z-10 min-h-screen flex flex-col justify-center">
        
        {/* Hero Section */}
        <div className="text-center mb-20 fade-in">
          <h1 className="text-8xl font-bold mb-6 text-white">
            VAPOR
          </h1>
          <p className="text-2xl text-white/80 mb-12">
            Современная платформа для игр
          </p>

          {user ? (
            <div className="glass p-10 rounded-3xl max-w-md mx-auto hover-lift">
              <p className="text-xl mb-6">Добро пожаловать!</p>
              <p className="text-white/70 mb-8">{user.email}</p>
              <Link
                href="/profile"
                className="inline-block bg-white text-purple-600 px-10 py-4 rounded-full font-bold text-lg btn-ripple hover-lift"
              >
                Мой профиль
              </Link>
            </div>
          ) : (
            <div className="glass p-10 rounded-3xl max-w-md mx-auto hover-lift">
              <p className="text-xl mb-8 text-white/90">Присоединяйтесь к нам</p>
              <div className="flex gap-4 justify-center">
                <Link
                  href="/login"
                  className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg btn-ripple hover-lift"
                >
                  Войти
                </Link>
                <Link
                  href="/register"
                  className="bg-white/20 text-white px-8 py-4 rounded-full font-bold text-lg btn-ripple hover-lift backdrop-blur-sm"
                >
                  Регистрация
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="glass p-8 rounded-3xl hover-lift fade-in stagger-1">
            <Gamepad2 size={48} className="mb-4 mx-auto" />
            <h3 className="text-2xl font-bold mb-3">Игры</h3>
            <p className="text-white/70">Тысячи игр на любой вкус</p>
          </div>
          <div className="glass p-8 rounded-3xl hover-lift fade-in stagger-2">
            <Users size={48} className="mb-4 mx-auto" />
            <h3 className="text-2xl font-bold mb-3">Сообщество</h3>
            <p className="text-white/70">Играйте с друзьями</p>
          </div>
          <div className="glass p-8 rounded-3xl hover-lift fade-in stagger-3">
            <Zap size={48} className="mb-4 mx-auto" />
            <h3 className="text-2xl font-bold mb-3">Быстро</h3>
            <p className="text-white/70">Мгновенный доступ</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 glass p-10 rounded-3xl fade-in stagger-4">
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">10M+</div>
            <p className="text-white/70">Игроков</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">50K+</div>
            <p className="text-white/70">Игр</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">24/7</div>
            <p className="text-white/70">Поддержка</p>
          </div>
        </div>
      </div>
    </>
  )
}
