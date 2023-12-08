const Model = require("./Model.js")

class Repo extends Model {
  static get tableName(){
    return "repos"
  }

  static get relationMappings(){
    const Developer = require("./Developer.js")
    const Contributor = require("./Contributor.js")

    return {
      developers: {
        relation: Model.ManyToManyRelation,
        modelClass: Developer,
        join: {
          from: "repos.id",
          through: {
              from: "contributors.repoId",
              to: "contributors.developerId",
          },
          to: "developers.id"
        }
      },

      contributors:{
        relation: Model.HasManyRelation,
        modelClass: Contributor,
        join:{
          from: "repos.id",
          to: "contributors.repoId"
        }
      }
    }
  }

  static get jsonSchema(){
    return {
      type: "object",
      required: ["name"],
      properties:{
        name:{type:"string"},
        description:{type:"string"},
        language:{type:"string"}
      }
    }
  }
}

module.exports = Repo