import { PrismaLibSql } from '@prisma/adapter-libsql'
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

const url = process.env.DATABASE_URL

if (!url) {
  throw new Error('Error: DATABASE_URL is not defined in the environment variables.')
}

const adapter = new PrismaLibSql({
  url,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
