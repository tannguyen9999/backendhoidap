import User from '../models/user.model';
 
import {hash} from '../utils/crypto.js';

export async function findByEmail(email){
    const user = await User.findOne({ email });
    return user;
};
export async function findByIdAndPassword(email,password){
    const user = await User.findOne({ email,password : hash(password) });
    return user;
}
export async function findById(id){ 
    const user = await User.findById(id);
    return user;
};

export async function createFromData (data){
    const user = await User.create(data);
    return user;
};

export async function updatePassword({id, password}){ 
    const user = await User.findOneAndUpdate({_id : id}, {password: hash(password) }); 
    return user;
}