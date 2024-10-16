import type { NextFunction, Request, Response } from 'express';

import { verifyToken } from './auth.service';

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers?.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({
      message: 'Unauthorized',
    });
  } else {
    const decoded = verifyToken(token);

    if (!decoded) {
      res.status(401).json({
        message: 'Unauthorized',
      });
    } else {
      next();
    }
  }
}
