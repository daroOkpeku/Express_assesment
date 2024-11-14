const yup = require("yup");
const recipes_validation = yup.object().shape({
  title: yup.string().trim().min(5, "Title must be at least 5 characters").max(150, "Title cannot exceed 150 characters").required("Title is required"),
  ingredients: yup.string().trim().required("Ingredients are required"),
  servings: yup.string().trim().max(50, "Servings cannot exceed 50 characters").required("Servings are required"),
  instructions: yup.string().trim().max(3000, "Instructions cannot exceed 3000 characters").required("Instructions are required"),
  image: yup
    .string()
    .url("Image must be a valid URL")
    .matches(/^https:\/\/ik\.imagekit\.io\//, "Image must be from ImageKit") // Validate ImageKit URL pattern
    .nullable(true),
});
module.exports = { recipes_validation };
