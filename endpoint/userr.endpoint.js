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
    } catch (err) {
        console.error(err);
        return res.status(500).json({ err: 'Something went wrong' });
    }
    return res.json({ success: true,url });
}


export async function verifyToken(req, res) {
    const { user } = req.credentials;
    return res.json({ success: true, user });
}
