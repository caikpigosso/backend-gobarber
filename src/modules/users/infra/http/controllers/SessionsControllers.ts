import { Request, Response } from 'express';
import AuthenticateUserServices from '@modules/users/services/AuthenticateUserServices';

import { container } from 'tsyringe';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authenticateUserServices = container.resolve(
      AuthenticateUserServices,
    );
    const { user, token } = await authenticateUserServices.execute({
      email,
      password,
    });
    delete user.password;
    return response.json({ user, token });
  }
}
