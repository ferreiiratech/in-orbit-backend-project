import { db } from "../db"
import { goals } from "../db/schema"

interface CreateGoalRequest {
  title: string
  desiredWeeklyFrequency: number
}

export async function createGoal(request: CreateGoalRequest) {
  const result = await db
    .insert(goals)
    .values({
      title: request.title,
      desiredWeeklyFrequency: request.desiredWeeklyFrequency,
    })
    .returning()

  return {
    goal: result[0],
  }
}
