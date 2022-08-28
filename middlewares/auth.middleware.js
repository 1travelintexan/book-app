function isLoggedIn(req, res, next) {
  if (req.session) {
    next();
    return;
  } else {
    res.redirect("/login");
  }
}

function isLoggedInGoogle(req, res, next) {
  //check if there is a req.user and if not then send 401 for not authorized
  req.user ? next() : res.sendStatus(401);
}
module.exports = { isLoggedIn, isLoggedInGoogle };
