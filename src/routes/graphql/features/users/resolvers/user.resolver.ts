import { User } from '@prisma/client';

export class UserResolver {
  async getAll(_parent, _args, context): Promise<User[]> {
    return await context.prisma.user.findMany();
  }

  async getById(_parent, args, context): Promise<User> {
    const { id } = args;

    const user = await context.prisma.user.findUnique({
      where: {
        id,
      },
    });
    // if (user === null) {
    //   throw httpErrors.notFound();
    // }
    return user;
  }
}
