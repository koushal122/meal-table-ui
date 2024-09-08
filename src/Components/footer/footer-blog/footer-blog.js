import React from 'react'
import  './footer-blog.scss'
import { blogs } from '../../../Constants/constants'

const FooterBlog = () => {
  return (
    <div className='footer-blog-container'>
        <h3>RECENT BLOG</h3>
        {
            blogs.map((blog,index)=>{
                return (
                    <div key={index} className='footer-blog'>
                        <img src={blog.thumbnail} alt='blogImage' className='footer-blog-image' />
                        <div className='footer-blog-details'>
                            <h3 className='footer-blog-title'>{blog.title}</h3>
                            <p className='footer-blog-time'>{blog.time}</p>
                        </div>
                    </div>
                )
            })
        }
    </div>
  )
}

export default FooterBlog