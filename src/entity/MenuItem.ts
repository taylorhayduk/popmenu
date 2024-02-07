import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Menu } from "./Menu";

@Entity()
export class MenuItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column("float")
  price: number;

  @ManyToOne(() => Menu, (menu) => menu.menuItems)
  @JoinColumn({ name: "menuId" })
  menu: Menu;
}
