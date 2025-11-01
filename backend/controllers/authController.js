import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/database.js';

class AuthController {
  // Registro de usuario
  async register(req, res) {
    const { nombre, apellido, email, password, rol } = req.body;

    try {
      // Validar que el email no exista
      const userExists = await pool.query(
        'SELECT * FROM usuarios WHERE email = $1',
        [email]
      );

      if (userExists.rows.length > 0) {
        return res.status(400).json({ 
          error: 'El correo electrónico ya está registrado' 
        });
      }

      // Hashear la contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Insertar usuario
      const result = await pool.query(
        `INSERT INTO usuarios (nombre, apellido, email, password, rol) 
         VALUES ($1, $2, $3, $4, $5) 
         RETURNING id, nombre, apellido, email, rol, fecha_creacion`,
        [nombre, apellido, email, hashedPassword, rol || 'estudiante']
      );

      const user = result.rows[0];

      // Generar token JWT
      const token = jwt.sign(
        { id: user.id, email: user.email, rol: user.rol },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.status(201).json({
        message: 'Usuario registrado exitosamente',
        user: {
          id: user.id,
          nombre: user.nombre,
          apellido: user.apellido,
          email: user.email,
          rol: user.rol
        },
        token
      });
    } catch (error) {
      console.error('Error en registro:', error);
      res.status(500).json({ 
        error: 'Error al registrar usuario',
        details: error.message 
      });
    }
  }

  // Login de usuario
  async login(req, res) {
    const { email, password } = req.body;

    try {
      // Buscar usuario por email
      const result = await pool.query(
        'SELECT * FROM usuarios WHERE email = $1 AND activo = true',
        [email]
      );

      if (result.rows.length === 0) {
        return res.status(401).json({ 
          error: 'Credenciales inválidas' 
        });
      }

      const user = result.rows[0];

      // Verificar contraseña
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.status(401).json({ 
          error: 'Credenciales inválidas' 
        });
      }

      // Generar token JWT
      const token = jwt.sign(
        { id: user.id, email: user.email, rol: user.rol },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      // Actualizar última fecha de actualización
      await pool.query(
        'UPDATE usuarios SET fecha_actualizacion = CURRENT_TIMESTAMP WHERE id = $1',
        [user.id]
      );

      res.json({
        message: 'Inicio de sesión exitoso',
        user: {
          id: user.id,
          nombre: user.nombre,
          apellido: user.apellido,
          email: user.email,
          rol: user.rol
        },
        token
      });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ 
        error: 'Error al iniciar sesión',
        details: error.message 
      });
    }
  }

  // Obtener información del usuario autenticado
  async getProfile(req, res) {
    try {
      const result = await pool.query(
        'SELECT id, nombre, apellido, email, rol, fecha_creacion FROM usuarios WHERE id = $1',
        [req.user.id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      res.json({ user: result.rows[0] });
    } catch (error) {
      console.error('Error al obtener perfil:', error);
      res.status(500).json({ 
        error: 'Error al obtener perfil',
        details: error.message 
      });
    }
  }

  // Solicitar recuperación de contraseña
  async forgotPassword(req, res) {
    const { email } = req.body;

    try {
      const result = await pool.query(
        'SELECT id, email FROM usuarios WHERE email = $1',
        [email]
      );

      if (result.rows.length === 0) {
        // Por seguridad, no revelar si el email existe o no
        return res.json({ 
          message: 'Si el correo existe, recibirás instrucciones para recuperar tu contraseña' 
        });
      }

      const user = result.rows[0];

      // Generar token único
      const resetToken = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      // Guardar token en la base de datos
      const expiresAt = new Date(Date.now() + 3600000); // 1 hora
      await pool.query(
        `INSERT INTO password_reset_tokens (usuario_id, token, expira_en) 
         VALUES ($1, $2, $3)`,
        [user.id, resetToken, expiresAt]
      );

      // TODO: Enviar email con el token
      // Aquí implementarías el envío de email con nodemailer
      
      res.json({ 
        message: 'Si el correo existe, recibirás instrucciones para recuperar tu contraseña',
        // Solo para desarrollo, remover en producción:
        resetToken: process.env.NODE_ENV === 'development' ? resetToken : undefined
      });
    } catch (error) {
      console.error('Error al solicitar recuperación:', error);
      res.status(500).json({ 
        error: 'Error al procesar solicitud',
        details: error.message 
      });
    }
  }

  // Resetear contraseña
  async resetPassword(req, res) {
    const { token, newPassword } = req.body;

    try {
      // Verificar token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Buscar token en la base de datos
      const tokenResult = await pool.query(
        `SELECT * FROM password_reset_tokens 
         WHERE token = $1 AND usuario_id = $2 AND usado = false AND expira_en > NOW()`,
        [token, decoded.id]
      );

      if (tokenResult.rows.length === 0) {
        return res.status(400).json({ 
          error: 'Token inválido o expirado' 
        });
      }

      // Hashear nueva contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // Actualizar contraseña
      await pool.query(
        'UPDATE usuarios SET password = $1, fecha_actualizacion = CURRENT_TIMESTAMP WHERE id = $2',
        [hashedPassword, decoded.id]
      );

      // Marcar token como usado
      await pool.query(
        'UPDATE password_reset_tokens SET usado = true WHERE id = $1',
        [tokenResult.rows[0].id]
      );

      res.json({ message: 'Contraseña actualizada exitosamente' });
    } catch (error) {
      console.error('Error al resetear contraseña:', error);
      res.status(500).json({ 
        error: 'Error al resetear contraseña',
        details: error.message 
      });
    }
  }
}

export default new AuthController();
