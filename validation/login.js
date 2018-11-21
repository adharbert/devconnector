const validator = require('validator');
const isEmpty = require('./is-empty');



module.exports = function validateLoginInput(data) {
    let errors = {};

    // Make sure fields are not empty that shouldn't be.
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
 
    // Any item that is null or incorrect should be added to errors.
    if (!validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }    
    if (validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }    
    if (validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }
    
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
}