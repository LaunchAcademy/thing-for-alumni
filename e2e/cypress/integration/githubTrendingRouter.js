/// <reference types="cypress" />
import GithubRepo from "../../../server/src/models/GithubRepo.js"
import cheerio from 'cheerio'
import got from "got"

context("api/v1/github-trending", () => {

  describe("GET /github-trending", async () => {
    let url = '/api/v1/github-trending'
    const githubUrl = "https://github.com/trending?since=weekly"
    //Not able to run.  Possible configuration issues.
    const apiResponse = await got(githubUrl)
    const responseBody = apiResponse.body

    const $ = cheerio.load(responseBody)
    const $body = $("body")
    const $firstRepo = $body.find(".Box-row:first")
    const $repo = new GithubRepo($firstRepo)
    const singleRepoData = {}
    singleRepoData.name = $repo.name()
    singleRepoData.description = $repo.description()
    singleRepoData.language = $repo.language()
    const repoData = [singleRepoData]     

    let developerData = []
    const developersArray = $repo.contributorsArray()
    developersArray.forEach(developer => {
      const singleDeveloperData = {}
      singleDeveloperData.username = developer
      developerData.push(singleDeveloperData) 
    })

    beforeEach(() => {
      //Seed repos
      cy.task("db:truncate", "Repo")
      cy.task("db:insert", {modelName: "Project", json: repoData})
      
      //Seed developers
      cy.task("db:truncate", "Developer")
      cy.task("db:insert", {modelName: "Developer", json: developerData})

      //Seed contributors
      cy.task("db:find", {modelName: "Repo", conditions: {name: singleRepoData.name} })
        .then(repos => {
          cy.task("db:find", {modelName: "Developer", conditions: {username: developerData[0].username}})
          .then(developers => {
            cy.task("db:truncate", "Contributor")
            cy.task("db:insert", {modelName: "Contributor", json: [
              {repoId: repos[0].id, developerId: developers[0].id}
            ]})
          })
        })
    })

    it("has the correct response type", () => {
      cy.request(url)
        .its("headers")
        .its("content-type")
        .should("include", "application/json")
    })

    it("returns the correct status code", () => {
      cy.request(url)
        .its("status")
        .should("be.equal", 200)
    })

    //Not updated
    it("has the right repo name property and value", () => {
      cy.request(url)
        .its("body")
        .its("trendingRepos")
        .should((repos) => {
          expect(repos).to.have.property("name", "name")
        })
    })
  
  })
})

