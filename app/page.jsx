import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">Creative Posts</span> 
      </h1>
      <p className='desc text-center'>MakeYourself is an open-source posting tool for modern world to
      discover, create and share creative blog posts.</p>

      <Feed />
    </section>
  )
}

export default Home
