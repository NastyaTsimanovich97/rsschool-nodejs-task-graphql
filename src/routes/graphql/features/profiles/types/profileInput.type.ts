import {
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLBoolean,
  GraphQLInt,
} from 'graphql';
import { UUIDType } from '../../../types/uuid.js';
import { MemberTypeId } from '../../memberTypes/types/memberType.type.js';

export const CreateProfileInputType = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: () => ({
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    userId: { type: new GraphQLNonNull(UUIDType) },
    memberTypeId: { type: new GraphQLNonNull(MemberTypeId) },
  }),
});

export const ChangeProfileInputType = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: () => ({
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: MemberTypeId },
  }),
});
