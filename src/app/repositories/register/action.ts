"use server";

import { redirect } from "next/navigation";
import { v7 as uuidv7 } from "uuid";
import type z from "zod";
import { libraries, repositories } from "@/db/schema";
import { db } from "@/index";
import type { registerFormSchema } from "./page";

export async function registerRepository(
  data: z.infer<typeof registerFormSchema>,
  techFields: { name: string; reason: string }[]
) {
  const repositoryId = uuidv7();

  await db.insert(repositories).values({
    id: repositoryId,
    url: `https://github.com/${data.owner}/${data.repository}`,
    name: data.repository,
    description: data.projectReason,
  });

  await db.insert(libraries).values(
    techFields.map((field) => ({
      id: uuidv7(),
      name: field.name,
      reason: field.reason,
      repositoryId: repositoryId,
      url: "",
    }))
  );

  redirect(`/repositories/${repositoryId}`);
}
