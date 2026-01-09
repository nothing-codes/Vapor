'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Theme = 'jojo' | 'dio'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'jojo',
  setTheme: () => {},
})

export const useTheme = () => useContext(ThemeContext)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('jojo')

  useEffect(() => {
    loadUserTheme()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        loadUserTheme()
      } else {
        setThemeState('jojo')
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const loadUserTheme = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data } = await supabase
      .from('profiles')
      .select('theme')
      .eq('id', user.id)
      .single()

    if (data?.theme) {
      setThemeState(data.theme as Theme)
    }
  }

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={theme === 'dio' ? 'theme-dio' : 'theme-jojo'}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}
