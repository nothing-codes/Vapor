import Link from 'next/link'
import AuthForm from '@/components/AuthForm'

export default function RegisterPage() {
  return (
    <div className="max-w-md mx-auto mt-16 animate-fade-in">
      <div className="bg-vapor-darker/95 backdrop-blur-xl p-10 rounded-2xl shadow-2xl border-2 border-green-500/40 glow card-hover">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-bounce-slow">🚀</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Регистрация в VAPOR
          </h1>
        </div>
        <AuthForm mode="register" />
        <p className="mt-8 text-center text-gray-400 text-lg">
          Уже есть аккаунт?{' '}
          <Link href="/login" className="text-vapor-lightblue hover:text-vapor-blue font-bold hover:underline">
            Войти
          </Link>
        </p>
      </div>
    </div>
  )
}
