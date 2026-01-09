import Link from 'next/link'

export default function VerifyEmailPage() {
  return (
    <div className="max-w-2xl mx-auto mt-16">
      <div className="bg-vapor-darker/80 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-vapor-blue/30 glow text-center">
        <div className="text-6xl mb-6">📧</div>
        <h1 className="text-3xl font-bold mb-4 text-vapor-lightblue">Подтвердите ваш email</h1>
        <p className="text-gray-300 mb-6 text-lg">
          Мы отправили письмо с подтверждением на вашу почту.
        </p>
        <div className="bg-vapor-dark/50 p-6 rounded-lg mb-6 text-left">
          <h3 className="font-bold mb-3 text-vapor-lightblue">Что делать дальше:</h3>
          <ol className="space-y-2 text-gray-300">
            <li>1. Откройте вашу почту</li>
            <li>2. Найдите письмо от Vapor (проверьте папку "Спам")</li>
            <li>3. Нажмите на ссылку подтверждения</li>
            <li>4. Вернитесь на сайт и войдите в аккаунт</li>
          </ol>
        </div>
        <Link
          href="/login"
          className="inline-block bg-vapor-blue hover:bg-vapor-lightblue text-white px-8 py-3 rounded-lg font-medium transition-all hover:scale-105 glow"
        >
          Перейти ко входу
        </Link>
      </div>
    </div>
  )
}
