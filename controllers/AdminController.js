// import joi
import Joi from 'joi';

// import jwt
import jwt from 'jsonwebtoken';

// import bcrypt
import bcrypt from 'bcrypt';

// import admin model
import AdminModel from '../models/AdminModel';

// import handler
import Handler from '../Handler/Handler';

class AdminController{
    /**
     * function name login
     * args (req, res)
     * return json
     */
    static async login(req, res, next){
        const loginSchema = Joi.object({
            username : Joi.string().required().min(4),
            password : Joi.string().required().min(6)
        });

        const { error } = loginSchema.validate(req.body);

        // check error
        if(error){
            return next(error);
        }

        const { username, password } = req.body;
        
        const hashPassword = await bcrypt.hash(password, 10);

        // check admin data in model
        const result = await AdminModel.findOne({username : username});
        
        if(result == null){
            return next(Handler.data_not_found('Username & Password Incorrect.'));
        }

        // check password
        const dbPassword = result.password;
        const checkPassword = await bcrypt.compare(password, dbPassword);
        if(!checkPassword){
            return next(Handler.data_not_found('Username & Password Incorrect.'));
        }

        // generate jwt string
        const token = jwt.sign({admin_id : result._id, username : result.username}, 'NGO',{expiresIn : '1d'});
        return next(Handler.send_json_data('Admin Verify Successfully', token));
    }
}

export default AdminController;