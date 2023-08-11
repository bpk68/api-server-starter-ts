import express from 'express';

// Import individual route profiles from controllers
import usersRoute from '@routes/users';

const router = express.Router();

// Pass our router instance to controllers
router.use('/users', usersRoute(router));

export default router;
