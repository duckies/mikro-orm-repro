import { Collection, Entity, OneToMany, PrimaryKey } from '@mikro-orm/core';
import { Author } from './author.entity';

@Entity()
export class Book {
  @PrimaryKey()
  id!: number;

  @OneToMany(() => Author, (c) => c.book)
  children = new Collection<Author>(this);
}
