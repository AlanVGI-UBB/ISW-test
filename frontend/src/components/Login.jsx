import { useState } from 'react';
import { authService } from '../services/api';
import './Login.css';

const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [devRole, setDevRole] = useState('estudiante');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Modo desarrollo: permitir login sin credenciales
      if (!formData.email && !formData.password) {
        // Usuario mock para desarrollo basado en rol seleccionado
        const mockUsers = {
          estudiante: {
            id: 1,
            nombre: 'María',
            apellido: 'González',
            email: 'maria.gonzalez@derecho.edu',
            rol: 'estudiante'
          },
          profesor: {
            id: 2,
            nombre: 'Juan',
            apellido: 'Pérez',
            email: 'juan.perez@derecho.edu',
            rol: 'profesor'
          },
          admin: {
            id: 3,
            nombre: 'Carlos',
            apellido: 'Rodríguez',
            email: 'carlos.rodriguez@derecho.edu',
            rol: 'admin'
          }
        };
        
        const mockUser = mockUsers[devRole];
        console.log('Login en modo desarrollo:', mockUser);
        if (onLoginSuccess) {
          onLoginSuccess(mockUser);
        }
        return;
      }

      const data = await authService.login(formData.email, formData.password);
      console.log('Login exitoso:', data);
      if (onLoginSuccess) {
        onLoginSuccess(data.user);
      }
    } catch (err) {
      console.error('Error de login:', err);
      setError(
        err.response?.data?.error || 
        'Error al iniciar sesión. Por favor, verifica tus credenciales.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setError('');
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.forgotPassword(formData.email);
      alert('Se han enviado las instrucciones a tu correo electrónico');
      setShowForgotPassword(false);
    } catch (err) {
      console.error('Error:', err);
      setError('Error al procesar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <div className="header-icon"></div>
        <h1>Facultad de Derecho - Sistema de Evaluaciones Orales</h1>
      </div>

      <div className="login-content">
        <div className="login-card">
          <div className="login-card-inner">
            <h2 className="login-title">Bienvenido</h2>
            <p className="login-subtitle">
              {showForgotPassword 
                ? 'Ingresa tu correo para recuperar tu contraseña.'
                : 'Inicie sesión para acceder al sistema.'}
            </p>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {!showForgotPassword ? (
              <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                  <label htmlFor="dev-role">Modo Desarrollo - Rol</label>
                  <select
                    id="dev-role"
                    value={devRole}
                    onChange={(e) => setDevRole(e.target.value)}
                    disabled={loading}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      backgroundColor: '#f9fafb',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="estudiante">Estudiante</option>
                    <option value="profesor">Profesor</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Correo Institucional</label>
                  <div className="input-wrapper">
                    <span className="input-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    </span>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Ingrese su correo (o deje vacío)"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="password">Contraseña</label>
                  <div className="input-wrapper">
                    <span className="input-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Ingrese su contraseña (o deje vacío)"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={loading}
                    >
                      {showPassword ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                          <line x1="1" y1="1" x2="23" y2="23"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="login-button"
                  disabled={loading}
                >
                  {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                </button>

                <div className="login-footer">
                  <button 
                    type="button" 
                    className="link-button"
                    onClick={handleForgotPassword}
                    disabled={loading}
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                  <a href="/register" className="link-button register-link">
                    Registrarse
                  </a>
                </div>
              </form>
            ) : (
              <form onSubmit={handleForgotPasswordSubmit} className="login-form">
                <div className="form-group">
                  <label htmlFor="email">Correo Institucional</label>
                  <div className="input-wrapper">
                    <span className="input-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    </span>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Ingrese su correo"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="login-button"
                  disabled={loading}
                >
                  {loading ? 'Enviando...' : 'Recuperar contraseña'}
                </button>

                <div className="login-footer">
                  <button 
                    type="button" 
                    className="link-button"
                    onClick={handleBackToLogin}
                    disabled={loading}
                  >
                    ← Volver al inicio de sesión
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
