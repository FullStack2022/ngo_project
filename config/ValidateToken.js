import jwt from 'jsonwebtoken';
import Handler from '../Handler/Handler';

const ValidateToken = async (req, res, next) => {
    const token_id = req.body.token_id;

    if(token_id == ""){
        return next(Handler.empty_value('Token Id Required'))
    }
    
    try {
        const {admin_id, username} = await jwt.verify(token_id, 'NGO');
        return next();

    } catch (error) {
        return next(Handler.data_not_found('Try Again ! Invalid Token Id'));
    }
}

export default ValidateToken;