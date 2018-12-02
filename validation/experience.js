const validator = require('validator');
const isEmpty = require('./is-empty');



module.exports = function validateExperienceInput(data) {
    let errors = {};

    // Make sure fields are not empty that shouldn't be.
    data.title = !isEmpty(data.title) ? data.title : '';
    data.company = !isEmpty(data.company) ? data.company : '';
    data.from = !isEmpty(data.from) ? data.from : '';
    
    // Any item that is null or incorrect should be added to errors.
    if (validator.isEmpty(data.title)) {
        errors.title = 'Job title field is required';
    }
    if (validator.isEmpty(data.company)) {
        errors.company = 'Company field is required';
    }
    if (validator.isEmpty(data.from)) {
        errors.from = 'From field is required';
    }
    
    
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
}