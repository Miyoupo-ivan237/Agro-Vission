function normalizeLanguage(language) {
  return language === 'Français' || language === 'French' ? 'Français' : 'English';
}

module.exports = { normalizeLanguage };
