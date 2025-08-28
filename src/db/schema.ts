import { relations } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const repositories = sqliteTable("repositories", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  url: text("url").notNull(),
  description: text("description").notNull(),

  createdAt: int("created_at").$defaultFn(() => Date.now()),
  updatedAt: int("updated_at")
    .$defaultFn(() => Date.now())
    .$onUpdate(() => Date.now()),
});

export const repositoriesRelations = relations(repositories, ({ many }) => ({
  libraries: many(libraries),
}));

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

export const librariesRelations = relations(libraries, ({ one }) => ({
  repository: one(repositories, {
    fields: [libraries.repositoryId],
    references: [repositories.id],
  }),
}));
