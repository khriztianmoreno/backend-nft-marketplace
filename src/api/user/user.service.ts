import { PrismaClient } from '@prisma/client';

import { hashPassword } from '../../auth/utils/crypto';
import type { User } from './user.type';

const prisma = new PrismaClient();

export async function getAllUsers() {
  const users = await prisma.user.findMany();
  return users;
}

export async function createUser(input: User) {
  if (!input.password) {
    throw new Error('Password is required');
  }

  const hashedPassword = await hashPassword(input.password);

  const data: User = {
    ...input,
    password: hashedPassword,
    // passwordResetToken
    // passwordResetTokenExpiry
  };

  const newUser = await prisma.user.create({
    data,
  });

  return newUser;
}

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}
