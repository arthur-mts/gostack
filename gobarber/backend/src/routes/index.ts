import { Router } from 'express';
import 'reflect-metadata';

import appointmentsRouter from './appointments.routes';
import usersRouter from './user.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use((req, res, next) => {
  console.log(`[${req.method.toUpperCase()}]: ${req.url}`);
  next();
});

routes.use('/appointments', appointmentsRouter);

routes.use('/users', usersRouter);

routes.use('/sessions', sessionsRouter);

export default routes;
