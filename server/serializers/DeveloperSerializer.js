class DeveloperSerializer{
  static getSummary(developer){
    const allowedAttributes = ["id", "username"]
    let serializedDeveloper = {}
    for(const attribute of allowedAttributes){
      serializedDeveloper[attribute] = developer[attribute]
    }
    return serializedDeveloper
  }
}

export default DeveloperSerializer