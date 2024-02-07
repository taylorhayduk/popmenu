import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { MenuItem } from "../entity/MenuItem";

// Get all menu items
export const getAllMenuItems = async (_req: Request, res: Response) => {
  try {
    const menuItems = await AppDataSource.getRepository(MenuItem).find();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single menu item
export const getMenuItemById = async (req: Request, res: Response) => {
  try {
    const menuItem = await AppDataSource.getRepository(MenuItem).findOne(
      req.params.id
    );
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new menu item
export const createMenuItem = async (req: Request, res: Response) => {
  const menuItem = new MenuItem();
  menuItem.name = req.body.name;
  menuItem.price = req.body.price;

  try {
    const newMenuItem = await AppDataSource.getRepository(MenuItem).save(
      menuItem
    );
    res.status(201).json(newMenuItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a menu item
export const updateMenuItem = async (req: Request, res: Response) => {
  try {
    const menuItem = await AppDataSource.getRepository(MenuItem).findOne(
      req.params.id
    );
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    menuItem.name = req.body.name || menuItem.name;
    menuItem.price = req.body.price || menuItem.price;

    const updatedMenuItem = await AppDataSource.getRepository(MenuItem).save(
      menuItem
    );
    res.json(updatedMenuItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a menu item
export const deleteMenuItem = async (req: Request, res: Response) => {
  try {
    const menuItem = await AppDataSource.getRepository(MenuItem).findOne(
      req.params.id
    );
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    await AppDataSource.getRepository(MenuItem).remove(menuItem);
    res.json({ message: "Menu item deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
