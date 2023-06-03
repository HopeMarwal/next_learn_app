'use client'

import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"

//Prompt Cards wrap component
const PromptCardList = ({ data, handleTagClick}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data?.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState(null)
  const [posts, setPosts] = useState();

  useEffect(() => {
    //Fetch req
    const fetchPosts = async () => {
      const res = await fetch('/api/prompt')
      const data = await res.json()
      console.log('data updated on feed page')
      console.log(data)
      
      setPosts(data)
    }
    fetchPosts()
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [searchText])


  const handleSearchChange = (e) => {
    const target = e.target.value
    setSearchText(target)
  
    let filteredPosts = []
    const regex = new RegExp(target.trim(), 'i')

    // Search by Tag
    const filteredByTag = posts.filter((p) => p.tag.split(' ').includes(target) )
    filteredByTag?.forEach(el => filteredPosts.push(el))

    // Search by prompt
    const filteredByPrompt = posts.filter((p) => regex.test(p.prompt))
    // Check if prompt is already in filteredPosts
    filteredByPrompt?.forEach((el) => {
      let newFilter = filteredPosts.filter((post) => post._id === el._id)
      if(newFilter.length === 0) {
        filteredPosts.push(el)
      }
    })

    // Search by userName
    const filteredByUser = posts.filter((post) => (
      regex.test(post.creator.username) 
    ))
    // Check if prompt is already in filteredPosts
    filteredByUser?.forEach((el) => {
      let userFilter = filteredPosts.filter((post) => post._id === el._id)
      if(userFilter.length === 0) {
        filteredPosts.push(el)
      }
    })

    setResults(filteredPosts)
  }


  const handleTagClick = (tag) => {
    setSearchText(tag)
    const filteredPosts = posts.filter((item) => (
      item.tag.split(' ').includes(tag)
    ))
   setResults(filteredPosts)
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

      {
        searchText.length > 0 
          ? <PromptCardList
              data={results}
              handleTagClick={handleTagClick}
            />
          : <PromptCardList
              data={posts}
              handleTagClick={handleTagClick}
            />
      }

    </section>
  )
}

export default Feed
