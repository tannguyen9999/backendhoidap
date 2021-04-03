import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp2';
import moment from 'moment';

const Schema = mongoose.Schema;


const commentSchema = new Schema({
     
     postId: { 
          type: Schema.ObjectId,
          ref: 'Post',
          required: true
     },
     userCommentId: { 
          type: Schema.ObjectId,
          ref: 'Userr',
          required: true
     },
     contentComment: { type: String,required: true},
     startDay:{
          type: Date,
          required: true,
          default: moment().toDate()
     },

});

commentSchema.plugin(timestamps);

export default mongoose.model('Comment', commentSchema);

