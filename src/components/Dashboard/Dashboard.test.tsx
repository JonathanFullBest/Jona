import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Dashboard from './Dashboard';

describe('Dashboard', () => {
  it('muestra el banner y las cuatro líneas de servicio', () => {
    render(<Dashboard />);

    expect(screen.getByRole('heading', { name: 'Conoce Nuestros Servicios' })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 4 }).map((h) => h.textContent)).toEqual([
      '🎨 Sublimación',
      '🔌 Accesorios',
      '🛠️ Servicio Técnico',
      '📄 Papelería',
    ]);
  });
});
