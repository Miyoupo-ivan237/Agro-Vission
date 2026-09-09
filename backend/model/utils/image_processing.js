function normalizeImageUri(imageUri) {
  return typeof imageUri === 'string' ? imageUri.trim().slice(0, 500) : null;
}

module.exports = { normalizeImageUri };
