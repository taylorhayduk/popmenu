import request from "supertest";
import { app } from "../src";
import { AppDataSource } from "../src/data-source";

describe("Menu Routes", () => {
  beforeAll(async () => {
    await AppDataSource.initialize().then(() => {
      console.log("Jest Data Source has been initialized in the beforeAll!");
    });
  });

  afterAll(async () => {});

  beforeEach(async () => {});

  it("should create a new menu", async () => {
    const response = await request(app)
      .post("/menus")
      .send({ name: "Burger Menu" });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Burger Menu");
  });

  it("should get all menus", async () => {
    const response = await request(app).get("/menus");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1);
  });

  it("should get a specific menu by ID", async () => {
    // Assuming you have the ID of a menu created in a previous test
    const allMenus = await request(app).get("/menus");
    const firstMenu = allMenus.body[0];
    const menuId = firstMenu.id;

    const response = await request(app).get(`/menus/${menuId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe("Burger Menu");
  });

  it("should update a menu", async () => {
    // Assuming you have the ID of a menu created in a previous test
    const allMenus = await request(app).get("/menus");
    const firstMenu = allMenus.body[0];
    const menuId = firstMenu.id;

    const response = await request(app)
      .put(`/menus/${menuId}`)
      .send({ name: "Updated Menu" });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id", menuId);
    expect(response.body.name).toBe("Updated Menu");
  });

  it("should delete a menu", async () => {
    // Assuming you have the ID of a menu created in a previous test
    const allMenus = await request(app).get("/menus");
    const firstMenu = allMenus.body[0];
    const menuId = firstMenu.id;

    const response = await request(app).delete(`/menus/${menuId}`);

    expect(response.statusCode).toBe(204);

    const shouldBeDeleted = await request(app).get(`/menus/${menuId}`);
    expect(shouldBeDeleted.statusCode).toBe(404);
  });
});
