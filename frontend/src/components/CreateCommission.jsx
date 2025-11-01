import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateCommission.css';
import Header from './Header';

const CreateCommission = ({ user }) => {
  const navigate = useNavigate();
  const [showExitModal, setShowExitModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);
  const [formData, setFormData] = useState({
    evaluacion: 'Derecho Romano',
    fechaExamen: '',
    horaInicio: '',
    horaTermino: '',
    modalidad: 'presencial',
    lugar: '',
    sorteoAutomatico: true
  });

  // Datos de ejemplo
  const alumnosMatriculados = [
    { nombre: 'Ana García', matricula: '20201234' },
    { nombre: 'Carlos Rodríguez', matricula: '20195678' },
    { nombre: 'Luisa Martínez', matricula: '20218765' },
    { nombre: 'Javier Fernández', matricula: '20204321' },
    { nombre: 'Sofía López', matricula: '20199876' }
  ];

  const temasAsociados = [
    'Tema 1: Las Obligaciones',
    'Tema 2: Los Contratos',
    'Tema 3: Derechos Reales',
    'Tema 4: Sucesiones',
    'Tema 5: El Proceso Formulario'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleNavigateWithWarning = (path) => {
    setPendingNavigation(path);
    setShowExitModal(true);
  };

  const handleCancelClick = () => {
    setShowCancelModal(true);
  };

  const handleCancelExit = () => {
    setShowExitModal(false);
    setPendingNavigation(null);
  };

  const handleCancelModalClose = () => {
    setShowCancelModal(false);
  };

  const handleConfirmCancel = () => {
    setShowCancelModal(false);
    navigate('/comisiones');
  };

  const handleConfirmExit = () => {
    setShowExitModal(false);
    if (pendingNavigation) {
      navigate(pendingNavigation);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Nueva comisión:', formData);
    // Aquí iría la lógica para guardar en el backend
    navigate('/comisiones');
  };

  return (
    <div className="create-commission-container">
      <Header title="Gestión de Evaluaciones" onNavigate={() => handleNavigateWithWarning('/settings')} />

      <div className="create-commission-content">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <button onClick={() => handleNavigateWithWarning('/dashboard')} className="breadcrumb-link">Inicio</button>
          <span className="breadcrumb-separator">›</span>
          <button onClick={() => handleNavigateWithWarning('/evaluations')} className="breadcrumb-link">Evaluaciones</button>
          <span className="breadcrumb-separator">›</span>
          <button onClick={() => handleNavigateWithWarning('/comisiones')} className="breadcrumb-link">Derecho Romano</button>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-current">Crear comisión</span>
        </nav>

        <h2 className="create-commission-title">Crear comisión para evaluación <span className="evaluation-name">Derecho Romano</span></h2>

        <form onSubmit={handleSubmit} className="create-commission-form">
          <div className="form-columns">
            {/* Columna izquierda - Datos generales */}
            <div className="form-column">
              <div className="form-card">
                <h3 className="form-section-title">Datos generales</h3>
                
                <div className="form-group">
                  <label htmlFor="evaluacion">Evaluación</label>
                  <select
                    id="evaluacion"
                    name="evaluacion"
                    value={formData.evaluacion}
                    onChange={handleChange}
                    required
                  >
                    <option value="Derecho Romano">Derecho Romano</option>
                    <option value="Derecho Civil I">Derecho Civil I</option>
                    <option value="Derecho Penal">Derecho Penal</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="fechaExamen">Fecha del examen</label>
                  <input
                    type="date"
                    id="fechaExamen"
                    name="fechaExamen"
                    value={formData.fechaExamen}
                    onChange={handleChange}
                    placeholder="mm/dd/yyyy"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="horaInicio">Hora de inicio</label>
                    <input
                      type="time"
                      id="horaInicio"
                      name="horaInicio"
                      value={formData.horaInicio}
                      onChange={handleChange}
                      placeholder="--:-- --"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="horaTermino">Hora de término</label>
                    <input
                      type="time"
                      id="horaTermino"
                      name="horaTermino"
                      value={formData.horaTermino}
                      onChange={handleChange}
                      placeholder="--:-- --"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="modalidad">Modalidad</label>
                  <select
                    id="modalidad"
                    name="modalidad"
                    value={formData.modalidad}
                    onChange={handleChange}
                    required
                  >
                    <option value="presencial">Presencial</option>
                    <option value="en-linea">En línea</option>
                    <option value="hibrida">Híbrida</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="lugar">Lugar o enlace</label>
                  <input
                    type="text"
                    id="lugar"
                    name="lugar"
                    value={formData.lugar}
                    onChange={handleChange}
                    placeholder="Aula 101 o https://meet.example.com/xyz"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Columna derecha - Integrantes y Temas */}
            <div className="form-column">
              {/* Integrantes */}
              <div className="form-card info-card">
                <h3 className="form-section-title">Integrantes</h3>
                
                <div className="info-section">
                  <p className="info-label">Alumnos matriculados</p>
                  <div className="students-list">
                    {alumnosMatriculados.map((alumno, index) => (
                      <div key={index} className="student-item">
                        {alumno.nombre} ({alumno.matricula})
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Temas posibles */}
              <div className="form-card info-card">
                <h3 className="form-section-title">Temas posibles</h3>
                
                <div className="info-section">
                  <p className="info-label">Temas asociados a la evaluación</p>
                  <div className="topics-list">
                    {temasAsociados.map((tema, index) => (
                      <div key={index} className="topic-item">
                        {tema}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="sorteoAutomatico"
                    name="sorteoAutomatico"
                    checked={formData.sorteoAutomatico}
                    onChange={handleChange}
                  />
                  <label htmlFor="sorteoAutomatico" className="checkbox-label">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="2" width="20" height="20" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                      <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    Realizar sorteo automático de tema
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={handleCancelClick}>
              Cancelar
            </button>
            <button type="submit" className="submit-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
                <path d="M12 6v6l4 2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Crear comisión
            </button>
          </div>
        </form>
      </div>

      {/* Modal de confirmación de salida */}
      {showExitModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">¿Deseas salir?</h3>
            <p className="modal-message">
              Si sales de esta ventana, perderás todos los cambios realizados.
            </p>
            <div className="modal-actions">
              <button className="modal-cancel-btn" onClick={handleCancelExit}>
                Cancelar
              </button>
              <button className="modal-confirm-btn" onClick={handleConfirmExit}>
                Salir de todas formas
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación de cancelar */}
      {showCancelModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">¿Estás seguro?</h3>
            <p className="modal-message">
              ¿Estás seguro de que deseas cancelar la creación de esta comisión?
            </p>
            <div className="modal-actions">
              <button className="modal-cancel-btn" onClick={handleCancelModalClose}>
                No, continuar editando
              </button>
              <button className="modal-confirm-btn" onClick={handleConfirmCancel}>
                Sí, cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <nav className="bottom-nav">
        <button className="nav-item" onClick={() => handleNavigateWithWarning('/dashboard')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          <span>Inicio</span>
        </button>
        
        <button className="nav-item" onClick={() => handleNavigateWithWarning('/evaluations')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
          <span>Evaluaciones</span>
        </button>
        
        <button className="nav-item active" onClick={() => handleNavigateWithWarning('/comisiones')}>
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

export default CreateCommission;
