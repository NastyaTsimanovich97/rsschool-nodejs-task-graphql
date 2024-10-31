import { Post, PrismaClient } from '@prisma/client';

export class PostResolver {
  private prismaClient = new PrismaClient();

  async getAll(_parent, _args, context): Promise<Post[]> {
    return context.prisma.post.findMany();
  }

  async getById(_parent, args, context): Promise<Post> {
    const { id } = args;

    const post = await context.prisma.post.findUnique({
      where: { id },
    });

    return post;
  }

  async getByUserId(args): Promise<Post[]> {
    const { id: authorId } = args;

    return this.prismaClient.post.findMany({ where: { authorId } });
  }
}
