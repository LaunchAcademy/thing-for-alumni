import Developer from "../../models/Developer.js"
import GithubRepo from "../../models/GithubRepo.js"
import cheerio from 'cheerio'
import got from "got"

class DeveloperSeeder {
  static async seed(){
    const url = "https://github.com/trending?since=weekly"
    const apiResponse = await got(url);
    const responseBody = apiResponse.body;
    
    const $ = cheerio.load(responseBody);
    const $body = $("body")
    const $repos = $body.find(".Box-row")

    let developerData = []
    $repos.each((index, element) => {
      const $repo = new GithubRepo($(element))
      const developersArray = $repo.contributorsArray()
      developersArray.forEach(developer => {
        const singleDeveloperData = {}
        singleDeveloperData.username = developer
        developerData.push(singleDeveloperData) 
      })
    })

    for (const singleDeveloperData of developerData){
      const currentDeveloper = await Developer.query().findOne(singleDeveloperData)
      if(!currentDeveloper){
        await Developer.query().insert(singleDeveloperData)
      }
    }

  }
}

export default DeveloperSeeder