const Model = require("./Model")

class Contributor extends Model {
  static get tableName() {
    return "contributors"
  }

  static get relationMappings() {
    const Repo = require("./Repo")
    const Developer = require("./Developer")

    return {
      repo: {
        relation: Model.BelongsToOneRelation,
        modelClass: Repo,
        join: {
          from: "contributors.repoId",
          to: "repos.id"
        }
      },
      developer: {
        relation: Model.BelongsToOneRelation,
        modelClass: Developer,
        join: {
          from: "contributors.developerId",
          to: "developers.id"
        }
      }
    }
  }
}

module.exports = Contributor