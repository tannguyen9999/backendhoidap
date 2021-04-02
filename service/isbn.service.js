import Isbn from '../models/isbn.model';
import * as bookService from './book.service';

export async function findById(id) {
    let isbn = await Isbn.findById(id);
    return isbn;
}

export async function update(id, data) {
    let isbn = await Isbn.findByIdAndUpdate(id, data, {new: true});
    return isbn;
}

export async function deleteById(id) {
    await bookService.deleteManyByIsbn(id);
    let isbn = await Isbn.findByIdAndDelete(id);
    return isbn;
}

export async function getIsbn(id){
    let isbn = await Isbn.findById(id).populate('categoryId');
    return isbn;
}

 export async function getList(offset,limit){
    let isbns = await Isbn.find()
    .limit(limit)
    .skip(offset);
    return isbns;
 } 

 export async function findByCategoryId(categoryId) {
     const isbns = await Isbn.find({ categoryId });
     return isbns;
 }
 export async function create(data){
    let isbn = await Isbn.create(data);
    return isbn;
} 

export async function getListByCategory(categoryId,offset,limit){
    const isbn = await Isbn.find({ categoryId:categoryId })
    .limit(limit)
    .skip(offset);
    return isbn;
} 

export async function countIsbnByItem(item){
    let total =  await Isbn.count(item);
    return total;
}
export async function countIsbn(){
    let total =  await Isbn.count({});
    return total;
}