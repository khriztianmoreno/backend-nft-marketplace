import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

import type { User } from './user.type';

const prisma = new PrismaClient();

/**
 * Hash password
 * @param password password to hash
 * @param factor Number of rounds to hasg the password, default is 10
 * @returns Promise<string> hashed password
 */
export async function hashPassword(
  password: string,
  factor?: number,
): Promise<string> {
  // 1. salt
  const salt = await bcrypt.genSalt(factor);

  // 2. hash
  const hashed = await bcrypt.hash(password, salt);

  return hashed;
}

export async function getAllUsers() {
  const users = await prisma.user.findMany();
  return users;
}

export async function createUser(input: User) {
  if (!input.password) {
    throw new Error('Password is required');
  }

  const hashedPassword = await hashPassword(input.password);
  console.log('🚀 ~ createUser ~ hashedPassword:', hashedPassword);

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
