import React, { useState, useEffect } from 'react'
import NavigationBar from './NavigationBar'
import Posts from './Posts'

function PostView() {
  const [userPosts, setUserPosts] = useState([])
 
  useEffect(() => {
    fetch('https://arpit-singh22.github.io/jsonapi/data.json/user')
      .then(response => response.json())
      .then(data => {
        setUserPosts(data)
      })
  }, [])
  return <>
    <NavigationBar />
    <div className='post-container'>
      {
        userPosts.map(post => <Posts key={post.id} post={post} />)
      }
    </div>
  </>
}

export default PostView