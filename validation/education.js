const validator = require('validator');
const isEmpty = require('./is-empty');



module.exports = function validateEducationInput(data) {
    let errors = {};

    // Make sure fields are not empty that shouldn't be.
    data.school = !isEmpty(data.school) ? data.school : '';
    data.degree = !isEmpty(data.degree) ? data.degree : '';
    data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
    data.from = !isEmpty(data.from) ? data.from : '';
    
    
    // Any item that is null or incorrect should be added to errors.
    if (validator.isEmpty(data.school)) {
        errors.school = 'School field is required';
    }
    if (validator.isEmpty(data.degree)) {
        errors.degree = 'Degree field is required';
    }
    if (validator.isEmpty(data.fieldofstudy)) {
        errors.fieldofstudy = 'Field of study field is required';
    }
    if (validator.isEmpty(data.from)) {
        errors.from = 'From field is required';
    }
    
    
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
}