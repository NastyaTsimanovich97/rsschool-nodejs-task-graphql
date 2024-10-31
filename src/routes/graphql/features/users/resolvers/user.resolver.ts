import { PrismaClient, SubscribersOnAuthors, User } from '@prisma/client';

export class UserResolver {
  private prismaClient = new PrismaClient();

  async getAll(_parent, _args, context): Promise<User[]> {
    return context.prisma.user.findMany();
  }

  async getById(_parent, args, context): Promise<User> {
    const { id } = args;

    const user = await context.prisma.user.findUnique({
      where: { id },
    });

    return user;
  }

  async getUserSubscribedTo(args): Promise<User[]> {
    const { id } = args;

    const subscribers = await this.prismaClient.subscribersOnAuthors.findMany({
      select: { author: true },
      where: { subscriberId: id },
    });

    return subscribers.map((s) => s.author);
  }

  async getSubscribedToUser(args): Promise<User[]> {
    const { id } = args;

    const subscribers = await this.prismaClient.subscribersOnAuthors.findMany({
      select: { subscriber: true },
      where: { authorId: id },
    });

    return subscribers.map((s) => s.subscriber);
  }

  async create({ dto }): Promise<User> {
    return this.prismaClient.user.create({ data: dto });
  }

  async update({ id, dto }): Promise<User> {
    return this.prismaClient.user.update({ where: { id }, data: dto });
  }

  async delete({ id }): Promise<string> {
    await this.prismaClient.user.delete({ where: { id } });

    return 'User is deleted';
  }

  async subscribeTo({ userId, authorId }): Promise<string> {
    await this.prismaClient.subscribersOnAuthors.create({
      data: { subscriberId: userId, authorId },
    });

    return 'User is subscribed!';
  }

  async unsubscribeFrom({ userId, authorId }): Promise<string> {
    await this.prismaClient.subscribersOnAuthors.delete({
      where: {
        subscriberId_authorId: {
          subscriberId: userId,
          authorId,
        },
      },
    });

    return 'User is unsubscribed!';
  }
}
