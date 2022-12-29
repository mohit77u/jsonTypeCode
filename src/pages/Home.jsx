import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";

export default function Home(){
  const [ posts, setPosts ] = useState([]);

  // function to get all posts from api
  const getPosts = () => {
    axios.get('/posts')
    .then((res) =>{
      setPosts(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }

  // get all posts on component load
  useEffect(() => {
    getPosts();
  }, [])
 
  return (
    <div className="App">
        <div className="posts py-5">
            <div className="container">
                <h2>Posts</h2>
                {/* posts loop data from api */}
                <div className="row my-3">
                    {posts.slice(0,40).map((post, index) => (
                        <div className="col-md-3 col-card my-2" key={index}>
                            <Link to={'/post/' + post.id}>
                                <div className="card p-3">
                                    <h5>{post.title}</h5>
                                    <p className="body">{post.body}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
}
