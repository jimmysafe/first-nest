import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { Node } from '../common/base.entity';
import fs from 'fs';

export enum UserRole {
  /**
   * Full user
   * @example Users
   */
  USER = 'USER',
  /**
   * Owner access across all reams
   * Some user administration privileges
   */
  STAFF = 'STAFF',
  /**
   * Full access to all resources
   */
  ADMIN = 'ADMIN',
}
registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'Permissions the user has',
});

@Entity('users')
@ObjectType()
export class User extends Node {
  @Column()
  @Field()
  name: string;

  @Field(() => UserRole, {
    description: "User's role, specifying their access level",
  })
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  /**
   * Create a new entity
   * @param params entity input
   */
  public static of<T extends Node>(this: new () => T, params: Partial<T>): T {
    const entity = new this();

    Object.assign(entity, params);

    return entity;
  }
}
