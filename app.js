const express = require("express");
const cors = require("cors");
require("dotenv").config();
const multer = require("multer");
const upload = multer().single("image");
const {
  create_recipes,
  recipes_paginate,
  recipes_single,
  recipes_update,
  reciep_delete,
} = require("./Controller/Controller");
const app = express();
const corsOption = {
  origin: "*",
};

app.use(cors(corsOption));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// app.get("/api", (request, response) => {
//   response.json({ message: "hello we are here" });
// });

app.post("/api/recipes", upload, create_recipes);
app.get("/api/recipes", recipes_paginate);
app.get("/api/recipes/:id", recipes_single);
app.put("/api/recipes/:id", upload, recipes_update);
app.delete("/api/recipes/:id", reciep_delete);
const port = process.env.PORT || 3030;
if (process.env.NODE_ENV !== "test") {
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
}
module.exports = app;