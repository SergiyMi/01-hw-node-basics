const notFound = (req, res) => {
  res.status(404).send(`This path ${req.url} is not found`);
};

module.exports = notFound;
