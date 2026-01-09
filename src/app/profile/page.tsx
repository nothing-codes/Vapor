'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

interface Profile {
  username: string
  avatar_url: string | null
  avatar_color: string
  bio: string
  theme: 'jojo' | 'dio'
}

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [profile, setProfile] = useState<Profile>({
    username: '',
    avatar_url: null,
    avatar_color: '#1b8edb',
    bio: '',
    theme: 'jojo'
  })

  const avatarColors = [
    '#1b8edb', '#66c0f4', '#8b5cf6', '#ec4899', 
    '#f59e0b', '#10b981', '#ef4444', '#6366f1'
  ]

  const themes = {
    jojo: {
      name: 'JoJo',
      bg: 'from-vapor-darker to-vapor-dark',
      accent: 'vapor-blue',
      border: 'vapor-blue/30',
      text: 'text-vapor-lightblue'
    },
    dio: {
      name: 'DIO',
      bg: 'from-yellow-900 to-yellow-950',
      accent: 'yellow-500',
      border: 'yellow-500/30',
      text: 'text-yellow-400'
    }
  }

  const currentTheme = themes[profile.theme]

  useEffect(() => {
    checkUser()
  }, [])

  // Автосохранение при изменении
  useEffect(() => {
    if (user && !loading) {
      const timer = setTimeout(() => {
        saveProfile(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [profile.username, profile.bio, profile.avatar_color, profile.theme])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }
    setUser(user)
    await loadProfile(user.id)
    setLoading(false)
  }

  const loadProfile = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (data) {
      setProfile({
        username: data.username || '',
        avatar_url: data.avatar_url || null,
        avatar_color: data.avatar_color || '#1b8edb',
        bio: data.bio || '',
        theme: data.theme || 'jojo'
      })
    }
  }

  const saveProfile = async (silent = false) => {
    if (!user) return

    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        username: profile.username,
        avatar_url: profile.avatar_url,
        avatar_color: profile.avatar_color,
        bio: profile.bio,
        theme: profile.theme,
        updated_at: new Date().toISOString()
      })

    if (error && !silent) {
      alert('Ошибка сохранения: ' + error.message)
    }
  }

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        return
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}/${Math.random()}.${fileExt}`

      // Удаляем старый аватар если есть
      if (profile.avatar_url) {
        const oldPath = profile.avatar_url.split('/').slice(-2).join('/')
        await supabase.storage.from('avatars').remove([oldPath])
      }

      // Загружаем новый
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file)

      if (uploadError) throw uploadError

      // Получаем публичный URL
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName)

      setProfile({ ...profile, avatar_url: data.publicUrl })
      
      // Сохраняем в базу
      await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          avatar_url: data.publicUrl,
          updated_at: new Date().toISOString()
        })

    } catch (error: any) {
      alert('Ошибка загрузки: ' + error.message)
    } finally {
      setUploading(false)
    }
  }

  const removeAvatar = async () => {
    if (!profile.avatar_url) return

    try {
      const path = profile.avatar_url.split('/').slice(-2).join('/')
      await supabase.storage.from('avatars').remove([path])
      
      setProfile({ ...profile, avatar_url: null })
      
      await supabase
        .from('profiles')
        .update({ avatar_url: null })
        .eq('id', user.id)
    } catch (error: any) {
      alert('Ошибка удаления: ' + error.message)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-2xl text-vapor-lightblue">Загрузка...</div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className={`bg-gradient-to-br ${currentTheme.bg} backdrop-blur-md rounded-xl p-8 border border-${currentTheme.border} glow`}>
        <h1 className={`text-4xl font-bold mb-8 ${currentTheme.text}`}>Мой профиль</h1>

        {/* Theme Selector */}
        <div className="mb-8 flex gap-4 justify-center">
          <button
            onClick={() => setProfile({ ...profile, theme: 'jojo' })}
            className={`px-6 py-3 rounded-lg font-bold transition-all ${
              profile.theme === 'jojo'
                ? 'bg-vapor-blue text-white scale-110'
                : 'bg-vapor-dark/50 text-gray-400 hover:scale-105'
            }`}
          >
            ⭐ JoJo (Темная)
          </button>
          <button
            onClick={() => setProfile({ ...profile, theme: 'dio' })}
            className={`px-6 py-3 rounded-lg font-bold transition-all ${
              profile.theme === 'dio'
                ? 'bg-yellow-500 text-black scale-110'
                : 'bg-vapor-dark/50 text-gray-400 hover:scale-105'
            }`}
          >
            ☀️ DIO (Желтая)
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Avatar Preview */}
          <div className="space-y-6">
            <div className="text-center">
              {profile.avatar_url ? (
                <div className="relative inline-block">
                  <img 
                    src={profile.avatar_url}
                    alt="Avatar"
                    className={`w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-${currentTheme.accent} glow`}
                  />
                  <button
                    onClick={removeAvatar}
                    className="absolute top-0 right-0 bg-red-600 hover:bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div 
                  className="w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center text-5xl font-bold text-white glow"
                  style={{ backgroundColor: profile.avatar_color }}
                >
                  {profile.username ? profile.username[0].toUpperCase() : '?'}
                </div>
              )}
              
              <label className={`cursor-pointer bg-${currentTheme.accent} hover:opacity-80 text-white px-4 py-2 rounded-lg transition-all inline-block glow`}>
                {uploading ? 'Загрузка...' : 'Загрузить фото'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={uploadAvatar}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
            </div>

            <div>
              <p className="text-gray-400 text-sm mb-2">Выберите цвет аватара</p>
              <div className="grid grid-cols-4 gap-3">
                {avatarColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setProfile({ ...profile, avatar_color: color })}
                    className={`w-12 h-12 rounded-full transition-all hover:scale-110 ${
                      profile.avatar_color === color ? 'ring-4 ring-white' : ''
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div className="bg-black/30 p-4 rounded-lg">
              <p className="text-sm text-gray-400 mb-2">Email:</p>
              <p className={currentTheme.text}>{user?.email}</p>
            </div>

            <div className="text-xs text-gray-500 text-center">
              💾 Изменения сохраняются автоматически
            </div>
          </div>

          {/* Profile Form */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Имя пользователя
              </label>
              <input
                type="text"
                value={profile.username}
                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg focus:border-${currentTheme.accent} focus:outline-none text-white"
                placeholder="Введите имя"
                maxLength={20}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                О себе
              </label>
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg focus:border-${currentTheme.accent} focus:outline-none resize-none text-white"
                placeholder="Расскажите о себе..."
                rows={4}
                maxLength={200}
              />
              <p className="text-xs text-gray-500 mt-1">{profile.bio.length}/200</p>
            </div>

            <button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition-all hover:scale-105"
            >
              Выйти из аккаунта
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
