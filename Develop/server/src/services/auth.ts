
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';

import dotenv from 'dotenv';
dotenv.config();


export const authenticateToken = ({ req }: any, res: any) => {
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    return res.status(400).json({ message: 'Error: No token provided' });
  }
  
  try {
    const { data }:any = jwt.verify(token, process.env.JWT_SECRET_KEY || '', { maxAge: '2h' });
    res.user = data;
  } catch (error) {
    console.log('Invalid token');
  }

  return res.status(200);
};

export const signToken = (username: string, email: string, _id: unknown) => {
  const payload = { username, email, _id };
  const secretKey = process.env.JWT_SECRET_KEY || '';

  return jwt.sign({ data: payload }, secretKey, { expiresIn: '2h' })
};

export class AuthenticationError extends GraphQLError {
  constructor(message: string) {
    super(message, undefined, undefined, undefined, ['UNAUTHENTICATED']);
    Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
  }
};
