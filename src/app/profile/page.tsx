'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

interface Profile {
  username: string
  avatar_color: string
  bio: string
}

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [profile, setProfile] = useState<Profile>({
    username: '',
    avatar_color: '#1b8edb',
    bio: ''
  })

  const avatarColors = [
    '#1b8edb', '#66c0f4', '#8b5cf6', '#ec4899', 
    '#f59e0b', '#10b981', '#ef4444', '#6366f1'
  ]

  useEffect(() => {
    checkUser()
  }, [])

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
        avatar_color: data.avatar_color || '#1b8edb',
        bio: data.bio || ''
      })
    }
  }

  const saveProfile = async () => {
    if (!user) return
    setSaving(true)

    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        username: profile.username,
        avatar_color: profile.avatar_color,
        bio: profile.bio,
        updated_at: new Date().toISOString()
      })

    if (error) {
      alert('Ошибка сохранения: ' + error.message)
    } else {
      alert('Профиль сохранен!')
    }
    setSaving(false)
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
      <div className="bg-vapor-darker/80 backdrop-blur-md rounded-xl p-8 border border-vapor-blue/30 glow">
        <h1 className="text-4xl font-bold mb-8 text-vapor-lightblue">Мой профиль</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Avatar Preview */}
          <div className="space-y-6">
            <div className="text-center">
              <div 
                className="w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center text-5xl font-bold text-white glow"
                style={{ backgroundColor: profile.avatar_color }}
              >
                {profile.username ? profile.username[0].toUpperCase() : '?'}
              </div>
              <p className="text-gray-400 text-sm">Выберите цвет аватара</p>
            </div>

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

            <div className="bg-vapor-dark/50 p-4 rounded-lg">
              <p className="text-sm text-gray-400 mb-2">Email:</p>
              <p className="text-vapor-lightblue">{user?.email}</p>
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
                className="w-full px-4 py-3 bg-vapor-dark border border-gray-600 rounded-lg focus:border-vapor-blue focus:outline-none"
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
                className="w-full px-4 py-3 bg-vapor-dark border border-gray-600 rounded-lg focus:border-vapor-blue focus:outline-none resize-none"
                placeholder="Расскажите о себе..."
                rows={4}
                maxLength={200}
              />
              <p className="text-xs text-gray-500 mt-1">{profile.bio.length}/200</p>
            </div>

            <button
              onClick={saveProfile}
              disabled={saving}
              className="w-full bg-vapor-blue hover:bg-vapor-lightblue text-white py-3 rounded-lg font-medium transition-all hover:scale-105 glow disabled:opacity-50"
            >
              {saving ? 'Сохранение...' : 'Сохранить изменения'}
            </button>

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
