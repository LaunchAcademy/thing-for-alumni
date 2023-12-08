class GithubRepo {
  constructor($repo) {
    this.$repo = $repo
  }

  name() {
    const $h1 = this.$repo.find("h1")
    const heading = $h1.text()
    const slashIndex = heading.indexOf('/')
    const name = heading.substr(slashIndex+1, heading.length).trim()
    return name
  }

  description() {
    const description = this.$repo.find("p").text().trim()
    return description
  }

  language() {
    const $bottomDiv = this.$repo.find(".f6")
    const language = $bottomDiv.find("span").find("span:nth-child(2)").text().trim() || 'NA'
    return language
  }

  // service/private
  contributorsArray() {
    const $bottomDiv = this.$repo.find(".f6")
    const $userAnchors = $bottomDiv.find("span:contains('Built')").find("a")
    let contributorsArray = []
    $userAnchors.each((index) => {
      const username = $userAnchors[index].attribs.href
      const cleanUsername = username.substr(1, username.length)
      contributorsArray.push(cleanUsername)
    })
    return contributorsArray
  }

  contributors() {
    const contributorsArray = this.contributorsArray()
    let contributors = ''
    contributorsArray.forEach((contributor, index) => {
      if (index === contributorsArray.length-1) {
        contributors += `${contributor}`
      } else {
        contributors += `${contributor}, `
      }
    })
    return contributors
  }

  printSummary(listNum) {
    console.log(`
      ----------------------------------------------
      ${listNum}. ${this.name()}
      ==============================================
      ${this.description()}

      Written primarily in ${this.language()}

      Primary Contributors: ${this.contributors()}
      ----------------------------------------------
    `)
  }
}

module.exports = GithubRepo