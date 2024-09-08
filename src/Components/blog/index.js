import React from 'react'
import { blogs } from '../../Constants/constants'
import BlogItem from './blogItem/blogItem'
import './index.scss'
const Blog = ({className}) => {
  return (
    <div className="blogs-container">
        <h1 className='blogs-container-heading'>RECENT FROM BLOG</h1>
        <div className="blogs-items-container">
            {
                blogs.map((blog,index)=>{
                    return <BlogItem key={index} blog={blog}/>
                })
            }
        </div>
    </div>
  )
}

export default Blog