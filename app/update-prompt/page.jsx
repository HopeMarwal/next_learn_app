'use client'

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const EditPrompt = () => {
  const router = useRouter()

  //get id param from route
  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: '', tag: '', img: '' })

  useEffect(() => {
    const getPromptDetails = async () => {
      const res = await fetch(`/api/prompt/${promptId}`)
      const data = await res.json()

      setPost({
        prompt: data.prompt,
        tag: data.tag,
        img: data.img
      })
    }

    if(promptId) getPromptDetails()
    
  }, [promptId])

  const updatePrompt = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    if(!promptId) return alert('Prompt not found')

    try {
      // API PATCH updated prompt to db
      console.log(post.img)
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          img: post.img
        })
      })
      if(res.ok) {
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt
