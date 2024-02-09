import request from "supertest";
import { app } from "../src";
import { AppDataSource } from "../src/data-source";

describe("MenuItem Routes", () => {
  let menuId: string;

  beforeAll(async () => {
    await AppDataSource.initialize().then(() => {
      console.log("Jest Data Source has been initialized in the beforeAll!");
    });
  });

  it("should create a new menu", async () => {
    const response = await request(app)
      .post("/menus")
      .send({ name: "Burger Menu" });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Burger Menu");
  });

  it("should create a new menu item", async () => {
    const allMenus = await request(app).get("/menus");
    const firstMenu = allMenus.body[0];
    const menuId = firstMenu.id;

    const response = await request(app)
      .post(`/menus/${menuId}/menu-items`)
      .send({ name: "Cheeseburger", price: 9.99 });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Cheeseburger");
    expect(response.body.price).toBe(9.99);
    expect(response.body.menu.id).toBe(menuId);
  });

  it("should get all menu items", async () => {
    const allMenus = await request(app).get("/menus");
    const firstMenu = allMenus.body[0];
    const menuId = firstMenu.id;
    const response = await request(app).get(`/menus/${menuId}/menu-items`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    // Menu item from previous test
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe("Cheeseburger");
  });

  it("should get a specific menu item by ID", async () => {
    const allMenus = await request(app).get("/menus");
    const firstMenu = allMenus.body[0];
    const menuId = firstMenu.id;
    const allMenuItems = await request(app).get(`/menus/${menuId}/menu-items`);

    const firstMenuItem = allMenuItems.body[0];
    const menuItemId = firstMenuItem.id;

    const response = await request(app).get(`/menu-items/${menuItemId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe("Cheeseburger");
    expect(response.body.price).toBe(9.99);
  });

  it("should update a menu item", async () => {
    const allMenus = await request(app).get("/menus");
    const firstMenu = allMenus.body[0];
    const menuId = firstMenu.id;
    const allMenuItems = await request(app).get(`/menus/${menuId}/menu-items`);
    const firstMenuItem = allMenuItems.body[0];
    const menuItemId = firstMenuItem.id;

    const response = await request(app)
      .put(`/menu-items/${menuItemId}`)
      .send({ name: "Double Cheeseburger", price: 12.99 });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id", menuItemId);
    expect(response.body.name).toBe("Double Cheeseburger");
    expect(response.body.price).toBe(12.99);
  });

  it("should delete a menu item", async () => {
    const allMenus = await request(app).get("/menus");
    const firstMenu = allMenus.body[0];
    const menuId = firstMenu.id;
    const allMenuItems = await request(app).get(`/menus/${menuId}/menu-items`);
    const firstMenuItem = allMenuItems.body[0];
    const menuItemId = firstMenuItem.id;

    const response = await request(app).delete(`/menu-items/${menuItemId}`);

    expect(response.statusCode).toBe(204);

    const shouldBeDeleted = await request(app).get(`/menu-items/${menuItemId}`);
    expect(shouldBeDeleted.statusCode).toBe(404);
  });
});
