# Módulo landing

Posee la página de inicio: `Navbar` (marca, menú, buscador, modales de Contacto, Dirección y Redes)
y `Dashboard` (banner y tarjetas de servicios).

**API pública (`index.ts`):** `Navbar`, `Dashboard`.

**Invariantes**

- Los teléfonos, la dirección, Maps y las redes están fijos en `Navbar.tsx` solo hasta la Fase 3.
  Ahí pasan a leerse del módulo `business` (tabla `business_settings`). No agregues datos nuevos
  del negocio aquí.
- "Inicio" y "Catálogos" del menú todavía no navegan; el router llega en la Fase 3.
- Los tests `*.test.tsx` caracterizan el comportamiento visible. Si cambias la UI a propósito,
  actualiza el test en el mismo commit.
