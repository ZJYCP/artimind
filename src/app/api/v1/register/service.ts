import prisma from '@/lib/prisma'
import { saltAndHashText } from '@/lib/utils'
export async function verifyUser(email: string, password: string) {
  const user = await findUserByEmail(email)
  if (user) {
    const salt = user.salt
    if (saltAndHashText(password, salt).hash === user.passwordHash) {
      return user
    }
  }
  return null
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email: email,
    },
  })
}

export async function createUserByEmail(email: string, password: string) {
  const { salt, hash } = saltAndHashText(password)
  return prisma.user.create({
    data: {
      email: email,
      passwordHash: hash,
      salt: salt,
    },
  })
}
