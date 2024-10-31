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

  async create({ dto }): Promise<Profile> {
    return this.prismaClient.profile.create({ data: dto });
  }

  async update({ id, dto }): Promise<Profile> {
    return this.prismaClient.profile.update({ where: { id }, data: dto });
  }

  async delete({ id }): Promise<string> {
    await this.prismaClient.profile.delete({ where: { id } });

    return 'Profile is deleted';
  }
}
