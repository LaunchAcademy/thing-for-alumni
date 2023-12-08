import Contributor from "../../models/Contributor.js"
import Repo from "../../models/Repo.js"
import Developer from "../../models/Developer.js"
import GithubRepo from "../../models/GithubRepo.js"
import cheerio from "cheerio"
import got from "got"

class ContributorSeeder {
  static async seed(){
    const url = "https://github.com/trending?since=weekly"
    const apiResponse = await got(url);
    const responseBody = apiResponse.body;
    
    const $ = cheerio.load(responseBody);
    const $body = $("body")
    const $repos = $body.find(".Box-row")

    let contributorData = []
    let repos = []
    $repos.each((index, element) => {
      const $repo = new GithubRepo($(element))
      repos.push($repo)
    })

    for (const singleRepo of repos) {
      const repoName = singleRepo.name()
      const repo = await Repo.query().findOne({ name: repoName})
      const repoId = repo.id

      const developersArray = singleRepo.contributorsArray()
      for (const developer of developersArray) {
        const dev = await Developer.query().findOne({ username: developer })
        const developerId = dev.id
        contributorData.push({ repoId, developerId }) 
      }
    }

    for (const singleContributorData of contributorData){
      const currentContributor = await Contributor.query().findOne(singleContributorData)
      if(!currentContributor){
        await Contributor.query().insert(singleContributorData)
      }
    }

  }
}

export default ContributorSeeder