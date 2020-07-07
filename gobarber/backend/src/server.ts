/* eslint-disable no-console */
import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import routes from './routes';

import './database';
import './config/dotenv';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

const app = express();

app.use(express.json());
app.use(routes);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }

  console.error(err);

  return res
    .status(500)
    .json({ status: 'error', message: 'Internal server error' });
});

app.use('/files', express.static(uploadConfig.directory));

app.listen(3333, () => {
  console.log('Server on :)');
});
