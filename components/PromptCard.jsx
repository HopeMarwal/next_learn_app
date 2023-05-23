'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState('');




  return (
    <div className="prompt_card">
      {/* Header */}
      <div className="flex justify-between items-start gap-5">
        
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          {/* Icon */}
          <Image
            src={post.creator.image}
            alt='user_image'
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
        
          {/* User info */}
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">{post.creator.username}</h3>
            <p className="font-inter text-sm text-gray-500">{post.creator.email}</p>
          </div>
        </div>
        {/* Button */}
        <div className="copy_btn" onClick={() => {}}>
          <Image
            width={12}
            height={12}
            src={ copied === post.prompt
                  ? '/assets/icons/tick.svg'
                  : 'assets/icons/copy.svg'
                }
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        onClick={() => handleTagClick && handleTagClick(post.tag)}
        className="font-inter text-sm blue_gradient cursor-pointer"
      >
        {post.tag}
      </p>
    </div>
  )
}

export default PromptCard