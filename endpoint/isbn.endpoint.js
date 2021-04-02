import * as isbnService from '../service/isbn.service';
import * as bookService from '../service/book.service';
import * as categoryService from '../service/category.service';

export async function updateIsbnById(req, res) {
    const data = req.body;
    console.log(data)
    const { id } = req.params;
    let isbn;
    try {
        isbn = await isbnService.findById(id)
        if (!isbn) throw new Error('isbn is not exist');
        isbn = await isbnService.update(id,data);
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
    res.json({ isbn, success: true });
}

export async function deleteIsbnById(req, res) {
    const { id } = req.params;
    let isbn;
    try {
        isbn = await isbnService.findById(id);
        if (!isbn) throw new Error('isbn is not exist');
        await isbnService.deleteById(id);
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
    res.json({ success: true });
}

export async function getIsbnById(req, res) {
    const { id } = req.params;
    let isbn;
    try {
        isbn = await isbnService.getIsbn(id);
        
        if (!isbn) throw new Error('isbn is not exist')
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
    res.json({ success: true, isbn })
}

export async function getIsbns(req, res) {
    let isbns;
    let {offset, limit } = req.query;
    let total;

    if(!limit){
        limit = 10;
    }
    else {
        limit = parseInt(limit);
    }
    if(!offset){
        offset = 0;
    }
    else {
        offset = parseInt(offset);
    }
    try {
        isbns = await isbnService.getList(offset,limit);
        total = await isbnService.countIsbn();
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
    return res.json({ isbns, success: true,offset,limit,total });
}

export async function createBookById(req, res) {
    const data = req.body;
    let { id } = req.params;
    let isbn;
    let book
    try {
        isbn = await isbnService.findById(id);
        if (!isbn) throw new Error('isbn is not exist')
        let { date } = data;
        
        
        data.isbnId = id;
        book = await bookService.createBook(data);
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
    return res.json({ book, success: true })

}

export async function getBooksById(req, res) {
    const { id } = req.params;
    let isbnId;
    let {offset, limit } = req.query;
    let total;

    if(!limit){
        limit = 10;
    }
    else {
        limit = parseInt(limit);
    }
    if(!offset){
        offset = 0;
    }
    else {
        offset = parseInt(offset);
    }
    let books
    try {
        isbnId = await bookService.getListBooksByIsbnId(id,offset, limit)
        total = await bookService.countBooksByItem({isbnId:id})
        if (!isbnId) throw new Error('isbnId is not exist')
        books = await bookService.getListBooksByIsbnId(id,offset, limit);
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
    return res.json({ books, success: true,offset,limit,total })
}
export async function createIsbn(req, res) {
    const { categoryname,isbnname,author,releaseAt } = req.body;
    let data = {
        name:isbnname,
        releaseAt:releaseAt,
        author:author
    }
    let isbn 
    
    try {
        let category = await categoryService.findByName(categoryname);
        if (!category) throw new Error('category is not exist')
        data.categoryId = category._id;
         isbn = await isbnService.create(data);

    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
    res.json({ isbn:isbn, success: true })

}
export async function checkCategory (req, res){
    let temp = 0;
    const { categoryname} = req.body;
    try {
        let category = await categoryService.findByName(categoryname);
        if (!category){
            temp = 1;
        }else{
            temp = 0
        } 

    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
    return res.json({ temp, success: true })
}