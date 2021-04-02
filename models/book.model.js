import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const BookSchema = new Schema({
    isbnId: {type: Schema.ObjectId,ref: 'Isbn', required: true},
    status: { type:String, required: true},
    date: { type: String, required: true},
});

export default mongoose.model('Book', BookSchema);  