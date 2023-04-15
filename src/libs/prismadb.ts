/* eslint-disable no-undef, no-var, vars-on-top, no-unused-vars */
import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  /**
   * If not in production, the prisma global variable is set to the client instance.
   * This ensures that subsequent imports of this module will use the same instance of the PrismaClient class, which can help with performance and avoid creating multiple connections to the database.
   * -> not affected by hot reload of Next 13
   */
  globalThis.prisma = client;
}

export default client;
