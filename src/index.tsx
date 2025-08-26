import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/libsql";

dotenv.config({ path: ".env.local" });

const db = drizzle(process.env.DATABASE_URL!);
