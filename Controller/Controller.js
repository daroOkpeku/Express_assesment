const { recipes_validation } = require("../validation/vaildation");
const Recieps = require("../Model/Recieps");
const ImageKit = require("imagekit");
const { title } = require("process");

var imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const imageupload = async (file) => {
  try {
    // Convert image to base64 if it’s a binary buffer (optional, if needed)
    const fileContent = `data:${file.mimetype};base64,${file.buffer.toString(
      "base64"
    )}`;

    // Upload the file
    const uploadResponse = await imagekit.upload({
      file: fileContent, // Base64-encoded image
      fileName: "new-file", // Unique file name
    });

    return uploadResponse;
  } catch (error) {
    console.error("Image upload failed:", error);
    throw new Error("Image upload failed");
  }
};

const create_recipes = async (request, response) => {
  try {
    if (request.file) {
      const imageUploadResponse = await imageupload(request.file);
      request.body.image = imageUploadResponse?.url;
    }
    await recipes_validation.validate(request.body, { abortEarly: false });
    Recieps.create({
      title: request.body.title,
      ingredients: request.body.ingredients,
      servings: request.body.servings,
      instructions: request.body.instructions,
      image: request.body.image,
    });

    response.status(201).json({ success: "You have successfully registered" });
  } catch (err) {
    response.status(400).json({
      message: "Validation error",
      errors: err.errors || err.message,
    });
  }
};

const recipes_paginate = async (request, response) => {
  try {
    const pageNumber = parseInt(request.query.page) || 1;
    console.log(pageNumber)
    const itemsPerPage = 5;

    const offset = (pageNumber - 1) * itemsPerPage;
    const totalRecipes = await Recieps.count();
    const lastPage = Math.ceil(totalRecipes / itemsPerPage);
    let recieps = await Recieps.findAll({
      offset,
      limit: itemsPerPage,
    });
    response.status(201).json({
      success: true,
      currentPage: pageNumber,
      lastPage: lastPage,
      recipes: recieps,
    });
  } catch (error) {
    response.status(400).json({ error: "there is an error" });
  }
};

const recipes_single = async (request, response) => {
  try {
    const id = parseInt(request.params.id);

    if (!id) {
      return response.status(400).json({ error: "Invalid ID" });
    }

    const recipient = await Recieps.findOne({ where: { id: id } });

    if (!recipient) {
      return response.status(404).json({ error: "Recipient not found" });
    }

    response.status(200).json({ success: recipient });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return response.status(500).json({ error: "Internal Server Error" });
  }
};

const recipes_update = async (request, response) => {
  const id = parseInt(request.params.id);

  if (!id) {
    return response.status(400).json({ error: "Invalid ID" });
  }

  if (request.file) {
    const imageUploadResponse = await imageupload(request.file);
    request.body.image = imageUploadResponse?.url;
  }
  await recipes_validation.validate(request.body, { abortEarly: false });

  await Recieps.update(
    {
      title: request.body.title,
      ingredients: request.body.ingredients,
      servings: request.body.servings,
      instructions: request.body.instructions,
      image: request.body.image,
    },
    {
      where: { id: id },
    }
  );

  response
    .status(200)
    .json({ success: "you have successfully updated the recipe" });
};

const reciep_delete = async (request, response) => {
  try {
    const id = parseInt(request.params.id);

    if (!id) {
      return response.status(400).json({ error: "Invalid ID" });
    }

    const deletedCount = await Recieps.destroy({ where: { id: id } });

    if (deletedCount === 0) {
      return response.status(404).json({ error: "Recipient not found" });
    }
    response.status(200).json({ success: "successfully deleted" });
  } catch (error) {
    return response.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  create_recipes,
  recipes_paginate,
  recipes_single,
  recipes_update,
  reciep_delete,
};
