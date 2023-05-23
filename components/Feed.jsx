'use client'

import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"

//Prompt Cards wrap component
const PromptCardList = ({ data, handleSearchChange}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data?.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleSearchChange}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState();
  const [posts, setPosts] = useState();

  useEffect(() => {
    //Fetch req
    const fetchPosts = async () => {
      const res = await fetch('/api/prompt')
      const data = await res.json()
      
      setPosts(data)
    }
    fetchPosts()
  }, [])

  const handleSearchChange = (e) => {
    
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList
        data={posts}
        handleSearchChange={() => {}}
      />
    </section>
  )
}

export default Feed
