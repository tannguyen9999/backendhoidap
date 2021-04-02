import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const IsbnSchema = new Schema({
    name:{type:String,required:true},
    releaseAt:{type:String, required:true},
    author:{type:String,required:true},
    categoryId:{type: Schema.ObjectId,ref: 'Category', required: true},

}); 

export default mongoose.model('Isbn', IsbnSchema);  
