import { Request, Response } from "express";
import { Restaurant } from "../entity/Restaurant";
import { AppDataSource } from "../data-source";

// Get all restaurants
export const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await AppDataSource.getRepository(Restaurant).find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch restaurants" });
  }
};

// Get a single restaurant by ID
export const getRestaurantById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const restaurant = await AppDataSource.getRepository(Restaurant).findOneBy({
      id,
    });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch restaurant" });
  }
};

// Create a new restaurant
export const createRestaurant = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const restaurant = new Restaurant();
    restaurant.name = name;
    await AppDataSource.getRepository(Restaurant).save(restaurant);
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: "Failed to create restaurant" });
  }
};

// Update a restaurant
export const updateRestaurant = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  const restaurantRepository = AppDataSource.getRepository(Restaurant);
  try {
    const restaurant = await restaurantRepository.findOneBy({
      id,
    });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    restaurant.name = name;
    await restaurantRepository.save(restaurant);
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: "Failed to update restaurant" });
  }
};

// Delete a restaurant
export const deleteRestaurant = async (req: Request, res: Response) => {
  const { id } = req.params;
  const restaurantRepository = AppDataSource.getRepository(Restaurant);
  try {
    const restaurant = await restaurantRepository.findOneBy({ id });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    await restaurantRepository.remove(restaurant);
    res.json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete restaurant" });
  }
};
