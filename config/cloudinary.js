const cloudinary = require('cloudinary').v2;

const { SECRET, CLOUDINARY_NAME, API_KEY} =
  process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: API_KEY,
  api_secret: SECRET,
});

module.exports = cloudinary;