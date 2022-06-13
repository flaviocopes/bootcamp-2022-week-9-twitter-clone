export const getTweets = async (prisma, take, cursor) => {
  return await prisma.tweet.findMany({
    where: {
      parent: null,
    },
    orderBy: [
      {
        id: 'desc',
      },
    ],
    include: {
      author: true,
    },
    take,
    cursor,
    skip: cursor ? 1 : 0,
  })
}

export const getUserTweets = async (name, prisma) => {
  const tweets = await prisma.tweet.findMany({
    where: {
      author: {
        name: name,
      },
      parent: null,
    },
    orderBy: [
      {
        id: 'desc',
      },
    ],
    include: {
      author: true,
    },
  })

  return tweets
}

export const getTweet = async (id, prisma) => {
  const tweet = await prisma.tweet.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      author: true,
    },
  })

  if (tweet.parent) {
    tweet.parent_data = await prisma.tweet.findUnique({
      where: {
        id: parseInt(tweet.parent),
      },
      include: {
        author: true,
      },
    })
  }

  return tweet
}

export const getReplies = async (id, prisma) => {
  const tweets = await prisma.tweet.findMany({
    where: {
      parent: parseInt(id),
    },
    orderBy: [
      {
        id: 'desc',
      },
    ],
    include: {
      author: true,
    },
  })

  return tweets
}
