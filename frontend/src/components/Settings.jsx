import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import Header from './Header';
import './Settings.css';

const Settings = ({ user }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('usuario');
  const [phoneNumber, setPhoneNumber] = useState('+56 9 1234 5678');
  const [personalEmail, setpersonalEmail] = useState('juan.perez.g@email.com');
  const [subject, setSubject] = useState('Derecho Penal I');

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/';
  };

  return (
    <div className="settings-container">
      <Header user={user} />

      <div className="settings-content">
        <h2 className="settings-title">Configuración</h2>

        <div className="tabs-container">
          <button 
            className={`tab-button ${activeTab === 'usuario' ? 'active' : ''}`}
            onClick={() => setActiveTab('usuario')}
          >
            Usuario
          </button>
          <button 
            className={`tab-button ${activeTab === 'aplicacion' ? 'active' : ''}`}
            onClick={() => setActiveTab('aplicacion')}
          >
            Aplicación
          </button>
        </div>

        {activeTab === 'usuario' && (
          <div className="tab-content">
            <div className="profile-card">
              <h3 className="profile-name">{user.nombre} {user.apellido}</h3>
              <p className="profile-email">{user.email}</p>
              <p className="profile-role">Rol: {user.rol.charAt(0).toUpperCase() + user.rol.slice(1)}</p>
              {user.rol === 'profesor' && (
                <p className="profile-subject">Asignatura: {subject}</p>
              )}
            </div>

            <div className="contact-section">
              <h3 className="section-heading">Contacto</h3>

              <div className="contact-item">
                <div className="contact-info">
                  <div className="contact-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <div className="contact-details">
                    <p className="contact-label">Teléfono</p>
                    <p className="contact-value">{phoneNumber}</p>
                  </div>
                </div>
                <button className="edit-button">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                </button>
              </div>

              <div className="contact-item">
                <div className="contact-info">
                  <div className="contact-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div className="contact-details">
                    <p className="contact-label">Correo Personal</p>
                    <p className="contact-value">{personalEmail}</p>
                  </div>
                </div>
                <button className="edit-button">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                </button>
              </div>
            </div>

            <button className="logout-button-settings" onClick={handleLogout}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Cerrar Sesión
            </button>
          </div>
        )}

        {activeTab === 'aplicacion' && (
          <div className="tab-content">
            <div className="empty-state">
              <p>Configuración de aplicación</p>
            </div>
          </div>
        )}
      </div>

      <nav className="bottom-nav">
        <button className="nav-item" onClick={() => navigate('/dashboard')}>
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

export default Settings;
