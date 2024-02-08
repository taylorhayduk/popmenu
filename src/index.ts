import express from "express";
import * as menuController from "./controller/menuController";
import * as menuItemController from "./controller/menuItemController";

// Initialize Express app
const app = express();

// Middlewares
app.use(express.json());

// Menu routes
app.get("/menus", menuController.getAllMenus);
app.get("/menus/:id", menuController.getMenuById);
app.post("/menus", menuController.createMenu);
app.put("/menus/:id", menuController.updateMenu);
app.delete("/menus/:id", menuController.deleteMenu);

// MenuItem routes
app.get("/menuItems", menuItemController.getAllMenuItems);
app.get("/menuItems/:id", menuItemController.getMenuItemById);
app.post("/menuItems", menuItemController.createMenuItem);
app.put("/menuItems/:id", menuItemController.updateMenuItem);
app.delete("/menuItems/:id", menuItemController.deleteMenuItem);

export { app };
