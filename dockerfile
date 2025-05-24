# Используем образ Bun
FROM oven/bun:1.0 AS base

WORKDIR /app

# Копируем только package.json и bun.lock для установки зависимостей
COPY frontend/package.json frontend/bun.lock* ./

# Устанавливаем зависимости
RUN bun install

# Копируем весь проект
COPY frontend ./

# Отключаем телеметрию Next.js
ENV NEXT_TELEMETRY_DISABLED 1

# Собираем проект
RUN bun run build

# Указываем порт и хост
ENV PORT=3000
ENV HOST=0.0.0.0

# Запуск приложения
EXPOSE 3000
CMD ["bun", "start"]
