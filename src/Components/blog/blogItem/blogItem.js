import React from 'react'
import './blogItem.scss'

const BlogItem = ({blog,className}) => {
  return (
    <div className={`blog-item-container ${className}`}>
        <img src={blog.thumbnail} alt='blogImage' className="blog-item-image" />
        <div>
            <p className='blog-item-time'>{blog.time}</p>
            <p className='blog-item-title' >{blog.title}</p>
            <p className='blog-item-description'>{blog.description}</p>
        </div>
    </div>
  )
}

export default BlogItem