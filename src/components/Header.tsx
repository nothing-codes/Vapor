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
    <header className="bg-vapor-darker/95 backdrop-blur-xl border-b-2 border-vapor-blue/40 sticky top-0 z-50 shadow-lg shadow-vapor-blue/20">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-3xl font-bold text-vapor-lightblue hover:scale-110 transition-transform neon-text">
          ⚡ VAPOR
        </Link>
        <nav className="flex gap-4 items-center">
          {user ? (
            <>
              <Link 
                href="/profile" 
                className="bg-gradient-to-r from-vapor-blue to-vapor-lightblue text-white px-6 py-3 rounded-xl transition-all hover:scale-110 glow flex items-center gap-2 font-bold btn-press"
              >
                <span>👤</span> Профиль
              </Link>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-3 rounded-xl transition-all hover:scale-110 font-bold btn-press"
              >
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link 
                href="/login" 
                className="bg-gradient-to-r from-vapor-blue to-vapor-lightblue text-white px-6 py-3 rounded-xl transition-all hover:scale-110 glow font-bold btn-press"
              >
                Войти
              </Link>
              <Link 
                href="/register" 
                className="bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-xl transition-all hover:scale-110 font-bold btn-press"
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
