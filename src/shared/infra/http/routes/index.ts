import { Router } from 'express';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import SessionsRouters from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', SessionsRouters);

export default routes;
