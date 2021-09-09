import React, { useEffect, useState } from 'react';
import NewsContent from "./newsContent";
import Modal from "react-bootstrap/Modal";

import axios from 'axios'
function Home(props) {
    const [category, setcategory] = useState({name:'TechCrunch',url:'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey='})
    const [categoryList , setCategoryList] = useState([{name:'TechCrunch',url:"https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey="}])
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = useState({name:'',url:''})
    const [count , setCount] = useState(1);

    
    const handleChange= (e) => {
        const name = e.target.name
        const value = e.target.value
        setFormData({...formData,[name]:value})
    }
    const addCategory = () => {
        const list = categoryList
        list.push(formData)
        setCategoryList(list)
        console.log(categoryList);
        setCount(count+1)
        handleClose()
    }
    const handleClickOpen = () => {
        setOpen(true);
        
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="Application">
            <div className="header-text">News Today</div>
            <div className="container">

            
            <div className="row category-bar">
                {categoryList.map(item=>{
                    return(
                        //{item.name===category?`catrgory-tab-selected text-center`:`catrgory-tabtext-center`}
                        <div key={item.name} className={item.name===category.name?`catrgory-tab-selected`:`catrgory-tab`} onClick={()=>{setcategory(item)}}>
                            {item.name}
                        </div>
                    )
                })}

                <button 
                    className="catrgory-tab btn" 
                    onClick={handleClickOpen}
                    disabled={count>4}
                >
                   +
                </button>
            </div>
            <NewsContent data={category}/>
            <div>
                <Modal show={open} onHide={handleClose} className="model-form">
                    <Modal.Body className="form-1">
                        <div className="title">Add Category</div>
                            <input 
                                type="text" 
                                name="name"
                                className="form-field" 
                                placeholder="Category Name"
                                onChange={handleChange}
                            />
                        <div >
                            <input 
                                type="text" 
                                name="url"
                                className="form-field" 
                                placeholder="API URL"
                                onChange={handleChange}
                            />
                        </div>
                        <div 
                            className="model-btn text-center" 
                            onClick={addCategory}
                        >
                            + Add
                        </div>
                    </Modal.Body>
                </Modal>
                </div>
            </div>
            
        </div>
    );
}

export default Home;