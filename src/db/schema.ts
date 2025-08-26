import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const repositories = sqliteTable("repositories", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  url: text("url").notNull(),
  description: text("description").notNull(),
  libraries: text("libraries").notNull(),

  createdAt: int("created_at").$defaultFn(() => Date.now()),
  updatedAt: int("updated_at")
    .$defaultFn(() => Date.now())
    .$onUpdate(() => Date.now()),
});

export const libraries = sqliteTable("libraries", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  url: text("url").notNull(),
  reason: text("reason").notNull(),
  repositoryId: text("repository_id")
    .notNull()
    .references(() => repositories.id),

  createdAt: int("created_at").$defaultFn(() => Date.now()),
  updatedAt: int("updated_at")
    .$defaultFn(() => Date.now())
    .$onUpdate(() => Date.now()),
});
