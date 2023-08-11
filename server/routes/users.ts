import type { Router } from 'express';
import {
  getUser,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from '@controllers/users';

const userRoutes = (router: Router) => {
  router.get('/users', getUsers);
  router.get('/user/:id', getUser);
  router.post('/users', addUser);
  router.put('/user/:id', updateUser);
  router.delete('/user/:id', deleteUser);

  return router;
};

export default userRoutes;
