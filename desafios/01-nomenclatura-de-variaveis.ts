// Nomenclatura de variáveis

const userCategories = [
  {
    title: 'User',
    followers: 5
  },
  {
    title: 'Friendly',
    followers: 50,
  },
  {
    title: 'Famous',
    followers: 500,
  },
  {
    title: 'Super Star',
    followers: 1000,
  },
]

export default async function fetchGitHubUserCategory(req, res) {
  const githubUsername = String(req.query.username)

  if (!githubUsername) {
    return res.status(400).json({
      message: `Please provide an username to search on the github API`
    })
  }

  const githubUserResponse = await fetch(`https://api.github.com/users/${githubUsername}`);

  if (githubUserResponse.status === 404) {
    return res.status(400).json({
      message: `User with username "${githubUsername}" not found`
    })
  }

  const githubUserProfile = await githubUserResponse.json()

  const sortedUserCategories = userCategories.sort((currentCategory, nextCategory) =>  nextCategory.followers - currentCategory.followers); 

  const qualifiedCategory = sortedUserCategories.find(userCategory => githubUserProfile.followers > userCategory.followers)

  const categorySummary = {
    github: githubUsername,
    category: qualifiedCategory.title
  }

  return categorySummary
}

fetchGitHubUserCategory({ query: {
  username: 'josepholiveira'
}}, {})