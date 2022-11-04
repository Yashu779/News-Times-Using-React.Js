import React from 'react'

const Newsitem = (props)=> {
  
    let {title, description, imageUrl, url, author,date,source} = props;
    return (
      <div className='my-3'>
            <div  className="card">
              
            <img src={!imageUrl?"https://www.techpluto.com/wp-content/uploads/2022/09/getty_177556195_222561.jpg":imageUrl } />
            <div  className="card-body">
              <h5  className="card-title">{ title }
              <span className='position-absolute  top-0 starts-100 translate-middel badge rounded-pill bg-danger ' style={{center:"50%" }}>{source}</span>
              
              </h5>
              <p  className="card-text">{ description }...</p>
              <p  className="card-text"><small className='text-muted'>By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
              <a rel= "noreferrel"href={url}  className="btn btn-sm btn btn-dark my-4">Read More</a>
            </div>
        </div>
     </div> 
    )
  }


export default Newsitem