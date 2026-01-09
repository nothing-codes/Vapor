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
    <header className="glass sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-white hover:scale-105 transition-transform">
          VAPOR
        </Link>
        <nav className="flex gap-3 items-center">
          {user ? (
            <>
              <Link 
                href="/profile" 
                className="bg-white text-purple-600 px-6 py-2 rounded-full font-bold transition-all hover:scale-105 btn-ripple"
              >
                Профиль
              </Link>
              <button
                onClick={handleLogout}
                className="bg-white/20 text-white px-6 py-2 rounded-full font-bold transition-all hover:scale-105 backdrop-blur-sm"
              >
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link 
                href="/login" 
                className="bg-white text-purple-600 px-6 py-2 rounded-full font-bold transition-all hover:scale-105 btn-ripple"
              >
                Войти
              </Link>
              <Link 
                href="/register" 
                className="bg-white/20 text-white px-6 py-2 rounded-full font-bold transition-all hover:scale-105 backdrop-blur-sm"
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
