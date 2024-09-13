// import { set } from 'mongoose'
import React, { useEffect, useRef, useState } from 'react'
import SingleNews from './SingleNews'
import './News.css'
// require('dotenv').config();

function News() {
    const [newsList,setNewsList]=useState([]);
    const [query,setquery]=useState('india')
    const queryInputRef=useRef(null);
    const url=`http://localhost:5000/news/${query}`; // Use your own backend URL

    useEffect(()=>
    {
        async function fetchData()
        {
            console.log(url);
            console.log(query + "fetch");
            const response=await fetch(url);
            const jsonData=await response.json();
            setNewsList(jsonData.articles);
        }
        fetchData();
    },[query, url]);

    function handleinput(event)
    {
        event.preventDefault();
        const queryValue = queryInputRef.current.value;
        setquery(queryValue);
    }

    return (
      <div>
        <h1 className='header'>NewsGram</h1>
        <form onSubmit={handleinput}>
          <input className='inputbar' type="text" ref={queryInputRef} placeholder='Enter Your search term....' />
          <input className='submitbtn' type="submit" value="Search" />
        </form>
        <br />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,30%)', justifyContent: 'space-between', rowGap: '20px' }}>
          {newsList.map(news => <SingleNews news={news} key={news.url} />)}
        </div>
      </div>
    )
}



// function News() {
//     const [newsList,setNewsList]=useState([])
//     const [query,setquery]=useState('india')
//     const queryInputRef=useRef(null);
//     const url="https://gnews.io/api/v4/search?q="+query+"&apikey=ad9bb953577ab6d314917475f7161baf";

//     useEffect(()=>
//     {
//         async function fetchData()
//         {
//             console.log(url);
//             console.log(query+"fetch");
//             const response=await fetch(url);
//             const jsonData=await response.json();
//             setNewsList(jsonData.articles)
//         }
//         fetchData();
//     },[query,url])

//     // async function fetchData()
//     // {
//     //     console.log(url);
//     //     console.log(query+"fetch");
//     //     const response=await fetch(url);
//     //     const jsonData=await response.json();
//     //     setNewsList(jsonData.articles)
//     // }
//     function handleinput(event)
//     {
//         event.preventDefault();
//         const queryValue=queryInputRef.current.value;
//         console.log(queryValue+"handle");
//         setquery(queryValue);

//     }
   
//   return (
//     <div >
//         <h1 className='header'>NewsGram</h1>
//          <form  onSubmit={handleinput}>
//         <input className='inputbar'  type="text" ref={queryInputRef} />
//         <input className='submitbtn' onClick={handleinput} type="submit" value="Submit" />
//     </form> 
   
//     <br />
//         <div style={{display:'grid',gridTemplateColumns: 'repeat(3,30%)',justifyContent:'space-between',rowGap:'20px'}}>
//     {
//         newsList.map(news=>
//             {
//                 return <SingleNews news={news} />
//             })
//     }
  
// </div></div>


   
//   )
// }
export default News 
