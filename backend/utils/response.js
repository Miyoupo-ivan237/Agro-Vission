function sendSuccess(res, data, status = 200) {
  return res.status(status).json(data);
}

function sendError(res, message, status = 500) {
  return res.status(status).json({ error: message });
}

module.exports = { sendSuccess, sendError };
