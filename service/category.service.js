import Category from '../models/category.model';
import * as IsbnService from './isbn.service';


export async function getList(offset, limit){
    let categories = await Category.find()
    .limit(limit)
    .skip(offset);
    return categories;
}
export async function create(data){
    let category = await Category.create(data);
    return category;
}
export async function findById(id){
    let category = await Category.findById(id);
    return category;
}
export async function update(id,data){
    let category = await Category.findByIdAndUpdate(id,data);
    return category;
}
export async function deleteById(id){
    const category = await Category.findByIdAndDelete(id);
    const isbns = await IsbnService.findByCategoryId(id);
    Promise.all(isbns.map(isbn => {
       return IsbnService.deleteById(isbn._id);
    }));
    return category;
} 
export async function countCategories(){

 let total =  Category.count({}, function(err, result) {
    if (err) {
      console.log(err);
      return false;
    } else {
      return result;
    }

});
    return total;
}
export async function findByName(name){
    let category = await Category.findOne({name});
    return category;
}