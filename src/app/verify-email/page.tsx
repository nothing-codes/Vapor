import Link from 'next/link'
import { Mail } from 'lucide-react'

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full fade-in">
        <div className="glass p-12 rounded-3xl hover-lift text-center">
          <div className="mb-8 flex justify-center">
            <div className="bg-white/20 p-6 rounded-full backdrop-blur-sm">
              <Mail size={64} className="text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Подтвердите ваш email</h1>
          <p className="text-white/80 mb-8 text-lg">
            Мы отправили письмо с подтверждением на вашу почту.
          </p>
          
          <div className="glass p-8 rounded-2xl mb-8 text-left">
            <h3 className="font-bold mb-4 text-xl">Что делать дальше:</h3>
            <ol className="space-y-3 text-white/80">
              <li>1. Откройте вашу почту</li>
              <li>2. Найдите письмо от Vapor (проверьте папку "Спам")</li>
              <li>3. Нажмите на ссылку подтверждения</li>
              <li>4. Вернитесь на сайт и войдите в аккаунт</li>
            </ol>
          </div>
          
          <Link
            href="/login"
            className="inline-block bg-white text-purple-600 px-10 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 btn-ripple"
          >
            Перейти ко входу
          </Link>
        </div>
      </div>
    </div>
  )
}
