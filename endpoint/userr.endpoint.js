
import crypto from '../utils/crypto';
import authenticator from '../utils/authenticator';
import * as userService from '../service/userr.service'

const { cloudinary } = require('../utils/cloudinary');
const fs = require('fs');



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
export async function login(req, res) {
    const data = req.body;
    let { email, password } = data;
    let user;
    let token;
    try {
        user = await userService.findByEmailAndPassword(email,password)
        if (!user) return res.status(400).json({ success: false, message: "email or mk ko dung" });
        token = await authenticator.getToken(user._id);
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
    return res.json({ success: true, user, token })
}
export async function changePassword(req, res) {
    let { user, token } = req.credentials;
    const data = req.body;
    const { password, newPassword } = data;
    if (crypto.hash(password) !== user.password) return res.status(400).json({ success: false, message: "ban da nhap sai mat khau" })
    let id = user._id;
    
    try {
        user = await userService.updatePassword({id, password:newPassword});
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
    return res.json({ success: true, user, token });
}

export async function updateAvatar(req, res) {
    let { user, token } = req.credentials;
    let id = user._id;
    let img = fs.readFileSync(req.file.path);
    let fileStr = img.toString('base64');
    let headerFile = "data:image/jpeg;base64,"
    const data = headerFile + fileStr
    let url = '';
    try {
        const uploadResponse = await cloudinary.uploader.upload(data, {
            upload_preset: 'dev_setups',
        });
        url = uploadResponse.url
        user = await userService.updateAvatar({id,url});
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
    return res.json({ success: true, user, token });
}

export async function upload(req, res) {
    let img = fs.readFileSync(req.file.path);
    let fileStr = img.toString('base64');
    let headerFile = "data:image/jpeg;base64,"
    const data = headerFile + fileStr
    let url = '';
    try {
        const uploadResponse = await cloudinary.uploader.upload(data, {
            upload_preset: 'dev_setups',
        });
        url = uploadResponse.url
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
    return res.json({ success: true, url });
}


export async function verifyToken(req, res) {
    const { user } = req.credentials;
    return res.json({ success: true, user });
}
