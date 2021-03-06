import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing!', 401);
  }

  const [, token] = authHeader.split(' ');

  const decoded = verify(token, authConfig.jwt.secret) as TokenPayload;

  req.user = { id: decoded.sub };

  return next();
}
