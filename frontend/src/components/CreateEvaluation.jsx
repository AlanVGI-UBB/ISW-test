import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateEvaluation.css';
import Header from './Header';

const CreateEvaluation = ({ user }) => {
  const navigate = useNavigate();
  const [showExitModal, setShowExitModal] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);
  const [formData, setFormData] = useState({
    asignatura: '',
    fecha: '',
    hora: '',
    modalidad: 'presencial',
    estado: 'pendiente'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNavigateWithWarning = (path) => {
    setPendingNavigation(path);
    setShowExitModal(true);
  };

  const handleCancelExit = () => {
    setShowExitModal(false);
    setPendingNavigation(null);
  };

  const handleConfirmExit = () => {
    setShowExitModal(false);
    if (pendingNavigation) {
      navigate(pendingNavigation);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Nueva evaluación:', formData);
    // Aquí iría la lógica para guardar en el backend
    navigate('/evaluations');
  };

  return (
    <div className="create-evaluation-container">
      <Header title="Facultad de Derecho" onNavigate={() => handleNavigateWithWarning('/settings')} />

      <div className="create-eval-content">
        <div className="create-eval-title-section">
          <button className="back-button" onClick={() => handleNavigateWithWarning('/evaluations')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            Volver
          </button>
          <h2 className="create-eval-title">Crear Nueva Evaluación</h2>
        </div>

        <form onSubmit={handleSubmit} className="create-eval-form">
          <div className="form-card">
            <div className="form-section">
              <h3 className="form-section-title">Información Básica</h3>
              
              <div className="form-group">
                <label htmlFor="asignatura">Asignatura *</label>
                <input
                  type="text"
                  id="asignatura"
                  name="asignatura"
                  value={formData.asignatura}
                  onChange={handleChange}
                  placeholder="Ej: Derecho Civil I"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fecha">Fecha *</label>
                  <input
                    type="date"
                    id="fecha"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="hora">Hora *</label>
                  <input
                    type="time"
                    id="hora"
                    name="hora"
                    value={formData.hora}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="modalidad">Modalidad *</label>
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
                <label htmlFor="estado">Estado Inicial</label>
                <select
                  id="estado"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="activa">Activa</option>
                  <option value="finalizada">Finalizada</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={() => handleNavigateWithWarning('/evaluations')}>
              Cancelar
            </button>
            <button type="submit" className="submit-button">
              Crear Evaluación
            </button>
          </div>
        </form>
      </div>

      {/* Modal de confirmación */}
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

      <nav className="bottom-nav">
        <button className="nav-item" onClick={() => handleNavigateWithWarning('/dashboard')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          <span>Inicio</span>
        </button>
        
        <button className="nav-item active" onClick={() => handleNavigateWithWarning('/evaluations')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
          <span>Evaluaciones</span>
        </button>
        
        <button className="nav-item" onClick={() => handleNavigateWithWarning('/dashboard')}>
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

export default CreateEvaluation;
