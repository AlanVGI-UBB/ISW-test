import express from 'express';
import authController from '../controllers/authController.js';
import { authMiddleware, checkRole } from '../middleware/authMiddleware.js';
import {
  registerValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation
} from '../middleware/validators.js';

const router = express.Router();

// Rutas públicas
router.post('/register', registerValidation, authController.register);
router.post('/login', loginValidation, authController.login);
router.post('/forgot-password', forgotPasswordValidation, authController.forgotPassword);
router.post('/reset-password', resetPasswordValidation, authController.resetPassword);

// Rutas protegidas
router.get('/profile', authMiddleware, authController.getProfile);

// Ruta de prueba para verificar roles
router.get('/admin', authMiddleware, checkRole('admin'), (req, res) => {
  res.json({ message: 'Acceso autorizado como admin', user: req.user });
});

export default router;
