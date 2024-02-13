import { AppDataSource } from "../src/data-source";
import request from "supertest";
import { app } from "../src";
import fs from "fs";

describe("Uploader Routes", () => {
  beforeAll(async () => {
    await AppDataSource.initialize().then(() => {
      console.log("Jest Data Source has been initialized in the beforeAll!");
    });
  });

  it("should upload the sample restaurant_data.json file", async () => {
    const restaurantDataJson = JSON.parse(
      fs.readFileSync("./restaurant_data.json", "utf-8")
    );

    const response = await request(app)
      .post("/upload-json")
      .send(restaurantDataJson);
    expect(response.status).toBe(201);

    const { restaurantIds } = response.body;
    for (const restaurantId of restaurantIds) {
      const savedRestaurant = await request(app).get(
        `/restaurants/${restaurantId}`
      );
      expect(savedRestaurant.status).toBe(200);
      expect(savedRestaurant.body).toHaveProperty("id");

      const originalRestaurant = restaurantDataJson.restaurants.find(
        (r) => r.name === savedRestaurant.body.name
      );

      expect(originalRestaurant.name).toBe(savedRestaurant.body.name);

      const savedRestaurantMenus = await request(app).get(
        `/restaurants/${restaurantId}/menus`
      );
      expect(savedRestaurantMenus.status).toBe(200);
      expect(savedRestaurantMenus.body).toHaveLength(
        originalRestaurant.menus.length
      );

      for (const originalMenu of originalRestaurant.menus) {
        const savedMenu = savedRestaurantMenus.body.find(
          (m) => m.name === originalMenu.name
        );
        expect(savedMenu).toBeDefined();
        expect(originalMenu.name).toBe(savedMenu.name);

        const originalMenuItems = [
          ...(originalMenu.menu_items || []),
          ...(originalMenu.dishes || []),
        ];

        const savedMenuItems = savedMenu.menuItems;

        expect(savedMenuItems.length).toBe(originalMenuItems.length);

        for (const savedMenuItem of savedMenuItems) {
          const originalMenuItem = originalMenuItems.find(
            (ogMenuItem) => ogMenuItem.name === savedMenuItem.name
          );
          expect(savedMenuItem.price).toBe(originalMenuItem.price);
        }
      }
    }
  });
});
