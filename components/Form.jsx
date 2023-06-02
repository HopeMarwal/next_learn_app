'use client'
import Link from "next/link"
import { useState } from "react";
import Image from "next/image";

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
          <span className="flex gap-1 mb-4 font-satoshi font-semibold text-base text-gray-700 dark:text-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
              </svg>
              <span>Add image...</span>
          </span>
          <input
            type='file'
            onChange={(e) => handleImage(e)}
            required
            className="hidden"
          />
          {img && 
            <Image 
              src={img} 
              alt='user_uploaded_image'
              width={150}
              height={100}
              className="object-cover"
            />
            }
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
