import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Menu } from "../entity/Menu";
import { Restaurant } from "../entity/Restaurant";
import { MenuItem } from "../entity/MenuItem";

export const getAllMenus = async (req: Request, res: Response) => {
  const menuRepository = AppDataSource.getRepository(Menu);
  try {
    const menus = await menuRepository.find({ relations: ["menuItems"] });
    return res.status(200).json(menus);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getMenuById = async (req: Request, res: Response) => {
  const menuRepository = AppDataSource.getRepository(Menu);
  try {
    const menu = await menuRepository.findOneBy({ id: req.params.id });
    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }
    return res.status(200).json(menu);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateMenu = async (req: Request, res: Response) => {
  const menuRepository = AppDataSource.getRepository(Menu);
  try {
    const menu = await menuRepository.findOneBy({ id: req.params.id });
    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }
    menuRepository.merge(menu, req.body);
    const updatedMenu = await menuRepository.save(menu);
    return res.status(200).json(updatedMenu);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteMenu = async (req: Request, res: Response) => {
  const menuRepository = AppDataSource.getRepository(Menu);
  try {
    const menu = await menuRepository.findOneBy({ id: req.params.id });
    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }
    await menuRepository.remove(menu);
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get all menus of a specific restaurant
export const getMenusByRestaurantId = async (req: Request, res: Response) => {
  const menuRepository = AppDataSource.getRepository(Menu);
  try {
    const menus = await menuRepository.find({
      where: { restaurant: { id: req.params.id } },
      relations: ["menuItems"],
    });

    return res.status(200).json(menus);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Create a menu for a specific restaurant
export const createMenuForRestaurant = async (req: Request, res: Response) => {
  const menuRepository = AppDataSource.getRepository(Menu);
  const restaurantRepository = AppDataSource.getRepository(Restaurant);
  const menuItemRepository = AppDataSource.getRepository(MenuItem);

  try {
    const restaurant = await restaurantRepository.findOneBy({
      id: req.params.id,
    });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const newMenu = menuRepository.create({
      ...req.body,
      restaurant: restaurant,
    });
    await menuRepository.save(newMenu);

    const menuItems =
      req.body.menuItems?.map((item: MenuItem) => ({
        name: item.name,
        price: item.price,
        menu: newMenu,
      })) || ([] as MenuItem[]);

    if (menuItems.length) await menuItemRepository.save(menuItems);

    const menuWithItems = await menuRepository.findOne({
      where: { id: req.params.id },
      relations: ["menuItems"],
    });

    if (!menuWithItems) {
      return res.status(404).json({ message: "Menu not found" });
    }

    return res.status(201).json(menuWithItems);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
