import { Post } from '@prisma/client';

export class PostResolver {
  async getAll(_parent, _args, context): Promise<Post[]> {
    return context.prisma.post.findMany();
  }

  async getById(_parent, args, context): Promise<Post> {
    const { id } = args;

    const post = await context.prisma.post.findUnique({
      where: {
        id,
      },
    });

    return post;
  }
}
