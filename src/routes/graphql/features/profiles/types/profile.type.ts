import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';

import { UUIDType } from '../../../types/uuid.js';
import { MemberTypeId, MemberTypeType } from '../../memberTypes/types/memberType.type.js';
import { MemberTypeResolver } from '../../memberTypes/resolvers/memberType.resolver.js';

const memberTypeResolver = new MemberTypeResolver();

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    memberTypeId: { type: MemberTypeId },
    memberType: {
      type: MemberTypeType,
      resolve: async (args) => memberTypeResolver.getByProfile(args),
    },
  }),
});

export const ProfilesType = new GraphQLList(ProfileType);
