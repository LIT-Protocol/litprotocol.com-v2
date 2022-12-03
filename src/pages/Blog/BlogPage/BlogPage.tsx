import { Helmet } from 'react-helmet'

import { BasicTemplate } from 'src/templates'
import { PUBLIC_PATHS } from 'src/config'

import BlogTop from './BlogTop'
import BlogPreviews from './BlogPreviews'
import { useEffect, useState } from 'react'

const BlogPage = () => {
  const [blogData, setBlogData] = useState(null)

  useEffect(() => {
    getBlogData()
  }, [])

  const getBlogData = async () => {
    try {
      const blogRes = await fetch(
        'https://api.dropinblog.com/v1/json/?b=68f428e3-64f1-4c82-87a5-6de32afca8ca',
      )
      const blogJson = await blogRes.json()
      console.log('blogJson', blogJson)
      setBlogData(blogJson.data)
    } catch (err) {
      console.log('Error fetching blog posts')
    }
  }

  return (
    <BasicTemplate color="basic">
      <Helmet>
        <title>Blog | Lit Protocol</title>
        <meta
          property="og:url"
          content={`https://litprotocol.com/${PUBLIC_PATHS.BLOG}`}
        />
        <meta property="og:title" content="Blog | Lit Protocol" />
        <meta
          property="twitter:url"
          content={`https://litprotocol.com/${PUBLIC_PATHS.BLOG}`}
        />
        <meta property="twitter:title" content="Blog | Lit Protocol" />
      </Helmet>
      <BlogTop />
      {blogData && <BlogPreviews blogData={blogData} />}
    </BasicTemplate>
  )
}

export default BlogPage
