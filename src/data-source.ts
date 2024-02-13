import "reflect-metadata";
import { DataSource } from "typeorm";
import { Menu } from "./entity/Menu";
import { MenuItem } from "./entity/MenuItem";
import { Restaurant } from "./entity/Restaurant";

export const AppDataSource = new DataSource({
  // Use SQLite for both testing and non-testing environments
  type: "sqlite",
  database: ":memory:",
  entities: [Menu, MenuItem, Restaurant],
  synchronize: true, // Automatically create the database schema on startup
  logging: false, // Reduce log output
});

// ACTUAL Setup if deploying to a real database

// Determine if we are in a test environment
// const isTestEnvironment = process.env.NODE_ENV === "test";

// export const AppDataSource = new DataSource({
//   // Use SQLite for testing and PostgreSQL for other environments
//   type: isTestEnvironment ? "sqlite" : "postgres",
//   // Database connection configuration varies based on the type
//   database: isTestEnvironment ? ":memory:" : "popmenu",
//   entities: [Menu, MenuItem, Restaurant],

//   // When using SQLite for tests
//   ...(isTestEnvironment && {
//     synchronize: true, // Automatically create the database schema on startup
//     logging: false, // Reduce log output for tests
//   }),

//   // When using PostgreSQL (non-testing environments)
//   ...(!isTestEnvironment && {
//     host: "localhost",
//     port: 5432,
//     username: "postgres",
//     password: "mypass",
//     synchronize: false, // We would use /src/migrations for schema changes
//     logging: false,
//   }),
// });
