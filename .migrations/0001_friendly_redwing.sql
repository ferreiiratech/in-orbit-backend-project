CREATE TABLE IF NOT EXISTS "tb_goal_completions" (
	"id" text PRIMARY KEY NOT NULL,
	"goal_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tb_goal_completions" ADD CONSTRAINT "tb_goal_completions_goal_id_tb_goals_id_fk" FOREIGN KEY ("goal_id") REFERENCES "public"."tb_goals"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
