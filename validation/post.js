const validator = require('validator');
const isEmpty = require('./is-empty');



module.exports = function validatePostInput(data) {
    let errors = {};

    // Make sure fields are not empty that shouldn't be.
    data.text = !isEmpty(data.text) ? data.text : '';
 
    // Any item that is null or incorrect should be added to errors.

    if (!validator.isLength(data.text, { min: 10, max: 300 })) {
        errors.text = 'Post must be between 10 and 300 characters.';
    }

    if (validator.isEmpty(data.text)) {
        errors.text = 'Text field is required';
    }    
    
    
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
}