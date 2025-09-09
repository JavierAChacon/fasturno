import { betterAuth } from 'better-auth'
import type { BetterAuthOptions } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { PrismaClient } from '@prisma/client'
import { organization } from 'better-auth/plugins'

const prisma = new PrismaClient()

export const authConfig = {
  database: prismaAdapter(prisma, { provider: 'postgresql' }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    minPasswordLength: 8,
  },
  user: {
    additionalFields: {
      lastName: { type: 'string', required: true },
      idNumber: { type: 'string', required: true, unique: true },
      phone: { type: 'string', required: true, unique: true },
    },
  },
  plugins: [organization({ allowUserToCreateOrganization: false })],
} satisfies BetterAuthOptions

export type AuthInstance = ReturnType<typeof betterAuth<typeof authConfig>>

export const auth = betterAuth(authConfig) as AuthInstance
