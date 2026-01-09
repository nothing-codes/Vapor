import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-vapor-darker border-b border-vapor-blue/30">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-vapor-lightblue">
          VAPOR
        </Link>
        <nav className="flex gap-6">
          <Link href="/" className="hover:text-vapor-lightblue transition">
            Магазин
          </Link>
          <Link href="/" className="hover:text-vapor-lightblue transition">
            Библиотека
          </Link>
          <Link href="/" className="hover:text-vapor-lightblue transition">
            Сообщество
          </Link>
        </nav>
      </div>
    </header>
  )
}
