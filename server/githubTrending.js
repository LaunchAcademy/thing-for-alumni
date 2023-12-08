import cheerio from 'cheerio'
import got from "got"
import GithubRepo from './src/models/GithubRepo.js'

const url = "https://github.com/trending?since=weekly"

try {
  const apiResponse = await got(url);
  const responseBody = apiResponse.body;
  
  const $ = cheerio.load(responseBody);
  const $body = $("body")
  const $repos = $body.find(".Box-row")
  
  console.log(`
      Github Weekly Trending Repos
  `)


  $repos.each(repo => {

    // repo.getTitle()



  })

  $repos.each((index, element) => {
    const $repo = new GithubRepo($(element))
    $repo.printSummary(index+1)
  })
} catch (error) {
  console.error(`Error: ${error.message}`)
}

