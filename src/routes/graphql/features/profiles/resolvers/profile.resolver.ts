import { Profile, PrismaClient } from '@prisma/client';

export class ProfileResolver {
  private prismaClient = new PrismaClient();

  async getAll(_parent, _args, context): Promise<Profile[]> {
    return context.prisma.profile.findMany();
  }

  async getById(_parent, args, context): Promise<Profile> {
    const { id } = args;

    const profile = await context.prisma.profile.findUnique({
      where: { id },
    });

    return profile;
  }

  async getByUserId(args): Promise<Profile | null> {
    const { id: userId } = args;

    return this.prismaClient.profile.findUnique({ where: { userId } });
  }
}
