const yup = require("yup");
const recipes_validation = yup.object().shape({
  title: yup.string().min(5).max(150).nullable(true),
  ingredients: yup.string().nullable(true),
  servings: yup.string().max(50, "Servings cannot exceed 50 characters"),
  instructions: yup
    .string()
    .max(3000, "Instructions cannot exceed 3000 characters").nullable(true),
    image: yup
    .string()
    .url("Image must be a valid URL")
    .matches(/^https:\/\/ik\.imagekit\.io\//, "Image must be from ImageKit") // Validate ImageKit URL pattern
    .nullable(true),
});

module.exports = { recipes_validation };
