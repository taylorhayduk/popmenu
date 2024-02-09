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
app.get("/menus/:menuId/menu-items", menuItemController.getAllMenuItems);
app.get("/menu-items/:id", menuItemController.getMenuItemById);
app.post("/menus/:id/menu-items", menuItemController.createMenuItem);
app.put("/menu-items/:id", menuItemController.updateMenuItem);
app.delete("/menu-items/:id", menuItemController.deleteMenuItem);

export { app };
