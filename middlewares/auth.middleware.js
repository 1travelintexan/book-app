function isLoggedIn(req, res, next) {
  if (req.session) {
    next();
    return;
  } else {
    res.redirect("/login");
  }
}
module.exports = isLoggedIn;
