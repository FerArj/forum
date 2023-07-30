import express from 'express';
const router = express.Router();

import { enviarMensagem } from '../controllers/messageController.mjs';

router.post('/enviarMensagem', enviarMensagem);

export default router;
