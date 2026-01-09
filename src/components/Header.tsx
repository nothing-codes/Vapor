'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

export default function Header() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

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
    router.push('/')
  }

  return (
    <header className="bg-vapor-darker/80 backdrop-blur-md border-b border-vapor-blue/30 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-vapor-lightblue hover:scale-110 transition-transform">
          VAPOR
        </Link>
        <nav className="flex gap-4 items-center">
          {user ? (
            <>
              <Link 
                href="/profile" 
                className="bg-vapor-blue hover:bg-vapor-lightblue text-white px-6 py-2 rounded-lg transition-all hover:scale-105 glow flex items-center gap-2"
              >
                <span>👤</span> Профиль
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-all hover:scale-105"
              >
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link 
                href="/login" 
                className="bg-vapor-blue hover:bg-vapor-lightblue text-white px-6 py-2 rounded-lg transition-all hover:scale-105 glow"
              >
                Войти
              </Link>
              <Link 
                href="/register" 
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-all hover:scale-105"
              >
                Регистрация
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
