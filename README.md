# VAPOR - Game Store Platform

Веб-приложение в стиле Steam с регистрацией и авторизацией пользователей.

## Технологии

- **Next.js 14** - React фреймворк
- **TypeScript** - типизация
- **Tailwind CSS** - стилизация
- **Supabase** - база данных и аутентификация
- **Vercel** - хостинг

## Установка

1. Установите зависимости:
```bash
cd vapor-web
npm install
```

2. Настройте Supabase:
   - Создайте проект на [supabase.com](https://supabase.com)
   - Включите Email Authentication в настройках
   - Скопируйте URL и anon key

3. Создайте файл `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Запустите проект:
```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

## Деплой на Vercel

1. Установите Vercel CLI:
```bash
npm i -g vercel
```

2. Деплой:
```bash
vercel
```

3. Добавьте переменные окружения в Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Или используйте веб-интерфейс Vercel для деплоя через GitHub.

## Структура

- `/src/app` - страницы приложения
- `/src/components` - React компоненты
- `/src/lib` - утилиты (Supabase клиент)

## Функционал

✅ Регистрация пользователей
✅ Вход в систему
✅ Выход из системы
✅ Дизайн в стиле Steam
✅ Адаптивная верстка
