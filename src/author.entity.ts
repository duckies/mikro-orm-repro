import {
  Entity,
  Enum,
  ManyToOne,
  PrimaryKeyType,
  Property,
} from '@mikro-orm/core';
import { Book } from './book.entity';

export enum AuthorType {
  Apple = 'Apple',
  Banana = 'Banana',
}

@Entity()
export class Author {
  @Property({ primary: true })
  id!: string;

  @Enum({ items: () => AuthorType, primary: true })
  type!: AuthorType;

  [PrimaryKeyType]?: [string, AuthorType];

  @ManyToOne(() => Book)
  book!: Book;
}
