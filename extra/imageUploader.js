const cloudinary = require('../config/cloudinary');

exports.imageUploader = async (file) => {
  const base64 = file.buffer.toString('base64');
  // data:file.mimetype;base64,valueOfb64
  const data = `data:${file.mimetype};base64,${base64}`;
  const result = await cloudinary.uploader.upload(data, {
    resource_type: 'auto',
  });
  return result?.url;
};