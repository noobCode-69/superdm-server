CREATE TYPE "public"."status_enum" AS ENUM('OPEN', 'IN_PROGRESS', 'CLOSED');--> statement-breakpoint
CREATE TABLE "tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) DEFAULT '' NOT NULL,
	"status" "status_enum" DEFAULT 'OPEN' NOT NULL,
	"priority" varchar DEFAULT '' NOT NULL,
	"assignee" varchar(255) DEFAULT '' NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	"labels" varchar(255)[],
	"description" varchar(255) DEFAULT '',
	"comment" varchar(255) DEFAULT ''
);
