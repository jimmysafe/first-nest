import { DeepPartial, Repository } from 'typeorm';
import { Node } from './base.entity';

export interface IBaseService<T, C, U> {
  findByID(
    id: string,
    relations?: Extract<keyof T, string>[],
  ): Promise<T | undefined>;
  findAll(): Promise<T[]>;
  create(input: C): Promise<T>;
  update(entity: T, input: U): Promise<T>;
  delete(entity: T): Promise<boolean | null>;
}

interface IEntityClassBuilder<T extends Node> {
  new (): T;
  of(this: new () => T, params: Partial<T>): T;
}

export class BaseService<T extends Node, C, U>
  implements IBaseService<T, C, U>
{
  constructor(
    protected entity: IEntityClassBuilder<T>,
    protected repository: Repository<T>,
  ) {}

  /**
   * Find a single entity by its ID
   * @param id UUID to query
   * @param relations Entity relations to populate
   */
  async findByID(
    id: string,
    relations: Extract<keyof T, string>[] = [],
  ): Promise<T | undefined> {
    return this.repository.findOneOrFail(id, { relations });
  }

  /**
   * Get all entites
   */
  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  /**
   * Create a new entity and save to the data store
   * @param input EntityInput object
   */
  async create(input: C): Promise<T> {
    const manager = this.repository.manager;

    return manager.save(this.entity.of(input));
  }

  /**
   * Update an entity object and save to the data store
   * Only updates fields that are set in the input
   * @param entity Entity object to update
   * @param input Input containing requiring update
   */
  async update(entity: T, input: U): Promise<T> {
    const updatedUser = await this.repository.save({
      ...entity,
      ...input,
    });
    return updatedUser;
  }

  /**
   * Delete an entity either by its ID or by providing an entity object
   * @param entity ID as a string, or an entity object
   * @returns The provided entity/ID if successfull, otherwise null
   */
  async delete(entity: T): Promise<boolean | null> {
    await this.repository.remove(entity);
    return true;
  }
}
