import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { GET_ERROR, SET_CURRENT_USER } from './types';


export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData)
         .then(res => history.push('/login'))
         .catch(err =>
            dispatch({
                type: GET_ERROR,
                payload: err.response.data
            })
        );
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
    axios.post('/api/users/login', userData)
         .then(res => {
            // Save to localStorage
            const { token } = res.data;
            // Set token to ls
            localStorage.setItem('jwtToken', token);
            // Set token to Auth Header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // set current user
            dispatch(setCurrentUser(decoded))
         })
         .catch(err => 
            dispatch({
                type: GET_ERROR,
                payload: err.response.data
            }))
}


// Log user out
export const logoutUser = () => dispatch => {
    // Remove the token from local storage
    localStorage.removeItem('jwtToken');
    // Remove the auth header for furture requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
}




// Set logged in user
export const setCurrentUser = (decoded) =>  {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

