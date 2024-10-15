import type { Request, Response } from 'express';

import { createUser, getAllUsers } from './user.service';

export async function getAllUserHandler(req: Request, res: Response) {
  const users = await getAllUsers();

  res.json(users);
}

export async function createUserHandler(req: Request, res: Response) {
  const data = req.body;

  try {
    const newUser = await createUser(data);

    // Send Email

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
  }
}
