const errorsHandler = (err, res) => {
  res.status(500).json({
    error: err.message
  });
};

module.exports = errorsHandler;
