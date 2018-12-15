import axios from 'axios';
import { ADD_POST, GET_POSTS, GET_ERRORS, POSTS_LOADING, DELETE_POST } from './types';




// Add Post
export const addPost = postData => dispatch => {
    axios.post('/api/posts', postData)
         .then(res => 
            dispatch({
                type: ADD_POST,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }) 
        );
};



// Get Posts
export const getPosts = () => dispatch => {
    dispatch(setPostLoading());
    axios.get('/api/posts')
         .then(res =>
            dispatch({
                type: GET_POSTS,
                payload: res.data
            })
         )
         .catch(err =>
            dispatch({
                type: GET_POSTS,
                payload: null
            })
    );
}



// Delete post
export const deletePost = id => dispatch => {
    axios.delete(`/api/posts/${id}`)
         .then(res => 
            dispatch({
                type: DELETE_POST,
                payload: id
            })
        )
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }) 
        );
};



// Add Like
export const addLike = id => dispatch => {
    axios.post(`/api/posts/like/${id}`)
         .then(res => dispatch(getPosts())
         )
         .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response
            })
        );
}


// Remove like
export const removeLike = id => dispatch => {
    axios.post(`/api/posts/unlike/${id}`)
         .then(res => dispatch(getPosts())
         )
         .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response
            })
        );
}


export const setPostLoading = () => {
    return {
        type: POSTS_LOADING
    }
}

