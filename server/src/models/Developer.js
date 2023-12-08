const Model = require("./Model.js")

class Developer extends Model {
  static get tableName(){
    return "developers"
  }

  static get relationMappings(){
    const Repo = require("./Repo.js")
    const Contributor = require("./Contributor.js")

    return{
      repos: {
        relation: Model.ManyToManyRelation,
        modelClass: Repo,
        join: {
          from: "developers.id",
          through: {
              from: "contributors.developerId",
              to: "contributors.repoId",
          },
          to: "repos.id"
        }
      },

      contributors:{
        relation: Model.HasManyRelation,
        modelClass: Contributor,
        join:{
          from: "developers.id",
          to: "contributors.developerId"
        }
      }
    }
  }

  static get jsonSchema(){
    return {
      type: "object",
      required: ["username"],
      properties:{
          username:{type:"string"},
      }
    }
  }
}

module.exports = Developer