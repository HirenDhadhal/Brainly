import { NextFunction, Request, Response } from 'express';
import { jwt_secret } from './config';
import jwt from 'jsonwebtoken';

export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers['authorization'];
  const decoded = jwt.verify(header as string, jwt_secret as string);

  console.log(decoded + ' req reached here');

  if (decoded) {
    //@ts-ignore
    req.userId = decoded.id;
    //@ts-ignore
    console.log('success ' + req.userId);

    next();
  } else {
    res.status(403).json({ message: 'You are not logged in' });
  }
};
