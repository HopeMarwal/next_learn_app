'use client'
//hooks
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
//components
import Profile from "@components/Profile"

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams()
  const userName = searchParams.get('name')
  const [ posts, setPosts ] = useState();

  useEffect(() => {
    //Fetch req
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${params?.id}/posts`)
      const data = await res.json()
      
      setPosts(data)
    }
    if(params?.id) fetchPosts()
  }, [])


  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional posts and be inspired by the power of their imagination`}
      data={posts}
    />
  )
}

export default UserProfile
