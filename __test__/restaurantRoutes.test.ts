import request from "supertest";
import { app } from "../src";
import { AppDataSource } from "../src/data-source";

describe("Restaurant Routes", () => {
  beforeAll(async () => {
    await AppDataSource.initialize().then(() => {
      console.log("Jest Data Source has been initialized in the beforeAll!");
    });
  });

  it("should create a new restaurant", async () => {
    const response = await request(app).post("/restaurants").send({
      name: "New Restaurant",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("New Restaurant");
  });

  it("should get all restaurants", async () => {
    // secondRestaurant
    await request(app).post("/restaurants").send({
      name: "Second Restaurant",
    });
    const response = await request(app).get("/restaurants");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2); // There are two restaurants - one from the previous test and one from this test
  });

  // Test for getting a specific restaurant
  it("should get a specific restaurant", async () => {
    const allRestaurants = await request(app).get("/restaurants");
    const secondRestaurant = allRestaurants.body[1];

    const response = await request(app).get(
      `/restaurants/${secondRestaurant.id}`
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Second Restaurant");
  });

  // Test for updating a restaurant
  it("should update a restaurant", async () => {
    const allRestaurants = await request(app).get("/restaurants");
    const secondRestaurant = allRestaurants.body[1];
    const response = await request(app)
      .put(`/restaurants/${secondRestaurant.id}`)
      .send({
        name: "2nd Restaurant",
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("2nd Restaurant");
  });

  // Test for deleting a restaurant
  it("should delete a restaurant", async () => {
    const allRestaurantsBefore = await request(app).get("/restaurants");
    const secondRestaurant = allRestaurantsBefore.body[1];
    const response = await request(app).delete(
      `/restaurants/${secondRestaurant.id}`
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Restaurant deleted successfully"
    );

    const allRestaurantsAfter = await request(app).get("/restaurants");
    expect(allRestaurantsAfter.body).toHaveLength(1); // Back to only one restaurant
  });

  it("should create a menu for a specific restaurant", async () => {
    const allRestaurants = await request(app).get("/restaurants");
    const restaurantId = allRestaurants.body[0].id;

    const response = await request(app)
      .post(`/restaurants/${restaurantId}/menus`)
      .send({
        name: "Lunch Menu",
        menuItems: [
          {
            name: "Burger",
            price: 10.99,
          },
          {
            name: "Salad",
            price: 8.99,
          },
          {
            name: "Pizza",
            price: 12.99,
          },
        ],
      });

    expect(response.error).toBeFalsy();
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Lunch Menu");
    expect(response.body.menuItems).toHaveLength(3);
    expect(response.body.menuItems[0].name).toBe("Burger");
    expect(response.body.menuItems[0].price).toBe(10.99);
    expect(response.body.menuItems[1].name).toBe("Salad");
    expect(response.body.menuItems[1].price).toBe(8.99);
    expect(response.body.menuItems[2].name).toBe("Pizza");
    expect(response.body.menuItems[2].price).toBe(12.99);
  });

  it("should get all menus of a specific restaurant", async () => {
    const allRestaurants = await request(app).get("/restaurants");
    const restaurantId = allRestaurants.body[0].id;

    const response = await request(app).get(
      `/restaurants/${restaurantId}/menus`
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);

    const menu = response.body[0]; // From previous test
    expect(menu).toHaveProperty("id");
    expect(menu.name).toBe("Lunch Menu");
    expect(menu.menuItems).toHaveLength(3);
    const expectedMenuItems = [
      { name: "Burger", price: 10.99 },
      { name: "Salad", price: 8.99 },
      { name: "Pizza", price: 12.99 },
    ];

    for (const expectedItem of expectedMenuItems) {
      const matchingItem = menu.menuItems.find(
        (item) =>
          item.name === expectedItem.name && item.price === expectedItem.price
      );
      expect(matchingItem).toBeDefined();
    }
  });
});
