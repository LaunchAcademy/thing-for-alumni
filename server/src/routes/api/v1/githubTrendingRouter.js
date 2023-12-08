import express from "express";
import Repo from '../../../models/Repo.js'
import RepoSerializer from "../../../../serializers/RepoSerializer.js";

const githubTrendingRouter = new express.Router();

githubTrendingRouter.get("/", async (req, res) => {
  try {
    const trendingRepos = await Repo.query()
    const serializedTrendingRepos = await Promise.all(trendingRepos.map(async repo => {
      return await RepoSerializer.getDetails(repo)
    }))
    return res.status(200).json({ trendingRepos: serializedTrendingRepos })
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
})

export default githubTrendingRouter;
