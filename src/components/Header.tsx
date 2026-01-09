'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

export default function Header() {
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
    <header className="bg-vapor-darker/80 backdrop-blur-md border-b border-vapor-blue/30 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-vapor-lightblue hover:scale-110 transition-transform">
          VAPOR
        </Link>
        <nav className="flex gap-6 items-center">
          {user && (
            <Link href="/profile" className="hover:text-vapor-lightblue transition flex items-center gap-2">
              <span>👤</span> Профиль
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
