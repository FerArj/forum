import express from 'express';
const router = express.Router();

import userController from '../controllers/userControllers.mjs';

router.post('/cadastrarUsuario', userController.cadastrarUsuario);

router.post('/autenticarUsuario', userController.autenticarUsuario);

export default router;
