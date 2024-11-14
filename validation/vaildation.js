const yup = require("yup");
const recipes_validation = yup.object().shape({
  title: yup.string().min(5).max(150).nullable("Title is required"),
  ingredients: yup.string().nullable("Ingredients are required"),
  servings: yup.string().max(50, "Servings cannot exceed 50 characters"),
  instructions: yup
    .string()
    .max(3000, "Instructions cannot exceed 3000 characters").nullable(),
    image: yup
    .string()
    .url("Image must be a valid URL")
    .matches(/^https:\/\/ik\.imagekit\.io\//, "Image must be from ImageKit") // Validate ImageKit URL pattern
    .nullable("Image is required"),
});

module.exports = { recipes_validation };
