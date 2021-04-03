import User from '../models/userr.model';
 
import {hash} from '../utils/crypto.js';

export async function findByEmail(email){
    const user = await User.findOne({ email }).lean();
    return user;
};

export async function findByEmailAndPassword(email,password){
    const user = await User.findOne({ email,password : hash(password) }).lean();
    return user;
}
export async function findById(id){ 
    const user = await User.findById(id).lean();
    return user;
};

export async function createFromData (data){
    const user = await User.create(data);
    return user;
};

export async function updatePassword(id, password){ 
    const user = await User.findOneAndUpdate({_id : id}, {password: hash(password) }).lean(); 
    return user;
}

export async function updateAvatar(id, avatar){
    console.log(avatar) 
    const user = await User.findOneAndUpdate({_id : id},  {avatar:avatar}).lean(); 
    return user;
}