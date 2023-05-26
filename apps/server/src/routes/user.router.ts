import express from 'express';
import { UserController } from '../controllers';
import { validateToken } from '../middlewares/validate_token';

function userRoutes() {
  const router = express.Router();
  const userController = new UserController();
  router.get('/', validateToken, userController.getUserData)

  return router;
}

export default userRoutes();