/* eslint-disable camelcase */
import path from 'path';
import fs from 'fs';
import AppError from '@shared/error/AppError';
import uploadConfig from '@config/upload';
import { injectable, inject } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}
@injectable()
class UpdateUserAvatarSernice {
  constructor(
    @inject('UsersRepositories')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }
    if (user.avatar) {
      const userAvatarFilePatch = path.join(
        uploadConfig.directory,
        user.avatar,
      );
      const userAvatarFilePatchExisits = await fs.promises.stat(
        userAvatarFilePatch,
      );
      if (userAvatarFilePatchExisits) {
        await fs.promises.unlink(userAvatarFilePatch);
      }
    }
    user.avatar = avatarFilename;
    await this.usersRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatarSernice;
