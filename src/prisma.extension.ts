import { PrismaClient } from '@prisma/client';
import pagination from 'prisma-extension-pagination';
import { performance } from 'perf_hooks';
import * as util from 'util';
import extension from 'prisma-paginate';
/**
 * Extended Prisma Client
 */
export const extendedPrismaClient = new PrismaClient()
  // .$extends(pagination())
  .$extends(extension)
  .$extends({
    query: {
      $allModels: {
        async $allOperations({ operation, model, args, query }) {
          const start = performance.now();
          const result = await query(args);
          const end = performance.now();
          const time = end - start;
          console.log(
            util.inspect(
              { model, operation, args, time },
              { showHidden: false, depth: null, colors: true },
            ),
          );
          return result;
        },
      },
    },
  });

export type ExtendedPrismaClient = typeof extendedPrismaClient;
