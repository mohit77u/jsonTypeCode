import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'

export default function SinglePost() {
    const [ post, setPost ] = useState([]);
    const [ comments, setComments ] = useState([]);
    const [ title, setTitle ] = useState('');
    const [ body, setBody ] = useState('');
    const [ toast, setToast ] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    // get single particular post
    const getParticularPost = () => {
        axios.get('/posts/' + id)
            .then((res) => {
                setPost(res.data)
                setTitle(res.data.title)
                setBody(res.data.body)
            }).catch((err) => {
                console.log(err)
            })
    }

    // get single particular post comments
    const getParticularPostComments = () =>  {
        axios.get('/comments?postId=' + id)
            .then((res) => {
                setComments(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }

    // function to update post
    const UpdatePost = (e) => {
        e.preventDefault();
        const data = {
            title: title,
            body: body,
        }
        axios.put('/posts/' + id, data)
        .then((res) => {
            setPost(res.data)
            showHideToast('Post updated successfully.')
        }).catch((err) => {
            console.log(err)
        })
    }

    // function to delete post
    const deletePost = () => {
        axios.delete('/posts/' + id)
        .then((res) => {
            console.log(res)
            showHideToast('Post deleted successfully.')
            navigate('/')
        }).catch((err) => {
            console.log(err)
        })
    }

    // to show and hide toasts
    const showHideToast = (text) => {
        setToast(text)
        setTimeout(() => {
            setToast(false)
        }, 3000)
    }

    // get all posts on component load
    useEffect(() => {
        getParticularPost();
        getParticularPostComments();
    }, [ ])

    return (
        <div>
            <section className="post py-5">
                <div className="container">
                    <h2>{ post.title }</h2>
                    <div className="row mt-3">
                        <div className="col-md-7 my-2">
                            <div className="card p-4">
                                <h4>{ post.title }</h4>
                                <p>{ post.body }</p>

                                {/* comments */}
                                <div className="comments my-3">
                                    <h3>Comments</h3>
                                    <div className="mt-4">
                                        {comments.map((comment,index) => (
                                            <div className="d-flex flex-row py-3" key={index}> 
                                                <img src="https://i.imgur.com/zQZSWrt.jpg" width="40" height="40" className="rounded-circle mt-1" alt={comment.name}/>
                                                <div className="w-100 ms-3">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="d-flex flex-row align-items-center">
                                                            <span className="mr-2"><span className='text-capitalize'>{comment.name}</span>({comment.email})</span>
                                                        </div>
                                                    </div>
                                                    <p className="text-justify mb-0">{comment.body}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* right col edit and delete post */}
                        <div className="col-md-5 my-2">
                            <div className="card p-4">
                                <form onSubmit={ UpdatePost }>
                                    <div className="form-group mb-3">
                                        <label className="form-label">Title</label>
                                        <input type="text" className="form-control" value={ title } onChange={ (e) => { setTitle(e.target.value) } } />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="form-label">Body</label>
                                        <input type="text" className="form-control" value={ body } onChange={ (e) => { setBody(e.target.value) } } />
                                    </div>
                                    <div className="form-group button-group">
                                        <button type="submit" className="btn btn-success">Update Post</button>
                                        <button type="button" className="btn btn-danger" onClick={ () => { deletePost() } }>Delete Post</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                {/* alert toast show on update and delete */ }
                { toast && (
                    <div className="container">
                        <div className="row">
                            <div className="alert alert-warning alert-dismissible fade show" role="alert">
                                { toast }
                                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                        </div>
                    </div>
                ) }
            </section>
        </div>
    )
}
