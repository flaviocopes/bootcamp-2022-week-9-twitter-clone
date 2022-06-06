import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function NewTweet({ tweets, setTweets }) {
  const [content, setContent] = useState('')
  const { data: session } = useSession()
  const router = useRouter()

  if (!session) return null

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()

        if (!content) {
          alert('No content')
          return
        }

        await fetch('/api/tweet', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content,
          }),
        })

        const tweet = await res.json()

        setTweets([tweet, ...tweets])

        //router.reload(window.location.pathname)
      }}
    >
      <div className='flex'>
        <div className='flex-1 px-1 pt-2 mt-2 mr-1 ml-1'>
          <textarea
            className='border p-4 w-full text-lg font-medium bg-transparent outline-none color-primary '
            rows={2}
            cols={50}
            placeholder="What's happening?"
            name='content'
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>

      <div className='flex'>
        <div className='flex-1 mb-5'>
          <button className='border float-right px-8 py-2 mt-0 mr-2 font-bold rounded-full'>
            Tweet
          </button>
        </div>
      </div>
    </form>
  )
}
