'use client'

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreatePrompt = () => {
  const router = useRouter()
  const { data: session } = useSession()

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: '', tag: '' })

  const createPrompt = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      // API POST call in app/api/prompt/new
      const res = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: prompt.tag
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
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt
