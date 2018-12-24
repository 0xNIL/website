module.exports = {
  decoration: {
    reddit: "u/",
    twitter: "@"
  },
  appId: {
    twitter: 1,
    reddit: 2
  },
  appNickname: {
    1: 'twitter',
    2: 'reddit'
  },
  profileOnApp: {
    twitter: (username) => `https://twitter.com/${username}`,
    reddit: (username) => `https://www.reddit.com/user/${username}`
  },
  contracts: {
    whitelist: {
      ropsten: '0xa6c541c3c53b9879a0549d5d8fd987c28e5dd0a2',
      abi: require('./abi/Whitelist')
    }
  }
}
