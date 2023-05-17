let user = require("./user.js");
function route(pathname) {
  if (pathname == "/") {
    return "index";
  }
  if (pathname == "/user") {
    return user.index(pathname);
  }
}

exports.route = route;
