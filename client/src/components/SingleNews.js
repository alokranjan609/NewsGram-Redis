import React from 'react'
import './SingleNews.css'

function SingleNews({news}) {
  return (
    <div className='news-card'>
       <img src={news.image} alt={news.title} />
      <h2>{news.title}</h2>
      <p>{news.description}</p>
      <button onClick={()=>window.open(news.url)}>Read More</button>
    </div>
  )
}

export default SingleNews
