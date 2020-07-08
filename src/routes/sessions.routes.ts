import { Router } from 'express';
import AuthenticateUserServices from '../services/AuthenticateUserServices';

const SessionsRouter = Router();

SessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;
    const authenticateUserServices = new AuthenticateUserServices();
    const { user, token } = await authenticateUserServices.execute({
      email,
      password,
    });
    delete user.password;
    return response.json({ user, token });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default SessionsRouter;
