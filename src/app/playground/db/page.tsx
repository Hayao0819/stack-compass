import { libraries } from "@/db/schema";
import { db } from "@/index";

export default async function DBTest() {
  const res = await db.select().from(libraries);
  return <div>DB Test: {JSON.stringify(res)}</div>;
}
