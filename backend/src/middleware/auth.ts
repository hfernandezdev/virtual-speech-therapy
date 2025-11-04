import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: any;
}

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  // Para desarrollo, simular usuario autenticado
  req.user = {
    id: 'mock-therapist-id',
    role: 'therapist',
    name: 'Demo Therapist'
  };
  next();
};

// En producción usaríamos:
/*
const token = req.header('Authorization')?.replace('Bearer ', '');
if (!token) {
  return res.status(401).json({ message: 'No token, authorization denied' });
}

try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET!);
  req.user = decoded;
  next();
} catch (error) {
  res.status(401).json({ message: 'Token is not valid' });
}
*/
