import Link from 'next/link'
import AuthForm from '@/components/AuthForm'

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto mt-16 animate-fade-in">
      <div className="bg-vapor-darker/95 backdrop-blur-xl p-10 rounded-2xl shadow-2xl border-2 border-vapor-blue/40 glow card-hover">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-bounce-slow">🔐</div>
          <h1 className="text-4xl font-bold text-vapor-lightblue neon-text">Вход в VAPOR</h1>
        </div>
        <AuthForm mode="login" />
        <p className="mt-8 text-center text-gray-400 text-lg">
          Нет аккаунта?{' '}
          <Link href="/register" className="text-vapor-lightblue hover:text-vapor-blue font-bold hover:underline">
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  )
}
