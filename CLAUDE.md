# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es

Sitio de una sola página para **JoTechArth** (tienda en Tegucigalpa, Honduras: sublimación, accesorios
tecnológicos, servicio técnico, papelería). React 19 + Vite 8, JavaScript/JSX sin TypeScript. Todo el
texto visible está en español.

## Comandos

```bash
npm install
npm run dev       # servidor de desarrollo con HMR
npm run build     # build de producción a dist/
npm run preview   # sirve dist/ localmente
npm run lint      # ESLint (flat config: js recommended + react-hooks + react-refresh)
```

No hay framework de tests ni scripts de test configurados. La verificación disponible es `npm run lint`
y `npm run build`.

## Flujo de ramas

`main` es producción. Se trabaja en ramas `feat/*`, `fix/*`, `chore/*` que nacen de `develop` y entran
a `develop` con **squash merge**. Los releases `develop → main` van con **merge commit**, nunca squash.

## Arquitectura

- `src/main.jsx` monta `<App />` en `StrictMode`; `src/App.jsx` solo compone `Navbar` y `Dashboard`.
  No hay router: las entradas "Inicio" y "Catálogos" del menú todavía no hacen nada.
- `src/components/<Nombre>/<Nombre>.jsx` + `<Nombre>.css` junto al componente, importado por efecto
  (`import './Navbar.css'`). CSS plano, sin módulos ni preprocesador.
- `Navbar.jsx` concentra la interacción: tres modales (Contacto, Dirección, Redes) controlados por un
  `useState` booleano cada uno, y los datos de negocio (números de WhatsApp, dirección, URL de Maps,
  enlaces de Facebook/Instagram/TikTok) están hardcodeados dentro del componente. Cambiar un teléfono o
  enlace se hace ahí.
- `Dashboard.jsx` es estático: banner + grilla de tarjetas de servicios.
- `src/libros/storage.js` y `src/libros/supabaseclientes.js` existen pero están vacíos (0 bytes): marcan
  una integración con Supabase que aún no se ha implementado. `@supabase/supabase-js` no está en
  `package.json`.

## Trampas conocidas

- `src/index.css` tiene una regla global `* { color: #fff; font-size: 35px; margin: 0; padding: 0; }`.
  Todo elemento hereda texto blanco y 35px salvo que su CSS lo sobrescriba explícitamente; si un texto
  nuevo "no se ve" o sale enorme, es esto.
- Los imports de assets deben respetar mayúsculas exactas del nombre de archivo (`Logo.png`, no
  `logo.png`): en macOS resuelve igual, pero el build falla en Linux/CI.
- Fuente global: Oxanium, cargada desde Google Fonts en `index.css`.
