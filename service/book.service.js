import Book from '../models/book.model';

export async function createBook(data){
    let book = await Book.create(data);
    return book;
}

export async function getListBooksByIsbnId(isbnId,offset, limit){
   let books = await Book.find({ isbnId })
   .limit(limit)
   .skip(offset);
   return books
}


export async function findById(id) {
    let book = await Book.findById(id);
    return book;
}

export async function update(id, data) {
    let book = await Book.findByIdAndUpdate(id,data,{ new: true });
    return book;
}

export async function deleteById(id) {
    let book = await Book.findByIdAndDelete(id);
    return book;
}

export async function getById(id) {
    let book = await  Book.findById(id).populate('isbnId');
    return book;
}

export async function getList(offset,limit){
    let books = await Book.find().populate('isbnId')
    .limit(limit)
    .skip(offset);
    return books;
}

export async function deleteManyByIsbn(isbnId) {
    let books = await Book.deleteMany({ isbnId });
    return books;
} 

export async function count(){

    let total =  await Book.count({});
    return total;
}

export async function countBooksByItem(item){
    let total =  await Book.count(item);
    return total;
}
