import { getTweet, getReplies } from 'lib/data.js'
import prisma from 'lib/prisma'
import Tweet from 'components/Tweet'
import Tweets from 'components/Tweets'
import NewReply from 'components/NewReply'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function SingleTweet({ tweet, replies }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (typeof window !== 'undefined' && tweet.parent) {
    router.push(`/${tweet.parent_data.author.name}/status/${tweet.parent}`)
  }

  return (
    <div>
      <Tweet tweet={tweet} />
      <NewReply tweet={tweet} />

      {session && session.user.email === tweet.author.email && (
        <div className='flex-1 py-2 m-2 text-center'>
          <a
            href='#'
            className='flex items-center w-12 px-3 py-2 mt-1 text-base font-medium leading-6 text-gray-500 rounded-full hover:bg-color-accent-hover hover:color-accent-hover'
            onClick={async () => {
              const res = await fetch('/api/tweet', {
                body: JSON.stringify({
                  id: tweet.id,
                }),
                headers: {
                  'Content-Type': 'application/json',
                },
                method: 'DELETE',
              })

              if (res.status === 401) {
                alert('Unauthorized')
              }
              if (res.status === 200) {
                router.push('/home')
              }
            }}
          >
            delete
          </a>
        </div>
      )}

      <Tweets tweets={replies} nolink={true} />
    </div>
  )
}

export async function getServerSideProps({ params }) {
  let tweet = await getTweet(params.id, prisma)
  tweet = JSON.parse(JSON.stringify(tweet))

  let replies = await getReplies(params.id, prisma)
  replies = JSON.parse(JSON.stringify(replies))

  return {
    props: {
      tweet,
      replies,
    },
  }
}
