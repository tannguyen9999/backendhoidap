import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const userSchema = new Schema({
     firstName: { type: String, required: true },
     lastName: { type: String, required: true },
     email: { type: String,required: true,unique: true },
     phone: { type: Number,required: true},
     address: { type: String,required: true},
     password: { type: String,required: true}

});
export default mongoose.model('User', userSchema);

