const yup = require("yup");
const recipes_validation = yup.object().shape({
  title: yup.string().min(5, "Title must be at least 5 characters").max(150, "Title cannot exceed 150 characters").required("Title is required"),
  ingredients: yup.string().required("Ingredients are required"),
  servings: yup.string().max(50, "Servings cannot exceed 50 characters").required("Servings are required"),
  instructions: yup.string().max(3000, "Instructions cannot exceed 3000 characters").required("Instructions are required"),
  image: yup
    .string()
    .url("Image must be a valid URL")
    .matches(/^https:\/\/ik\.imagekit\.io\//, "Image must be from ImageKit") // Validate ImageKit URL pattern
    .nullable(true), // Assuming `image` is optional
});

module.exports = { recipes_validation };
