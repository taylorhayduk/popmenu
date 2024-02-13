import { Request, Response } from "express";
import { Restaurant } from "../entity/Restaurant";
import { AppDataSource } from "../data-source";
import { Menu } from "../entity/Menu";
import { MenuItem } from "../entity/MenuItem";
import { UploadJson } from "../entity/UploadJson";

const uploadJson = async (uploadJson: UploadJson): Promise<number[]> => {
  return new Promise<number[]>(async (resolve, reject) => {
    const restaurantRepository = await AppDataSource.getRepository(Restaurant);
    const menuRepository = await AppDataSource.getRepository(Menu);
    const menuItemRepository = await AppDataSource.getRepository(MenuItem);
    const restaurantIds: number[] = [];

    for (const uRestaurant of uploadJson.restaurants) {
      try {
        const restaurant = await saveRestaurant(
          uRestaurant,
          restaurantRepository
        );
        console.log(
          `Uploaded restaurant_${restaurant.id} - ${restaurant.name}`
        );
        restaurantIds.push(restaurant.id);

        for (const uMenu of uRestaurant.menus) {
          try {
            const menu = await saveMenu(uMenu, restaurant, menuRepository);
            console.log(`Uploaded menu_${menu.id} - ${menu.name}`);

            if (uMenu.menu_items) {
              await saveMenuItems(uMenu.menu_items, menu, menuItemRepository);
            }
            if (uMenu.dishes) {
              await saveMenuItems(uMenu.dishes, menu, menuItemRepository);
            }
          } catch (error) {
            console.error(`Error saving menu: ${error}`);
          }
        }
      } catch (error) {
        console.error(`Error saving restaurant: ${error}`);
      }
    }
    resolve(restaurantIds);
  });
};

const saveRestaurant = async (
  uRestaurant: any,
  restaurantRepository: any
): Promise<Restaurant> => {
  try {
    const restaurant = new Restaurant();
    restaurant.name = uRestaurant.name;
    return await restaurantRepository.save(restaurant);
  } catch (error) {
    console.error(`Error saving restaurant: ${error}`);
    throw error;
  }
};

const saveMenu = async (
  uMenu: any,
  restaurant: Restaurant,
  menuRepository: any
): Promise<Menu> => {
  try {
    const menu = new Menu();
    menu.name = uMenu.name;
    menu.restaurant = restaurant;
    return await menuRepository.save(menu);
  } catch (error) {
    console.error(`Error saving menu: ${error}`);
    throw error;
  }
};

const saveMenuItems = async (
  uMenuItems: any[],
  menu: Menu,
  menuItemRepository: any
): Promise<void> => {
  for (const uMenuItem of uMenuItems) {
    try {
      const menuItem = new MenuItem();
      menuItem.menu = menu;
      menuItem.name = uMenuItem.name;
      menuItem.price = uMenuItem.price;
      await menuItemRepository.save(menuItem);
      console.log(`Uploaded menu-item_${menuItem.id} - ${menuItem.name}`);
    } catch (error) {
      console.error(`Error saving menu item: ${error}`);
    }
  }
};

export const uploadJsonRoute = (req: Request, res: Response) => {
  const uJson: UploadJson = req.body;
  uploadJson(uJson)
    .then((restaurantIds: number[]) => {
      res
        .status(201)
        .json({ message: "JSON uploaded & saved successfully", restaurantIds });
    })
    .catch((error) => {
      console.error(`Error uploading JSON: ${error}`);
      res.status(500).json({ error: "Internal server error" });
    });
};
