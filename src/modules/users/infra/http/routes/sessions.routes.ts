import { Router } from 'express';
import SessionController from '../controllers/SessionsControllers';

const SessionsRouter = Router();
const sessionsControllers = new SessionController();

SessionsRouter.post('/', sessionsControllers.create);

export default SessionsRouter;
