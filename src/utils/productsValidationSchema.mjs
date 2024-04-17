import { toInt } from '../utils/helper.mjs';



export const createValidationSchema = {
    productname:{
        isLength:{
            options:{
                min:3,
                max:32,
            },
            errorMessage: 'username must be 3-32 characters'
        },
        notEmpty: {
            errorMessage: "product name cannot be empty"
        },
        isString:{
            errorMessage: 'product name must be a string'
        }
    },

    price:{
        isLength:{
            options:{
                min:1,
                max:15,
            },
            errorMessage: 'price must be 1 - 15 characters'
        },
        notEmpty: {
            errorMessage: 'price must not be empty'
        },
        isInt: {
            errorMessage:'price must be a integer'
        },
        toInt
    },
};