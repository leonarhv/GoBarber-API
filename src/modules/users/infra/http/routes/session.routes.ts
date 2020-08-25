import { Router } from 'express';

import SessionController from '../controllers/SessionController';

const sessionsRouter = Router();
const sessionController = new SessionController();

// DTO Data Transfer Object

// Rota deve receber a requisição, chamar outro arquivo e devolver uma resposta

sessionsRouter.post('/', sessionController.create);

export default sessionsRouter;
