import Link from 'next/link'
import AuthForm from '@/components/AuthForm'

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full fade-in">
        <div className="glass p-10 rounded-3xl hover-lift">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Регистрация</h1>
            <p className="text-white/70">Создайте свой аккаунт</p>
          </div>
          <AuthForm mode="register" />
          <p className="mt-8 text-center text-white/70">
            Уже есть аккаунт?{' '}
            <Link href="/login" className="text-white font-bold hover:underline">
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
