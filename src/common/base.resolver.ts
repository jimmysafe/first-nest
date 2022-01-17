import { Type } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { APIError, APIErrorCode } from './api.errors';
import { IBaseService } from './base.service';

type ResolverRoles = null;

interface IBaseResolverOptions<
  T extends Type<unknown>,
  RC extends Type<unknown>,
  RU extends Type<unknown>,
> {
  entity: {
    single: T;
    name?: string;
  };
  resolver: {
    single?: { roles?: ResolverRoles };
    list?: { roles?: ResolverRoles };
    create: {
      ref: RC;
      roles?: ResolverRoles;
    };
    update: {
      ref: RU;
      roles?: ResolverRoles;
    };
    delete?: {
      roles?: ResolverRoles;
    };
  };
}

export function BaseResolver<
  T extends Type<unknown>,
  RC extends Type<unknown>,
  RU extends Type<unknown>,
>({ entity, resolver }: IBaseResolverOptions<T, RC, RU>): any {
  const suffix = entity.name ?? entity.single.name.toLowerCase();

  @Resolver({ isAbstract: true })
  abstract class BaseResolverHost {
    constructor(private service: IBaseService<T, RC, RU>) {}

    @Query(() => entity.single, {
      name: `${suffix}`,
      nullable: true,
      description: `Get a single ${suffix}`,
    })
    async getSingle(@Args('id') id: string): Promise<T | undefined> {
      return this.service.findByID(id);
    }

    @Query(() => [entity.single], {
      name: `${suffix}s`,
      description: `Get list of ${suffix}s`,
    })
    async getList() {
      return this.service.findAll();
    }

    @Mutation(() => entity.single, {
      name: `${suffix}Create`,
      description: `Creates a ${suffix}`,
    })
    async create(
      @Args({ name: 'input', type: () => resolver.create.ref }) input: RC,
    ) {
      return this.service.create(input as any);
    }

    @Mutation(() => entity.single, {
      name: `${suffix}Update`,
      nullable: true,
      description: `Update an existing ${suffix} object`,
    })
    async update(
      @Args({ name: 'id', type: () => ID }) id: string,
      @Args({ name: 'input', type: () => resolver.update.ref }) input: RU,
    ): Promise<T | null> {
      const selectedEntity = await this.service.findByID(id);

      if (!selectedEntity) throw new APIError(APIErrorCode.NOT_FOUND, suffix);

      return this.service.update(selectedEntity, input as any);
    }

    @Mutation(() => Boolean, {
      name: `${suffix}Delete`,
      nullable: true,
      description: `Delete existing ${suffix}`,
    })
    async delete(
      @Args({ name: 'id', type: () => ID }) id: string,
    ): Promise<boolean | null> {
      const selectedEntity = await this.service.findByID(id);

      if (!selectedEntity) throw new APIError(APIErrorCode.NOT_FOUND, suffix);

      return this.service.delete(selectedEntity);
    }
  }
  return BaseResolverHost;
}
