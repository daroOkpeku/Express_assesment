const request = require("supertest");
const path = require("path");
const app = require("./app"); // Adjust the path as needed

describe("Recipes API", () => {
  let recipeId = 4;

  // Test POST /api/recipes
  it("should create a new recipe", async () => {
    const response = await request(app)
      .post("/api/recipes")
      .field("title", "Test Recipe Title")
      .field("ingredients", "Flour, Sugar, Eggs")
      .field("servings", 4)
      .field("instructions", "Mix ingredients and bake at 350°F for 20 minutes.")
      .attach("image", path.resolve(__dirname, "zenx.png"))
      .expect(201);
  
    // Adjust to check if response contains success message or an ID
    expect(response.body).toHaveProperty("success"); // Assuming `success` is a confirmation message
    expect(response.body.success).toBe("You have successfully registered");
  });

  // Test GET /api/recipes
  test("should retrieve a paginated list of recipes", async () => {
    const response = await request(app).get("/api/recipes?page=2");
  
    // Check if response body has 'recipes' and that it's an array
    expect(response.body).toHaveProperty("recipes");
    expect(Array.isArray(response.body.recipes)).toBe(true);
    expect(response.body.recipes.length).toBeGreaterThan(0); // Ensure at least one item
    expect(response.body).toHaveProperty("currentPage");
    expect(response.body).toHaveProperty("lastPage");
    expect(response.body).toHaveProperty("success", true);
  });

  // Test GET /api/recipes/:id
  test("should retrieve a single recipe by ID", async () => {
    const recipeId = 8; // Adjust this ID to an actual existing recipe ID in your database
  
    const response = await request(app).get(`/api/recipes/${recipeId}`);
  
    // Check if the response contains the correct recipe ID and a defined title
    expect(response.body.success).toHaveProperty("id", recipeId);
    expect(response.body.success).toHaveProperty("title"); // Check that 'title' exists, regardless of value
  });
  
  

  // Test PUT /api/recipes/:id
  test("should update an existing recipe", async () => {
    const recipeIdx = 10; // Set to an actual ID in your database
  
    const updatedData = {
      title: "Updated Recipe Title",
      ingredients: "Updated Ingredients",
      // Add other fields as needed
    };
  
    const response = await request(app)
      .put(`/api/recipes/${recipeIdx}`)
      .send(updatedData);
  
    // Check if the response body contains the updated recipe
    expect(response.body.success).toBe("you have successfully updated the recipe");
  });
  

  // Test DELETE /api/recipes/:id
  it("should delete a recipe by ID", async () => {
    if (!recipeId) throw new Error("Recipe ID not set from previous test");

    await request(app)
      .delete(`/api/recipes/${recipeId}`)
      .expect(200);

    // Attempt to retrieve the deleted recipe to confirm deletion
    const response = await request(app)
      .get(`/api/recipes/${recipeId}`)
      .expect(404);
    
    expect(response.body.error).toBe("Recipe not found");
  });
});
