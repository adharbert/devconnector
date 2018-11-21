import axios from 'axios';
import { GET_ERROR } from './types';


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