import { InferSelectModel } from 'drizzle-orm';
import { pgTable, serial, varchar, integer, date, pgEnum } from 'drizzle-orm/pg-core';

export const statusEnum = pgEnum("status_enum", ["OPEN", "IN_PROGRESS", "CLOSED"]);

export const tasks = pgTable("tasks", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull().default(""),
    status: statusEnum("status").notNull().default('OPEN'),
    priority: varchar("priority").notNull().default(''),
    assignee: varchar("assignee", { length: 255 }).notNull().default(""),
    createdAt: date("created_at").defaultNow().notNull(),
    labels: varchar("labels", { length: 255 }).array(),
    description: varchar("description", { length: 255 }).default(""),
    comment: varchar("comment", { length: 255 }).default(""),
});




export type Tasks = InferSelectModel<typeof tasks>