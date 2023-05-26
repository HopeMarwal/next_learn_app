'use client'
//hooks
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
//components
import Profile from "@components/Profile"

const MyProfile = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [ posts, setPosts ] = useState();

  useEffect(() => {
    //Fetch req
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`)
      const data = await res.json()
      
      setPosts(data)
    }
    if(session?.user.id) fetchPosts()
  }, [])

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }

  const handleDelete = async (post) => {
    const hasConfirmed = confirm('Are you sure you want to delete this prompt?')

    if(hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE'
        })

        const filteredPosts = posts.filter((item) => item._id !== post._id)

        setPosts(filteredPosts)
      } catch (error) {
        
      }
    }
  }

  return (
    <Profile
      name='My'
      desc='Welcome to my profile'
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile
