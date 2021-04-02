import crypto from '../utils/crypto';
import authenticator from '../utils/authenticator';
import * as userService from '../service/userr.service'



export async function register(req, res) {
    const data = req.body;
    let { email, password } = data;
    data.password = crypto.hash(password);
    let user;
    try {
        user = await userService.findByEmail(email);
        if (user) return res.status(400).json({ success: false, message: "email da dung roi" });
        user = await userService.createFromData (data);
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
    return res.json({ user, success: true });
}



export async function verifyToken(req, res) {
    const { user } = req.credentials;
    return res.json({ success: true, user });
}
