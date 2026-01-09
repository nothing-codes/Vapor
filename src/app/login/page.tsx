import Link from 'next/link'
import AuthForm from '@/components/AuthForm'

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto mt-16">
      <div className="bg-vapor-darker/80 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-vapor-blue/30 glow">
        <h1 className="text-3xl font-bold mb-6 text-center text-vapor-lightblue">Вход в VAPOR</h1>
        <AuthForm mode="login" />
        <p className="mt-6 text-center text-gray-400">
          Нет аккаунта?{' '}
          <Link href="/register" className="text-vapor-lightblue hover:underline">
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  )
}
