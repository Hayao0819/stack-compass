import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./db/schema";

dotenv.config({ path: ".env.local" });

// biome-ignore lint/style/noNonNullAssertion: DATABASE_URL が null なら落ちて欲しいので
export const db = drizzle(process.env.DATABASE_URL!, { schema });
