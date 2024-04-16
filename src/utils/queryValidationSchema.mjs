export const createQueryValidation = {
    filter:{
        isLength:{
            options:{
                min:3,
                max:15,
            },
            errorMessage: ' must be 5-32 characters'
        },
        notEmpty: {
            errorMessage: "cannot be empty"
        },
        isString:{
            errorMessage: 'must be a string'
        }
    },
}