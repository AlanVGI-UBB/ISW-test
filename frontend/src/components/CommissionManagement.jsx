import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import './CommissionManagement.css';

const CommissionManagement = ({ user, userRole = 'profesor' }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterState, setFilterState] = useState('');

  // Datos de ejemplo
  const commissions = [
    {
      id: 1,
      fecha: '22/10/2024',
      hora: '09:00',
      modalidad: 'Presencial',
      lugar: 'Aula Magna',
      integrantes: '12 alumnos',
      estado: 'Sorteo realizado'
    },
    {
      id: 2,
      fecha: '25/10/2024',
      hora: '11:00',
      modalidad: 'En línea',
      lugar: 'meet.google.com/xyz',
      integrantes: 'Ver integrantes',
      estado: 'Pendiente'
    },
    {
      id: 3,
      fecha: '15/09/2024',
      hora: '14:30',
      modalidad: 'Presencial',
      lugar: 'Sala de Consejo',
      integrantes: '8 alumnos',
      estado: 'Finalizada'
    }
  ];

  const getStatusClass = (estado) => {
    switch (estado) {
      case 'Sorteo realizado':
        return 'status-sorteo';
      case 'Pendiente':
        return 'status-pendiente';
      case 'Finalizada':
        return 'status-finalizada';
      default:
        return '';
    }
  };

  return (
    <div className="commission-management-container">
      <Header user={user} title="Facultad de Derecho" />

      <div className="commission-content">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <button onClick={() => navigate('/dashboard')} className="breadcrumb-link">Inicio</button>
          <span className="breadcrumb-separator">›</span>
          <button onClick={() => navigate('/evaluations')} className="breadcrumb-link">Evaluaciones</button>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-link">Derecho Civil I</span>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-current">Gestión de comisiones</span>
        </nav>

        {/* Header con título y botón */}
        <div className="commission-header-section">
          <h2 className="commission-title">Gestión de comisiones – Derecho Civil I</h2>
          {userRole !== 'estudiante' && (
            <button className="create-commission-btn" onClick={() => navigate('/comisiones/create')}>
              + Crear comisión
            </button>
          )}
        </div>

        {/* Filtros */}
        <div className="commission-filters">
          <div className="search-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Buscar comisión..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button className="filter-dropdown">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Fecha
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>

          <button className="filter-dropdown">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            Estado
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
        </div>

        {/* Tabla */}
        <div className="commission-table-container">
          <table className="commission-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Modalidad</th>
                <th>Lugar / Enlace</th>
                <th>Integrantes</th>
                <th>Estado</th>
                {userRole !== 'estudiante' && <th>Acciones</th>}
              </tr>
            </thead>
            <tbody>
              {commissions.map((commission) => (
                <tr key={commission.id}>
                  <td>{commission.fecha}</td>
                  <td>{commission.hora}</td>
                  <td>{commission.modalidad}</td>
                  <td className={commission.modalidad === 'En línea' ? 'link-cell' : ''}>
                    {commission.lugar}
                  </td>
                  <td className={commission.integrantes === 'Ver integrantes' ? 'link-cell' : ''}>
                    {commission.integrantes}
                  </td>
                  <td>
                    <span className={`commission-status-badge ${getStatusClass(commission.estado)}`}>
                      {commission.estado}
                    </span>
                  </td>
                  {userRole !== 'estudiante' && (
                    <td className="actions-cell">
                      {commission.estado === 'Pendiente' && (
                        <button className="action-sortear-btn" title="Sortear">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="2" y="2" width="20" height="20" rx="2" ry="2"/>
                            <path d="M12 8v8M8 12h8"/>
                          </svg>
                          Sortear
                        </button>
                      )}
                      <button className="action-icon-btn" title="Ver detalles">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      </button>
                      <button className="action-icon-btn" title="Editar">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button className="action-icon-btn delete-btn" title="Eliminar">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"/>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Navigation */}
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
        
        <button className="nav-item active">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          <span>Comisiones</span>
        </button>
      </nav>
    </div>
  );
};

export default CommissionManagement;
