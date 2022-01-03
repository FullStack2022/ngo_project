// import joi
import { ValidationError } from 'joi';

// import handler
import Handler from '../Handler/Handler';

const ErrorHandler = (err, req, res, next) => {
    // console.log(err);
    let status = 500;
    let result = {
        status : 500,
        message : 'Internal Server Error',
        data : ''
    }

    // check validation error instance
    if(err instanceof ValidationError){
        status = 422;
        result = {
            status : status,
            message : err.message
        }
    }

    // check validation error instance
    if(err instanceof Handler){
        status = err.status;
        result = {
            status : status,
            message : err.message,
            data : err.data
        }
    }

    // return json data
    return res.status(200).json({result});
    
}

export default ErrorHandler;