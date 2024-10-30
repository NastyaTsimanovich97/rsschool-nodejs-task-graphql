import { Profile } from '@prisma/client';

export class ProfileResolver {
  async getAll(_parent, _args, context): Promise<Profile[]> {
    return context.prisma.profile.findMany();
  }

  async getById(_parent, args, context): Promise<Profile> {
    const { id } = args;

    const profile = await context.prisma.profile.findUnique({
      where: {
        id,
      },
    });

    return profile;
  }
}
