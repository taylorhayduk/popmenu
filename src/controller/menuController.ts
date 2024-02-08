import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Menu } from "../entity/Menu";

export const createMenu = async (req: Request, res: Response) => {
  const menuRepository = AppDataSource.getRepository(Menu);
  try {
    const newMenu = menuRepository.create(req.body);
    await menuRepository.save(newMenu);
    return res.status(201).json(newMenu);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

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
