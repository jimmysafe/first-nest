import { ConfigService } from '@nestjs/config';
import { GqlModuleOptions } from '@nestjs/graphql';
import { Request, Response } from 'express';

export interface APIContext {
  req: Request;
  res: Response;
}

export const apolloConfig = (
  configService: ConfigService,
): GqlModuleOptions => {
  return {
    autoSchemaFile: true,
    sortSchema: true,
    context: ({ req, res }): APIContext => ({ req, res }),
    introspection: true,
    playground: true,
  };
};
