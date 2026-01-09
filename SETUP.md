# Настройка Vapor

## 1. Настройка Supabase

### Создание таблицы профилей

1. Зайди в свой проект Supabase: https://supabase.com/dashboard/project/hoffjzzioqwgnfwiblqb
2. Перейди в раздел **SQL Editor**
3. Скопируй и выполни SQL из файла `supabase-setup.sql`

Или выполни этот SQL напрямую:

```sql
-- Создание таблицы профилей
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT,
  avatar_color TEXT DEFAULT '#1b8edb',
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Включение Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Политика: пользователи могут читать все профили
CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

-- Политика: пользователи могут обновлять только свой профиль
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Политика: пользователи могут вставлять только свой профиль
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);
```

### Включение Email Authentication

1. Перейди в **Authentication** → **Providers**
2. Убедись, что **Email** включен
3. Настрой Email Templates (опционально)

## 2. Деплой на Vercel

1. Загрузи код на GitHub
2. Зайди на [vercel.com](https://vercel.com)
3. Import Project → выбери репозиторий
4. Добавь Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`: https://hoffjzzioqwgnfwiblqb.supabase.co
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: твой anon key
5. Deploy!

## 3. Локальный запуск

```bash
cd vapor-web
npm install
npm run dev
```

Откройте http://localhost:3000

## Функционал

✅ Регистрация и вход
✅ Кастомизация профиля (имя, цвет аватара, био)
✅ Анимированный фон с частицами
✅ Современный дизайн с эффектами свечения
✅ Адаптивная верстка
