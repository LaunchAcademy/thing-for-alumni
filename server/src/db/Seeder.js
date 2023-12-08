/* eslint-disable no-console */
import { connection } from "../boot.js"
import RepoSeeder from "./seeders/RepoSeeder.js"
import DeveloperSeeder from "./seeders/DeveloperSeeder.js"
import ContributorSeeder from "./seeders/ContributorSeeder.js"

class Seeder {
  static async seed() {
    console.log("Seeding repos...")
    await RepoSeeder.seed()

    console.log("Seeding developers...")
    await DeveloperSeeder.seed()

    console.log("Seeding contributors...")
    await ContributorSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder