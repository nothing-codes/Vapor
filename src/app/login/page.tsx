import Link from 'next/link'
import AuthForm from '@/components/AuthForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full fade-in">
        <div className="glass p-10 rounded-3xl hover-lift">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Вход</h1>
            <p className="text-white/70">Добро пожаловать обратно</p>
          </div>
          <AuthForm mode="login" />
          <p className="mt-8 text-center text-white/70">
            Нет аккаунта?{' '}
            <Link href="/register" className="text-white font-bold hover:underline">
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
