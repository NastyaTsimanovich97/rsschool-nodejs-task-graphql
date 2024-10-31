import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UsersType, UserType } from '../features/users/types/user.type.js';

import {
  MemberTypeId,
  MemberTypeType,
  MemberTypeTypes,
} from '../features/memberTypes/types/memberType.type.js';

import { UserResolver } from '../features/users/resolvers/user.resolver.js';
import { MemberTypeResolver } from '../features/memberTypes/resolvers/memberType.resolver.js';
import { UUIDType } from './uuid.js';
import { PostsType, PostType } from '../features/posts/types/post.type.js';
import { PostResolver } from '../features/posts/resolvers/post.resolver.js';
import { ProfileResolver } from '../features/profiles/resolvers/profile.resolver.js';
import { ProfilesType, ProfileType } from '../features/profiles/types/profile.type.js';

// {"query": "query { user(id:\"c7f91b92-3396-45b2-baa8-159a32eafa6b\") {id balance name} }"}
// {"query": "query { users {id name balance} }"}
// {"query": "query { memberTypes {id discount postsLimitPerMonth} }"}
// {"query": "query { post(id:\"6c73b7d5-f042-44fe-97d7-4f49424628fa\") {id title content} }"}
// {"query": "query { posts {id title content} }"}
// {"query": "query { profile(id:\"0837ec81-f05e-480c-acb3-8ccd62de1d1c\") {id isMale yearOfBirth} }"}
// {"query": "query { profiles {id isMale yearOfBirth} }"}

const userResolver = new UserResolver();
const memberTypeResolver = new MemberTypeResolver();
const postResolver = new PostResolver();
const profileResolver = new ProfileResolver();

const id = { type: new GraphQLNonNull(UUIDType) };

export const Query = new GraphQLObjectType({
  name: 'Query',

  fields: () => ({
    user: {
      type: UserType,
      args: { id },
      async resolve(parent, args, context) {
        return userResolver.getById(parent, args, context);
      },
    },

    users: {
      type: UsersType,
      async resolve(_parent, _args, context) {
        return userResolver.getAll(_parent, _args, context);
      },
    },

    memberType: {
      type: MemberTypeType,
      args: {
        id: {
          type: new GraphQLNonNull(MemberTypeId),
        },
      },
      async resolve(parent, args, context) {
        return memberTypeResolver.getById(parent, args, context);
      },
    },

    memberTypes: {
      type: MemberTypeTypes,
      async resolve(parent, args, context) {
        return memberTypeResolver.getAll(parent, args, context);
      },
    },

    post: {
      type: PostType,
      args: { id },
      async resolve(parent, args, context) {
        return postResolver.getById(parent, args, context);
      },
    },

    posts: {
      type: PostsType,
      async resolve(parent, args, context) {
        return postResolver.getAll(parent, args, context);
      },
    },

    profile: {
      type: ProfileType,
      args: { id },
      async resolve(parent, args, context) {
        return profileResolver.getById(parent, args, context);
      },
    },

    profiles: {
      type: ProfilesType,
      async resolve(parent, args, context) {
        return profileResolver.getAll(parent, args, context);
      },
    },
  }),
});
