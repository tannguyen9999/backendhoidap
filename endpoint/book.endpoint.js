import * as bookService from '../service/book.service';

export async function updateBookById(req, res){
    const { id } = req.params; 
    let data = req.body; 
    let book ;
    try {
     book = await bookService.findById(id);
    if (!book) throw new Error('Book not found')
    book = await bookService.update(id, data);
    } catch (error) {
        return res.status(400).json({success: false, message: error.message});
    }
    return res.json({ success: true, book });
};
export async function deleteBookById(req, res) {
    const { id } = req.params;

    let book ;
    try {
        book = await bookService.findById(id) ;
        if (!book) throw new Error('Book id is not exist');
        await bookService.deleteById(id)
    } catch (error) {
        return res.status(400).json({success: false, message: error.message});
    }
    return res.json({ success: true });
};
export async function getBookById(req, res) {
    const { id } = req.params;
    let book ; 
    try {
        book = await bookService.getById(id) ;
        if(!book) throw new Error('Book id is not exist');
    } catch (error) {
        return res.status(400).json({success: false, message: error.message});
    }
    return res.json({ book, success: true });
};

export async function getBooks(req, res) {
    let books ;
    let {offset, limit } = req.query;
    let total;

    if(!limit){
        limit = 5;
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
        
        books = await bookService.getList(offset, limit);
        total = await bookService.count();
    } catch (error) {
        return res.status(400).json({success: false, message: error.message});
    }
    return res.json({ books, success: true,offset,limit,total });
}

