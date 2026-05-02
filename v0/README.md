# Proyecto base para v0

Estructura inicial recomendada para trabajar con interfaces generadas en [v0.dev](https://v0.dev) usando Next.js (App Router).

## Requisitos

- Node.js 18+
- npm (o pnpm/yarn)

## Instalacion

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abre `http://localhost:3000`.

## Estructura

- `app/`: rutas y layout principal
- `components/`: componentes reutilizables
- `lib/`: utilidades
- `public/`: assets estaticos

Puedes pegar componentes generados por v0 dentro de `components/` y consumirlos desde `app/page.tsx`.
