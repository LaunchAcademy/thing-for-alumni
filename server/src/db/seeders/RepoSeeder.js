import Repo from "../../models/Repo.js"
import GithubRepo from "../../models/GithubRepo.js"
import cheerio from 'cheerio'
import got from "got"

class RepoSeeder {
  static async seed(){
    const url = "https://github.com/trending?since=weekly"
    const apiResponse = await got(url);
    const responseBody = apiResponse.body;
    
    const $ = cheerio.load(responseBody);
    const $body = $("body")
    const $repos = $body.find(".Box-row")

    let repoData = []
    $repos.each((index, element) => {
      const singleRepoData = {}
      const $repo = new GithubRepo($(element))
      singleRepoData.name = $repo.name()
      singleRepoData.description = $repo.description()
      singleRepoData.language = $repo.language()
      repoData.push(singleRepoData) 
    })

    for (const singleRepoData of repoData){
      const currentRepo = await Repo.query().findOne(singleRepoData)
      if(!currentRepo){
        await Repo.query().insert(singleRepoData)
      }
    }

  }
}

export default RepoSeeder