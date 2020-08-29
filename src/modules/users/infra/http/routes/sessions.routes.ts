import { Router } from 'express';
import AuthenticateUserServices from '@modules/users/services/AuthenticateUserServices';

const SessionsRouter = Router();

SessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const authenticateUserServices = new AuthenticateUserServices();
  const { user, token } = await authenticateUserServices.execute({
    email,
    password,
  });
  delete user.password;
  return response.json({ user, token });
});

export default SessionsRouter;
