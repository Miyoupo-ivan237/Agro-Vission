const path = require('path');
const fs = require('fs');

const uploadDirectory = path.join(__dirname, '..', 'uploads', 'plant-images');
fs.mkdirSync(uploadDirectory, { recursive: true });

module.exports = { uploadDirectory };
