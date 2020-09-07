import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UsersControllers from '../controllers/UsersControllers';
import UserAvatarControllers from '../controllers/UserAvatarControllers';

const userRouter = Router();
const usersControllers = new UsersControllers();
const userAvatarControllers = new UserAvatarControllers();
const upload = multer(uploadConfig);

userRouter.post('/', usersControllers.create);

userRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarControllers.update,
);

export default userRouter;
