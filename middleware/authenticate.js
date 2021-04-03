import User from '../models/userr.model';
import authenticator from '../utils/authenticator';

export async function authenticate(req, res, next) {
    
    try {
        const tokenBearer = req.headers['authorization'];
        if (!tokenBearer.startsWith('Bearer ')) {
            throw new Error("Auth token invalid");
        }
        const token = tokenBearer.slice(7, tokenBearer.length);
        let id = await authenticator.verifyToken(token);
        const user = await User.findById(id);
        if(!user) return res.status(400).json({success: false});
        req.credentials = { user, token };    
    } catch (error) {
        return res.status(400).json({success: false, message: error.message});
    }
        
    return next();
} 