export default {
  dialect: "sqlite",
  schema: "./src/db/schema.ts",
  out: "./db",
  dbCredentials: {
    url: "./db/app.db",
  },
};
