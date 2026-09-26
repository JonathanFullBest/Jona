import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Banner de Bienvenida */}
      <header className="dashboard-header">
        <h2>Conoce Nuestros Servicios</h2>
        <p>JoTechArth tu lo imaginas, nosotros lo hacemos realidad.</p>
      </header>

      {/* Tarjetas de Resumen Rápido */}
      <div className="stats-grid">
        <div className="stat-card">
          <h4>🎨 Sublimación</h4>
          <p className="stat-number">Personalización general</p>
        </div>
        <div className="stat-card">
          <h4>🔌 Accesorios</h4>
          <p className="stat-number">Tecnología</p>
        </div>
        <div className="stat-card">
          <h4>🛠️ Servicio Técnico</h4>
          <p className="stat-number">Para celulares y computadoras</p>
        </div>
        <div className="stat-card">
          <h4>📄 Papelería</h4>
          <p className="stat-number">Impresiones, copias, diseños y mucho más</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
