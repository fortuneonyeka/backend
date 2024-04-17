export const createValidationSchema = {
    username:{
        isLength:{
            options:{
                min:5,
                max:32,
            },
            errorMessage: 'username must be 5-32 characters'
        },
        notEmpty: {
            errorMessage: "username cannot be empty"
        },
        isString:{
            errorMessage: 'username must be a string'
        }
    },

    pod:{
        isLength:{
            options:{
                min:3,
                max:15,
            },
            errorMessage: 'pod must be 3 - 15 characters'
        },
        notEmpty: {
            errorMessage: 'pod must not be empty'
        },
        isString: {
            errorMessage:'Pod must be a string'
        }
    },
};