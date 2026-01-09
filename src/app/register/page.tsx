import Link from 'next/link'
import AuthForm from '@/components/AuthForm'

export default function RegisterPage() {
  return (
    <div className="max-w-md mx-auto mt-16">
      <div className="bg-vapor-darker p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Регистрация в VAPOR</h1>
        <AuthForm mode="register" />
        <p className="mt-6 text-center text-gray-400">
          Уже есть аккаунт?{' '}
          <Link href="/login" className="text-vapor-lightblue hover:underline">
            Войти
          </Link>
        </p>
      </div>
    </div>
  )
}
