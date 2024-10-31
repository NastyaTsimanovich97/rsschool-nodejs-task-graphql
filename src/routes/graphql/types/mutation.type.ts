import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { PostResolver } from '../features/posts/resolvers/post.resolver.js';
import { PostType } from '../features/posts/types/post.type.js';
import {
  CreatePostInputType,
  ChangePostInputType,
} from '../features/posts/types/postInput.type.js';
import { ProfileResolver } from '../features/profiles/resolvers/profile.resolver.js';
import { ProfileType } from '../features/profiles/types/profile.type.js';
import {
  CreateProfileInputType,
  ChangeProfileInputType,
} from '../features/profiles/types/profileInput.type.js';
import { UserResolver } from '../features/users/resolvers/user.resolver.js';
import { UserType } from '../features/users/types/user.type.js';
import {
  CreateUserInputType,
  ChangeUserInputType,
} from '../features/users/types/userInput.type.js';
import { UUIDType } from './uuid.js';

const userResolver = new UserResolver();
const postResolver = new PostResolver();
const profileResolver = new ProfileResolver();

const id = { type: new GraphQLNonNull(UUIDType) };
const DeleteResponseType = new GraphQLNonNull(GraphQLString);
const SubscribeResponseType = new GraphQLNonNull(GraphQLString);

export const Mutation = new GraphQLObjectType({
  name: 'Mutation',

  fields: () => ({
    createUser: {
      type: UserType,
      args: { dto: { type: CreateUserInputType } },
      resolve: async (_parent, args) => await userResolver.create(args),
    },

    createProfile: {
      type: ProfileType,
      args: { dto: { type: CreateProfileInputType } },
      resolve: async (_parent, args) => await profileResolver.create(args),
    },

    createPost: {
      type: PostType,
      args: { dto: { type: CreatePostInputType } },
      resolve: async (_parent, args) => await postResolver.create(args),
    },

    changeUser: {
      type: UserType,
      args: { id, dto: { type: ChangeUserInputType } },
      resolve: async (_parent, args) => await userResolver.update(args),
    },

    changeProfile: {
      type: ProfileType,
      args: { id, dto: { type: ChangeProfileInputType } },
      resolve: async (_parent, args) => await profileResolver.update(args),
    },

    changePost: {
      type: PostType,
      args: { id, dto: { type: ChangePostInputType } },
      resolve: async (_parent, args) => await postResolver.update(args),
    },

    deleteUser: {
      type: DeleteResponseType,
      args: { id },
      resolve: async (_parent, args) => await userResolver.delete(args),
    },

    deleteProfile: {
      type: DeleteResponseType,
      args: { id },
      resolve: async (_parent, args) => await profileResolver.delete(args),
    },

    deletePost: {
      type: DeleteResponseType,
      args: { id },
      resolve: async (_parent, args) => await postResolver.delete(args),
    },

    subscribeTo: {
      type: SubscribeResponseType,
      args: { userId: id, authorId: id },
      resolve: async (_parent, args) => await userResolver.subscribeTo(args),
    },

    unsubscribeFrom: {
      type: SubscribeResponseType,
      args: { userId: id, authorId: id },
      resolve: async (_parent, args) => await userResolver.unsubscribeFrom(args),
    },
  }),
});
