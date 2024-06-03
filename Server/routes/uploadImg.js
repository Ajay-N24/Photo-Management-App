const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const axios = require("axios");
const fs = require("fs");
dotenv.config({ path: "./config/.env" });
const PhotoData = require("../Models/photo");
const FormData = require("form-data");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/uploadimage", upload.single("image"), async (req, res) => {
  const { title, description } = req.body;
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }
  // Convert the file buffer to a base64 string
  const base64Image = req.file.buffer.toString("base64");

  // Create FormData to send the image to ImageBB
  const form = new FormData();
  form.append("image", base64Image);
  // console.log(form);
  try {
    // Upload image to ImageBB
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGBBAPI}`,
      form
    );
    // console.log(response.data);
    const url = response.data.data.url;
    await PhotoData.create({
      title,
      description,
      url,
    });
    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      url: {
        title: title,
        description: description,
        url: response.data.data.url,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      console.error("Duplicate key error: URL must be unique.");
      return res.status(500).json({
        success: false,
        message: "Image Uploaded already Exists uploading any other image",
        error,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Error uploading to ImageBB",
        error,
      });
    }
  }
});
router.get("/getPhotoData", async (req, res) => {
  try {
    let data = await PhotoData.find();
    res.json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
