import type { Request, Response } from 'express';

import { createUser, getAllUsers } from './user.service';
import { sendMailSendGrid } from '../../utils/mail';

export async function getAllUserHandler(req: Request, res: Response) {
  const users = await getAllUsers();

  res.json(users);
}

export async function createUserHandler(req: Request, res: Response) {
  const data = req.body;

  try {
    const newUser = await createUser(data);

    // Send email
    const emailData = {
      from: 'No reply <cristian.moreno@makeitreal.camp>',
      to: newUser.email,
      subject: 'Welcome to the app',
      templateId: 'd-649011f35b854690a0e5f47de11eb2f2',
      dynamicTemplateData: {
        firstName: newUser.name,
        lastName: newUser.lastName,
        url: `${process.env.FRONTEND_URL}/verify-account/${newUser.passwordResetToken}`,
      },
    };
    sendMailSendGrid(emailData);

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
  }
}
