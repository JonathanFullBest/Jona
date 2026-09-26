import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('muestra la marca', () => {
    render(<Navbar />);
    expect(screen.getByRole('heading', { level: 1, name: 'JoTechArth' })).toBeInTheDocument();
  });

  it('Contacto abre los dos enlaces de WhatsApp y se cierra con x', async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    await user.click(screen.getByText('Contacto'));

    expect(screen.getByRole('heading', { name: 'Contáctanos' })).toBeInTheDocument();
    const links = screen.getAllByRole('link', { name: /Whatsapp/ });
    expect(links.map((a) => a.getAttribute('href'))).toEqual([
      'https://wa.me/50431470789?text=Hola,%20quisiera%20más%20información',
      'https://wa.me/50495403307?text=Hola,%20quisiera%20más%20información',
    ]);

    await user.click(screen.getByRole('button', { name: 'x' }));
    expect(screen.queryByRole('heading', { name: 'Contáctanos' })).not.toBeInTheDocument();
  });

  it('Dirección muestra la dirección y el enlace a Maps', async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    await user.click(screen.getByText('Dirección'));

    expect(screen.getByText(/Honduras, Tegucigalpa, Loarque, mercado perisur\./)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Vamos a google maps' })).toHaveAttribute(
      'href',
      'https://maps.app.goo.gl/z59oC5Qkvp8Lk3xC9',
    );
  });

  it('Redes muestra Facebook, Instagram y TikTok', async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    await user.click(screen.getByText('Redes'));

    expect(screen.getByRole('link', { name: 'Facebook' })).toHaveAttribute(
      'href',
      'https://www.facebook.com/share/1J3DEFsMqR/',
    );
    expect(screen.getByRole('link', { name: 'Instagram' })).toHaveAttribute(
      'href',
      'https://www.instagram.com/jotechart?stkn=emNpNDFzemJqbW0=',
    );
    expect(screen.getByRole('link', { name: 'TikTok' })).toHaveAttribute(
      'href',
      'https://www.tiktok.com/@jotechart?_r=1&_t=ZS-99rtD5LNQeu',
    );
  });
});
