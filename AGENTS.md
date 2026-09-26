# AGENTS.md

Instrucciones para cualquier agente (Claude Code, Codex, Cursor, Copilot) que trabaje en este repo.

## Qué es

Web de **JoTechArth** (Tegucigalpa, Honduras: sublimación, accesorios tecnológicos, servicio técnico,
papelería): landing + catálogo por secciones con pedido por WhatsApp y backoffice propio. React 19 +
Vite 8 + TypeScript estricto. Backend: Supabase (a partir de la Fase 2). Todo texto visible en español.

## Comandos

```bash
npm run dev                          servidor de desarrollo
npm run check                        format + lint + typecheck + tests + build — evidencia de "todo en verde"
npm run test -- src/modules/landing  tests de un solo módulo
npx vitest run tests/architecture    sondas de fronteras entre módulos
npm run lint                         ESLint (incluye fronteras)
npm run typecheck                    tsc -b
npm run format                       Prettier
```

TypeScript está fijado en `~6.0.3`: `typescript-eslint` 8 no soporta 6.1+ ni 7.x. No lo subas sin
verificar el peer de `typescript-eslint`.

## Arquitectura: monolito modular

```
src/app/             compone módulos (layout, providers; router desde la Fase 3). Sin lógica de dominio.
src/modules/<m>/     un módulo por dominio: landing (hoy); catalog, cart, business, auth (próximas fases)
  index.ts           API pública — lo único que otros importan
  admin.ts           entrada del backoffice, si el módulo tiene pantallas de admin
  api/               único lugar que habla con Supabase
  model/             tipos, lógica pura, esquemas zod
  ui/public/  ui/admin/
  AGENTS.md          qué posee el módulo, su API y sus invariantes — léelo antes de tocarlo
src/shared/          código sin dominio (cliente Supabase, UI genérica). Nunca importa módulos.
```

Reglas que el lint hace cumplir (`eslint-plugin-boundaries`, probadas en `tests/architecture/`):

- Un módulo o `app/` importa a otro módulo **solo** por su `index.ts` o `admin.ts`.
- Un módulo nunca importa `app/`.
- `shared/` nunca importa `app/` ni módulos.

Si el lint marca una frontera, el arreglo es exponer lo necesario en el `index.ts` del módulo dueño,
no saltarse la regla.

## Flujo de ramas

`main` es producción. Se trabaja en `feat/*`, `fix/*`, `chore/*` que nacen de `develop` y entran con
**squash merge**. Los releases `develop → main` van con **merge commit**. Nunca rebase ni force-push.

## Diseño y plan

El diseño completo (datos, RLS, flujos, testing, CI y alternativas descartadas) está en el spec de
arquitectura del proyecto, y cada fase tiene su plan. Pídele a Cristian la ruta si no la tienes.

## Estilo

- Sin comentarios en el código salvo un "por qué" no obvio o directivas de tooling.
- Imports de assets con las mayúsculas exactas del archivo: en macOS resuelve igual, en CI (Linux) falla.
- `src/app/global.css` tiene una regla `*` que fija texto blanco y 35px para todo. Si un texto nuevo
  no se ve o sale enorme, es eso.
