import { NextFunction, Request, Response } from 'express';

export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {  
  if (req.user) {
    console.log('success ' + req.user);
    next();
  } else {
    res.status(403).json({ message: 'You are not logged in' });
  }
};
