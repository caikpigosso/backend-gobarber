/* eslint-disable camelcase */
import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import AppError from '@shared/error/AppError';
import uploadConfig from '@config/upload';
import User from '../infra/typeorm/entities/User';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarSernice {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(user_id);
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
    await userRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatarSernice;
