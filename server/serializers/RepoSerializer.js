import DeveloperSerializer from "./DeveloperSerializer.js"

class RepoSerializer{
  static async getDetails(repo){
    const allowedAttributes = ["id", "name", "description", "language"]
    let serializedRepo = {}
    for(const attribute of allowedAttributes){
      serializedRepo[attribute] = repo[attribute]
    }
    let developers = await repo.$relatedQuery("developers")
    let serializedDevelopers = developers.map(developer => DeveloperSerializer.getSummary(developer))
    serializedRepo.developers = serializedDevelopers
    return serializedRepo
  }
}

export default RepoSerializer