import { MemberType, PrismaClient } from '@prisma/client';

export class MemberTypeResolver {
  private prismaClient = new PrismaClient();

  async getAll(_parent, _args, context): Promise<MemberType[]> {
    return await context.prisma.memberType.findMany();
  }

  async getById(_parent, args, context): Promise<MemberType> {
    const { id } = args;

    const memberType = await context.prisma.memberType.findUnique({
      where: { id },
    });

    return memberType;
  }

  async getByProfile(args): Promise<MemberType | null> {
    const { memberTypeId } = args;

    return this.prismaClient.memberType.findUnique({ where: { id: memberTypeId } });
  }
}
