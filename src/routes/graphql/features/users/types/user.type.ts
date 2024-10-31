import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import { UUIDType } from '../../../types/uuid.js';
import { PostResolver } from '../../posts/resolvers/post.resolver.js';
import { PostsType } from '../../posts/types/post.type.js';
import { ProfileResolver } from '../../profiles/resolvers/profile.resolver.js';
import { ProfileType } from '../../profiles/types/profile.type.js';
import { UserResolver } from '../resolvers/user.resolver.js';

const profileResolver = new ProfileResolver();
const postResolver = new PostResolver();
const userResolver = new UserResolver();

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },

    profile: {
      type: ProfileType,
      resolve: async (args) => profileResolver.getByUserId(args),
    },

    posts: {
      type: PostsType,
      resolve: async (args) => postResolver.getByUserId(args),
    },

    userSubscribedTo: {
      type: UsersType,
      resolve: async (args) => userResolver.getUserSubscribedTo(args),
    },

    subscribedToUser: {
      type: UsersType,
      resolve: async (args) => userResolver.getSubscribedToUser(args),
    },
  }),
});

export const UsersType = new GraphQLList(UserType);
