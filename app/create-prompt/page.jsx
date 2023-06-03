'use client'

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";



import Form from "@components/Form";


const CreatePrompt = () => {
  const router = useRouter()
  const { data: session } = useSession()

  const [submitting, setSubmitting] = useState(false);
  const [isPostCreated, setIsPostCreated] = useState(false)
  const [post, setPost] = useState({ prompt: '', tag: '', img: '' })


  const handleImg = (e) => {
    
  }

  const createPrompt = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      // API POST new prompt to db
      const res = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
          img: post.img
        })
      })
      if(res.ok) {
        //Alert success
        setIsPostCreated(true)
        setTimeout(() => {
          router.push('/')
        }, 2000);
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
      isResOk={isPostCreated}
    />
  )
}

export default CreatePrompt
