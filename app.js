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
  upload_image_send
} = require("./Controller/Controller");
const app = express();
const corsOption = {
  origin: "*",
  // methods: "GET,HEAD,PUT,PATCH,POST,DELETE", 
  // allowedHeaders: ["Content-Type", "Authorization"],
  // credentials: true,
};

app.use(cors(corsOption));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// app.use(express.json({ limit: '10mb' })); // Adjust the limit as needed
// app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.get("/api", (request, response) => {
  response.json({ message: "hello we are here" });
});


app.post("/api/recipes", upload, create_recipes);
app.get("/api/recipes", recipes_paginate);
app.get("/api/recipes/:id", recipes_single);
app.put("/api/recipes/:id",  recipes_update);
app.post("/api/image_upload", upload, upload_image_send)
app.delete("/api/recipes/:id", reciep_delete);
const port = process.env.PORT || 3030;
if (process.env.NODE_ENV !== "test") {
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
}
module.exports = app;