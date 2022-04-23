import { MikroORM } from '@mikro-orm/core';
import type { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { AuthorType } from './author.entity';
import { Book } from './book.entity';

async function bootstrap() {
  const orm = await MikroORM.init<PostgreSqlDriver>({
    entities: ['./dist/**/*.entity.js'],
    entitiesTs: ['./src/**/*.entity.ts'],
    dbName: 'mikro-repro',
    type: 'postgresql',
    highlighter: new SqlHighlighter(),
    debug: true,
  });

  // Schema generation
  const generator = orm.getSchemaGenerator();
  await generator.dropSchema();
  await generator.createSchema();

  // Test Query
  const em = orm.em.fork();
  await em.findOne(Book, {
    children: { id: '123ABC', type: AuthorType.Apple },
  });
  // select "b0".* from "book" as "b0" left join "author" as "a1" on "b0"."id" = "a1"."book_id" where ("b0"."id", "b0"."type") in (('123ABC', 'Apple')) limit 1

  await orm.close(true);
}
bootstrap();
