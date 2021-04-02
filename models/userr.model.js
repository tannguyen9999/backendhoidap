import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp2';
import moment from 'moment';

const Schema = mongoose.Schema;


const userSchema = new Schema({
     
     name: { type: String, required: true },
     email: { type: String,required: true,unique: true },
     password: { type: String,required: true},
     sex: { type: String,default:'Nam'},
     birthDay: { type: Date},
     startDay:{
          type: Date,
          required: true,
          default: moment().toDate()
     },

});

userSchema.plugin(timestamps);
userSchema.index({ email: 1 });
export default mongoose.model('Userr', userSchema);

