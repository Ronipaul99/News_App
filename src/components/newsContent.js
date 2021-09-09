import React, { useEffect, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress';
// import data from './data.json'
function NewsContent(props) {
    const [newsObj , setNewsObj] = useState([])
    const [oldObj , setOldObj] = useState([])
    const [spin , setSpin] = useState(true)
    const [searchText , setSearchText] = useState('')

    const search = (Search_text) => {
        setSpin(true)
        if(Search_text===''){
            setNewsObj(oldObj)
            setTimeout(() => {
                setSpin(false)
            }, 500);
        }else{
            const filterObj = newsObj.filter((item)=>{
                if((item.author !== null &&item.author.toLowerCase().includes(Search_text.toLowerCase())) || 
                    (item.title!== null && item.title.toLowerCase().includes(Search_text.toLowerCase())) ||
                    (item.description !== null && item.description.toLowerCase().includes(Search_text.toLowerCase()))||
                    (item.content !== null && item.content.toLowerCase().includes(Search_text.toLowerCase()))){
                        return item
                    }
            })
            setNewsObj(filterObj)
            setTimeout(() => {
                setSpin(false)
            }, 500);
            
        }  
    }

    const handleChange = (e) => {
        setSearchText(e.target.value)
        search(e.target.value)
    }
    const getArticles = () => {
        axios.get(props.data.url+"9f912effda464f639b6b0ba2079d6ba3",{
            header:{
                "Access-Control-Allow-Origin": '*'
            }
        }).then(res=>{
            setNewsObj(res.data.articles)
            setOldObj(res.data.articles)
            setSpin(false)
        }).catch(err=>{
            setNewsObj([])
            setSpin(false)
        })
    }

    useEffect(()=>{
        setSpin(true)
        getArticles()
    },[props.data.url])

    return (
        <div className="news col-md-12">
            <div className="row">
                <div className="search-bar col-md-12">
                    <SearchIcon className="col-1" />
                    <input className="col-11 search-text" onChange={handleChange}/>
                </div>
                {spin?
                    <div className="text-center spinner">
                        <CircularProgress />
                    </div>
                    :
                    <div>
                        {
                           newsObj.length>0?
                           <div>
                                {newsObj.map((item)=>{
                                        return(
                                            <div className="news-card" key={item.url}>  
                                                <div className="row">
                                                    <div className="col-md-9 col-sm-8">
                                                        <div className="headline">
                                                            {item.title}
                                                        </div>
                                                        <span className="sub-head-line">{item.publishedAt} - {item.author}</span>
                                                        <div className="card-content">
                                                            {item.content}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3 col-sm-4">
                                                        <img className="card-image" src={item.urlToImage}/>
                                                    </div>
                                                    
                                                </div>                  
                                            </div>
                                        )
                                    })}
                            </div>
                           :<div className="text-center spinner">
                               No data Available
                           </div>
                            
                        }
                    </div>
                    
                }    
            </div>
            
        </div>
    );
}

export default NewsContent;