import { authService } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import './Dashboard.css';

const Dashboard = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/';
  };

  return (
    <div className="dashboard-container">
      <Header user={user} />

      <div className="dashboard-banner-wrapper">
        <div className="dashboard-banner">
          <h2>Bienvenido(a), {user.nombre}</h2>
          <p className="user-role-text">Rol: {user.rol.charAt(0).toUpperCase() + user.rol.slice(1)}</p>
        </div>
      </div>

      <div className="dashboard-content">
        <section className="section-card">
          <h3 className="section-title">Comisiones Próximas</h3>
          
          {user.rol === 'profesor' ? (
            <>
              <div className="commission-item">
                <div className="commission-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <div className="commission-details">
                  <h4>Evaluación Derecho Civil I</h4>
                  <p className="commission-location">Aula 301</p>
                  <p className="commission-date">18 de Octubre, 14:00 PM - Tribunal asignado</p>
                </div>
                <div className="status-indicator status-green"></div>
              </div>

              <div className="commission-item">
                <div className="commission-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <div className="commission-details">
                  <h4>Evaluación Derecho Penal II</h4>
                  <p className="commission-location">Aula Magna</p>
                  <p className="commission-date">25 de Octubre, 10:00 AM - Por confirmar</p>
                </div>
                <div className="status-indicator status-yellow"></div>
              </div>
            </>
          ) : (
            <>
              <div className="commission-item">
                <div className="commission-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <div className="commission-details">
                  <h4>Derecho Civil I</h4>
                  <p className="commission-location">Aula Magna</p>
                  <p className="commission-date">15 de Octubre, 10:00 AM</p>
                </div>
                <div className="status-indicator status-green"></div>
              </div>

              <div className="commission-item">
                <div className="commission-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <div className="commission-details">
                  <h4>Derecho Penal II</h4>
                  <p className="commission-location">Sala de Juicios</p>
                  <p className="commission-date">22 de Octubre, 09:00 AM</p>
                </div>
                <div className="status-indicator status-yellow"></div>
              </div>
            </>
          )}
        </section>

        {user.rol === 'profesor' && (
          <section className="section-card">
            <h3 className="section-title">Gestión de Evaluaciones</h3>
            <p className="section-description">Crea y administra las evaluaciones orales de tus asignaturas.</p>
            <button className="action-button" onClick={() => navigate('/evaluations/create')}>Crear Nueva Evaluación</button>
          </section>
        )}

        {user.rol === 'estudiante' && (
          <section className="section-card">
            <h3 className="section-title">Simulaciones Activas</h3>
            <p className="section-description">Prepárate para tus evaluaciones practicando con nuestros casos simulados.</p>
            <button className="action-button">Practicar ahora</button>
          </section>
        )}

        {user.rol === 'admin' && (
          <section className="section-card">
            <h3 className="section-title">Panel de Administración</h3>
            <p className="section-description">Gestiona usuarios, configuraciones del sistema y reportes.</p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button className="action-button" style={{ flex: 1 }}>Gestionar Usuarios</button>
              <button className="action-button" style={{ flex: 1 }}>Ver Reportes</button>
            </div>
          </section>
        )}

        <section className="section-card">
          <h3 className="section-title">Resultados Recientes</h3>
          
          <div className="result-item">
            <div className="result-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <div className="result-details">
              <h4>Derecho Constitucional</h4>
              <p className="result-date">Publicado: 05 de Octubre</p>
            </div>
            <div className="result-score">6.5</div>
          </div>

          <div className="result-item">
            <div className="result-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <div className="result-details">
              <h4>Teoría General del Proceso</h4>
              <p className="result-date">Publicado: 01 de Octubre</p>
            </div>
            <div className="result-score">5.0</div>
          </div>
        </section>
      </div>

      <nav className="bottom-nav">
        <button className="nav-item active">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          <span>Inicio</span>
        </button>
        
        <button className="nav-item" onClick={() => navigate('/evaluations')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
          <span>Evaluaciones</span>
        </button>
        
        <button className="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
          </svg>
          <span>Simulación</span>
        </button>
      </nav>
    </div>
  );
};

export default Dashboard;
