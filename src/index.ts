import express from "express";
import * as menuController from "./controller/menuController";
import * as menuItemController from "./controller/menuItemController";
import * as restaurantController from "./controller/restaurantController";
import * as uploaderController from "./controller/uploaderController";

// Initialize Express app
const app = express();

// Middlewares
app.use(express.json());

// Menu routes
app.get("/menus", menuController.getAllMenus);
app.get("/menus/:id", menuController.getMenuById);
app.put("/menus/:id", menuController.updateMenu);
app.delete("/menus/:id", menuController.deleteMenu);

// MenuItem routes
app.get("/menus/:menuId/menu-items", menuItemController.getAllMenuItems);
app.get("/menu-items/:id", menuItemController.getMenuItemById);
app.post("/menus/:id/menu-items", menuItemController.createMenuItem);
app.put("/menu-items/:id", menuItemController.updateMenuItem);
app.delete("/menu-items/:id", menuItemController.deleteMenuItem);

// Restaurant routes
app.get("/restaurants", restaurantController.getAllRestaurants);
app.get("/restaurants/:id", restaurantController.getRestaurantById);
app.post("/restaurants", restaurantController.createRestaurant);
app.put("/restaurants/:id", restaurantController.updateRestaurant);
app.delete("/restaurants/:id", restaurantController.deleteRestaurant);

// Get all menus of a specific restaurant
app.get("/restaurants/:id/menus", menuController.getMenusByRestaurantId);
app.post("/restaurants/:id/menus", menuController.createMenuForRestaurant);

// Uploader
app.post("/upload-json", uploaderController.uploadJsonRoute);

export { app };
