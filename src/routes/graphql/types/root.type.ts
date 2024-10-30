import { GraphQLNonNull, GraphQLObjectType, GraphQLSchema } from 'graphql';
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

const userResolver = new UserResolver();
const memberTypeResolver = new MemberTypeResolver();
const postResolver = new PostResolver();
const profileResolver = new ProfileResolver();

const id = { type: new GraphQLNonNull(UUIDType) };

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    // { "query": "query { users {id name balance} }"}
    users: {
      type: UsersType,
      async resolve(_parent, _args, context) {
        return userResolver.getAll(_parent, _args, context);
      },
    },
    // {"query": "query { user(id:\"c7f91b92-3396-45b2-baa8-159a32eafa6b\") {id balance name} }"}
    user: {
      type: UserType,
      args: { id },
      async resolve(parent, args, context) {
        return userResolver.getById(parent, args, context);
      },
    },
    // {"query": "query { memberTypes {id discount postsLimitPerMonth} }"}
    memberTypes: {
      type: MemberTypeTypes,
      async resolve(parent, args, context) {
        return memberTypeResolver.getAll(parent, args, context);
      },
    },
    // {"query": "query { memberType(id: BASIC) {id discount postsLimitPerMonth} }"}
    memberType: {
      type: MemberTypeType,
      args: {
        id: {
          type: MemberTypeId,
        },
      },
      async resolve(parent, args, context) {
        return memberTypeResolver.getById(parent, args, context);
      },
    },
    // {"query": "query { posts {id title content} }"}
    posts: {
      type: PostsType,
      async resolve(parent, args, context) {
        return postResolver.getAll(parent, args, context);
      },
    },
    // {"query": "query { post(id:\"6c73b7d5-f042-44fe-97d7-4f49424628fa\") {id title content} }"}
    post: {
      type: PostType,
      args: { id },
      async resolve(parent, args, context) {
        return postResolver.getById(parent, args, context);
      },
    },
    // {"query": "query { profiles {id isMale yearOfBirth} }"}
    profiles: {
      type: ProfilesType,
      async resolve(parent, args, context) {
        return profileResolver.getAll(parent, args, context);
      },
    },
    // {"query": "query { profile(id:\"0837ec81-f05e-480c-acb3-8ccd62de1d1c\") {id isMale yearOfBirth} }"}
    profile: {
      type: ProfileType,
      args: { id },
      async resolve(parent, args, context) {
        return profileResolver.getById(parent, args, context);
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: Query,
  types: [UserType, MemberTypeType, PostType, ProfileType],
});

export default schema;
