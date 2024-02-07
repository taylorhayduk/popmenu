import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Menu } from "./Menu";

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Menu, (menu) => menu.restaurant)
  menus: Menu[];
}
