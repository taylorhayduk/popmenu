import "reflect-metadata";
import { DataSource } from "typeorm";
import { Menu } from "./entity/Menu";
import { MenuItem } from "./entity/MenuItem";
import { Restaurant } from "./entity/Restaurant";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "mypass",
  database: "popmenu",
  synchronize: true,
  logging: false,
  entities: [Menu, MenuItem, Restaurant],
  migrations: [],
  subscribers: [],
});
