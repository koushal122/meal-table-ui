import React from 'react'
import './index.scss'
import HeadingText from '../headingTexts'
import { reviews } from '../../Constants/constants'
import ReviewItem from '../reviewItem'

const Reviews = () => {
  return (
    <div className="review-container">
        <HeadingText heading1={"Testimony"} heading2={"Customer Says"}/>
        <div className="reviews">
            {
                reviews.map((review,index)=>{
                    return <ReviewItem key={index} data={review} className={"review-width"}/>
                })
            }
        </div>
    </div>
  )
}

export default Reviews