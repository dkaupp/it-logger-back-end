module.exports = (req, res, next) => {
  if (!req.tech.isAdmin) return res.status(403).send("Access denied.");
  next();
};
