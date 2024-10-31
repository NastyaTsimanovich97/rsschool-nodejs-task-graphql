import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { graphql, parse, validate } from 'graphql';
import depthLimit from 'graphql-depth-limit';
import { createGqlResponseSchema, gqlResponseSchema, gqlSchema } from './schemas.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query, variables } = req.body;

      const queryDoc = parse(query);

      const validationErrors = validate(gqlSchema, queryDoc, [depthLimit(5)]);

      if (validationErrors?.length > 0) {
        return { data: '', errors: validationErrors };
      }

      const { data, errors } = await graphql({
        schema: gqlSchema,
        source: query,
        contextValue: { prisma },
        variableValues: variables,
      });

      return { data, errors };
    },
  });
};

export default plugin;
