import * as express from "express";
import { AppDataSource } from "./data-source";
import * as menuController from "./controller/menuController";
import * as menuItemController from "./controller/menuItemController";

// Initialize Express app
const app = express();
const PORT = 3000;

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

AppDataSource.initialize()
  .then(async () => {
    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
