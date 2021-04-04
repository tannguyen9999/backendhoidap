import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp2';
import moment from 'moment';

const Schema = mongoose.Schema;


const postSchema = new Schema({
     
     userId: { 
          type: Schema.ObjectId,
          ref: 'Userr',
          required: true
     },
     class: { type: String,required: true },
     content: { type: String,required: true},
     picture:{type: String,default:''},
     startDay:{
          type: Date,
          required: true,
          default: moment().toDate()
     },

});

postSchema.plugin(timestamps);

export default mongoose.model('Post', postSchema);

