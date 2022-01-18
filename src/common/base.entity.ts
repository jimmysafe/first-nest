import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType({
  description: 'An object with an ID to support global identification',
})
export abstract class Node extends BaseEntity {
  @Field(() => ID, { description: 'Globally unique identifier' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Date, { description: 'Date the object was created' })
  @CreateDateColumn()
  created: Date = new Date();

  @Field(() => Date, { description: 'Date the object was last updated' })
  @UpdateDateColumn()
  updated: Date = new Date();
}
