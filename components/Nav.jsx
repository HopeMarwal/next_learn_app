'use client'

// Components
import Link from "next/link"
import Image from "next/image"
// React hooks
import { useState, useEffect } from "react"
// Auth
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
// Theme
import { useTheme } from "next-themes"

const Nav = () => {
  // Auth config
  const { data: session } = useSession()
  const [ providers, setProviders ] = useState(null)
  const [ toggleDropdown, setToggleDropdown ] = useState(false);

  useEffect(() => {
    const setProvider = async () => {
      const response = await getProviders();
      setProviders(response)
    }

    setProvider()
  }, [])

  //Theme config
  const { systemTheme, theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const currentTheme = theme === 'system' ? systemTheme : theme

  useEffect(() => { 
    setMounted(true)
  }, [])

  const displayTheme = () => {
    if(!mounted) return null
    if(currentTheme === 'dark') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
      )
    } else {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
        </svg>

      )
    }
  }
  const handleToggleTheme = () => {
    if(currentTheme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }


  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href='/' className="flex gap-1 flex-center mr-auto">
        <Image
          src='/assets/images/logo.png'
          alt='app logo'
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="orange_gradient font-bold">MakeYourself</p>
      </Link>

      {/* Desktop navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href='/create-prompt' className="black_btn">
              Create Post
            </Link>

            <button
              type='button'
              onClick={signOut}
              className="outline_btn"
            >
              Sign Out
            </button>

            <Link href='/profile'>
              <Image 
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt='profile'
              />
            </Link>
          </div>
        ) : (
        <>
          { providers && 
            Object.values(providers).map((provider) => (
              <button
                type='button'
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className="black_btn"
              >
                Sign In
              </button>
            ))
          }
        </>
        )}
      </div>

      {/* Modile navigation */}
      <div className="sm:hidden flex relative">
          { session?.user ? (
            <div className="flex">
              <Image 
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt='profile'
                onClick={() => setToggleDropdown((prev) => !prev)}
              />

              {toggleDropdown && (
                <div className="dropdown">
                  <Link
                    className="dropdown_item"
                    href='/profile'
                    onClick={() => setToggleDropdown(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    className="dropdown_item"
                    href='/create-prompt'
                    onClick={() => setToggleDropdown(false)}
                  >
                    Create Prompt
                  </Link>

                  <button
                    type="button"
                    onClick={() => {setToggleDropdown(false); signOut()}}
                    className="mt-5 w-full black_btn"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
            { providers && 
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))
            }
          </>
          )}
      </div>

      <button className="p-1 rounded bg-black/10 dark:bg-white/50 ml-3" onClick={handleToggleTheme}>
        {displayTheme()}
      </button>
    </nav>
  )
}

export default Nav
