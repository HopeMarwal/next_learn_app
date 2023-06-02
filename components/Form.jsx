'use client'
import Link from "next/link"
import { useState } from "react";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {

  const [img, setImg] = useState(null);

  const handleImage = async (e) => {
    const file = e.target.files[0]

    const formFile = new FormData()

    formFile.append('file', file)
    formFile.append('upload_preset', 'next_preset')

    const data = await fetch('https://api.cloudinary.com/v1_1/djr5mw1np/image/upload', {
      method: 'POST',
      body: formFile
    }).then(res => res.json())

    setImg(data.secure_url)
    setPost({...post, img: data.secure_url })
  }
  

  return (
    <section className="w-full max-w-full flex-start flex-col">


      <h1 className="head_text text_left">
        <span className="blue_gradient">{type} Post</span>
      </h1>

      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your imagination run wild with any AI-powered platform
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-10 mb-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        {/* Textarea */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700 dark:text-gray-100">
            Your AI Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({...post, prompt: e.target.value})}
            placeholder="Write your prompt here..."
            required
            className="form_textarea"
          />
        </label>

        {/* Tag */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700 dark:text-gray-100">
            Tag{` `}
            <span className="font-normal">(#product, #idea)</span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({...post, tag: e.target.value})}
            placeholder="#tag"
            required
            className="form_input"
          />
        </label>

        {/* Image */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700 dark:text-gray-100">
            Image{` `}
            <span className="font-normal">...img icon...</span>
          </span>
          <input
            type='file'
            onChange={(e) => handleImage(e)}
            required
            className="form_input"
          />
          {img && <img src={img} />}
        </label>

        {/* Footer form */}
        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-gray-500 text-sm dark:text-gray-100'>
            Cancel
          </Link>

          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form
