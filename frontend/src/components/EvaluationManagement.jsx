import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import './EvaluationManagement.css';

const EvaluationManagement = ({ user, userRole = 'estudiante' }) => {
  const navigate = useNavigate();
  const [filterDate, setFilterDate] = useState('');
  const [filterState, setFilterState] = useState('');
  const [filterModality, setFilterModality] = useState('');

  // Datos de ejemplo
  const evaluations = [
    {
      id: 1,
      asignatura: 'Derecho Procesal Civil',
      fecha: '22/10/2024 09:00',
      modalidad: 'Presencial',
      estado: 'Activa'
    },
    {
      id: 2,
      asignatura: 'Derecho Constitucional',
      fecha: '25/10/2024 11:00',
      modalidad: 'En línea',
      estado: 'Pendiente'
    },
    {
      id: 3,
      asignatura: 'Derecho Penal I',
      fecha: '15/09/2024 14:30',
      modalidad: 'Presencial',
      estado: 'Finalizada'
    }
  ];

  const getStatusClass = (estado) => {
    switch (estado) {
      case 'Activa':
        return 'status-active';
      case 'Pendiente':
        return 'status-pending';
      case 'Finalizada':
        return 'status-completed';
      default:
        return '';
    }
  };

  return (
    <div className="evaluation-management-container">
      <Header user={user} />

      <div className="evaluation-content">
        <div className="evaluation-title-section">
          <h2 className="evaluation-title">Gestión de Evaluaciones</h2>
          {userRole !== 'estudiante' && (
            <button className="create-button" onClick={() => navigate('/evaluations/create')}>+ Crear nueva evaluación</button>
          )}
        </div>

        <div className="filters-container">
          <button className="filter-button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Filtrar por Fecha
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>

          <button className="filter-button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            Filtrar por Estado
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>

          <button className="filter-button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            Filtrar por Modalidad
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
        </div>

        <div className="table-container">
          <table className="evaluations-table">
            <thead>
              <tr>
                <th>Asignatura</th>
                <th>Fecha y Hora</th>
                <th>Modalidad</th>
                <th>Estado</th>
                {userRole !== 'estudiante' && <th>Acciones</th>}
              </tr>
            </thead>
            <tbody>
              {evaluations.map((evaluation) => (
                <tr key={evaluation.id}>
                  <td className="asignatura-cell">{evaluation.asignatura}</td>
                  <td>{evaluation.fecha}</td>
                  <td>{evaluation.modalidad}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(evaluation.estado)}`}>
                      {evaluation.estado}
                    </span>
                  </td>
                  {userRole !== 'estudiante' && (
                    <td className="actions-cell">
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

      <nav className="bottom-nav">
        <button className="nav-item" onClick={() => navigate('/dashboard')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          <span>Inicio</span>
        </button>
        
        <button className="nav-item active">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
          <span>Evaluaciones</span>
        </button>
        
        {userRole === 'estudiante' ? (
          <button className="nav-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </svg>
            <span>Simulación</span>
          </button>
        ) : (
          <button className="nav-item" onClick={() => navigate('/comisiones')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <span>Comisiones</span>
          </button>
        )}
      </nav>
    </div>
  );
};

export default EvaluationManagement;
