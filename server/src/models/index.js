// include all of your models here using CommonJS requires
const User = require("./User.js")
const Repo = require("./Repo.js")
const Developer = require("./Developer.js")
const Contributor = require("./Contributor.js")

module.exports = { User, Repo, Developer, Contributor };
