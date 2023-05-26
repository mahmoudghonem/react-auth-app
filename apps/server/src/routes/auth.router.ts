import { body } from 'express-validator';
import { expressValidator } from './../validator/index';
import express from 'express';
import { AuthController } from './../controllers/auth/index';

function authRoutes() {
  const router = express.Router();
  const authController = new AuthController();

  router.post('/login', expressValidator([
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').notEmpty().withMessage('Password is required').isLength({ min: 8, max: 25 }).withMessage('Password must be between 8 and 25 characters')
  ]), authController.loginController);

  router.post('/register', expressValidator([
    body('first_name').isString().notEmpty().withMessage('First name is required'),
    body('last_name').isString().notEmpty().withMessage('First name is required'),
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').notEmpty().withMessage('Password is required').isLength({ min: 8, max: 25 }).withMessage('Password must be between 8 and 25 characters')
  ]), authController.registerController);

  return router;
}

export default authRoutes();