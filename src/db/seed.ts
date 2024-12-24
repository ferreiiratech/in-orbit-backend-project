import { db, client } from "."
import { goals, goalCompletions } from "./schema"
import dayjs from "dayjs"

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)

  const startOfWeek = dayjs().startOf("week")

  const result = await db
    .insert(goals)
    .values([
      {
        title: "Read 10 pages of a book",
        desiredWeeklyFrequency: 1,
      },
      {
        title: "Go for a 30-minute walk",
        desiredWeeklyFrequency: 3,
      },
      {
        title: "Practice guitar for 30 minutes",
        desiredWeeklyFrequency: 2,
      },
    ])
    .returning()

  await db.insert(goalCompletions).values([
    {
      goalId: result[0].id,
      createdAt: startOfWeek.toDate(),
    },
    {
      goalId: result[1].id,
      createdAt: startOfWeek.add(1, "day").toDate(),
    },
    {
      goalId: result[2].id,
      createdAt: startOfWeek.add(2, "day").toDate(),
    },
  ])
}

seed().finally(() => {
  client.end()
})
