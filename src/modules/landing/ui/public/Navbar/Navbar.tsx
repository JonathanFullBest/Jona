import { useState } from 'react';
import './Navbar.css';
import logo_jona from '../../../assets/Logo.png';
import lupa from '../../../assets/lupa.png';
import carrito from '../../../assets/carrito.png';

const Navbar = () => {
  // Pa las ventanas flotantes
const [isModalOpen, setIsModalOpen] = useState(false);
const [isLocationOpen, setIsLocationOpen] = useState(false);
const [isSocialOpen, setIsSocialOpen] = useState(false);

  // Pa números de whatsapp
const contactos = [
    { etiqueta: 'Whatsapp', numero: '50431470789' },
    { etiqueta: 'Whatsapp', numero: '50495403307' },
];

  // Pa la dirección
const direccionInfo = {
    texto: 'Honduras, Tegucigalpa, Loarque, mercado perisur.',
    mapsUrl: 'https://maps.app.goo.gl/z59oC5Qkvp8Lk3xC9',
};

return (
    <div className='Navbar'>
    <img src={logo_jona} alt="" className='logo' />
    <h1>JoTechArth</h1>

    <ul>
        <li>Inicio</li>
        <li onClick={() => setIsModalOpen(true)} style={{ cursor: 'pointer' }}>Contacto</li>
        <li onClick={() => setIsLocationOpen(true)} style={{ cursor: 'pointer' }}>Dirección</li>
        <li>Catálogos</li>
        <li onClick={() => setIsSocialOpen(true)} style={{ cursor: 'pointer'}}>Redes</li>
    </ul>

    <img src={carrito} alt="" className='carrito' />

    <div className='search-box'>
        <input type='text' placeholder='search' />
        <img src={lupa} alt="" className='lupa' />
    </div>

    {/*contactos */}
    {isModalOpen && (
        <div className="modal-overlay">
        <div className="modal-content">
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>
            x
            </button>
            <h2>Contáctanos</h2>
            <div className="phone-list">
            {contactos.map((contacto, index) => (
                <a
                key={index}
                href={`https://wa.me/${contacto.numero}?text=Hola,%20quisiera%20más%20información`}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-btn"
                >
                {contacto.etiqueta}: +{contacto.numero}
                </a>
            ))}
            </div>
        </div>
        </div>
    )}

      {/*Dirección */}
    {isLocationOpen && (
        <div className="modal-overlay">
        <div className="modal-content">
            <button className="close-btn" onClick={() => setIsLocationOpen(false)}>
            x
            </button>
            <h2>Nuestra Ubicación</h2>
            <p className="location-text">
            📍{direccionInfo.texto}
            </p>
            <div className="phone-list">
            <a
                href={direccionInfo.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mapa-btn"
            >
                Vamos a google maps
            </a>
            </div>
        </div>
        </div>
    )}

    {/*Redes*/}
    {isSocialOpen && (
    <div className="modal-overlay">
    <div className="modal-content">
        <button 
        className="close-btn" 
        onClick={() => setIsSocialOpen(false)}
        >
        x
        </button>
        <h2>Nuestras Redes Sociales</h2>
        <div className="phone-list">
        <a 
            href="https://www.facebook.com/share/1J3DEFsMqR/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="face-btn"
        >
            Facebook
        </a>
        <a 
            href="https://www.instagram.com/jotechart?stkn=emNpNDFzemJqbW0=" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="insta-btn"
        >
            Instagram
        </a>
        <a 
            href="https://www.tiktok.com/@jotechart?_r=1&_t=ZS-99rtD5LNQeu" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="tiktok-btn"
        >
            TikTok
        </a>
        </div>
    </div>
    </div>
)}

    </div>
);
};

export default Navbar;