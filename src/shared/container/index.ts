import { container } from 'tsyringe';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppontmentsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepositories from '@modules/users/infra/typeorm/repositories/UsersRepositories';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepositories',
  UsersRepositories,
);
