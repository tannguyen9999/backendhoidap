import * as categoryService from '../service/category.service';
import * as isbnService from '../service/isbn.service';


export async function getCategories(req, res) {
    let categories; 
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
        categories = await categoryService.getList(offset,limit);
        total = await categoryService.countCategories();
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
    return res.json({ categories, success: true,offset,limit,total });
}

export async function createCategory(req, res) {
    const data = req.body;
    let category;
    try {
        category = await categoryService.create(data);
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
    res.json({ category, success: true })
}

export async function updateCategory(req, res) {
    const { id } = req.params;
    const data = req.body;
    let category;
    try {
        category = await categoryService.findById(id);
        
        if (!category) throw new Error('categoty is not exist')
        category = await categoryService.update(id, data)
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
    return res.json({ success: true });
}

export async function deleteCategory(req, res) {
    const { id } = req.params;
    let category;
    try {
        category = await categoryService.findById(id);
        if (!category) throw new Error('Category not found')
        await categoryService.deleteById    (id);
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
    return res.json({ success: true });
}

export async function getCategoryById(req, res) {
    const { id } = req.params;
    let category;
    try {
        category = await categoryService.findById(id);
        if (!category) throw new Error('Category not found');
    }
    catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
    return res.json({ category, success: true });
}

export async function createIsbnById(req, res) {
    const { id } = req.params;
    const data = req.body;
    let { releasesAt } = data;
    let isbn;
    try {
        let category = await categoryService.findById(id);
        if (!category) throw new Error('category is not exits')

       
        data.categoryId = id;

        isbn = await isbnService.create(data);
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
    return res.json({ isbn, success: true })

}

export async function getIsbnsById(req, res) {
    const { id } = req.params;
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
    let isbns;
    let category;
    try {
        category = await categoryService.findById(id);
        if (!category) throw new Error('Category not found');
        isbns = await isbnService.getListByCategory(id,offset, limit);
        total = await isbnService.countIsbnByItem({categoryId:id});
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }

    return res.json({ isbns, success: true ,offset, limit,total}); 

}

export async function getCategoryByName(req, res) {
    const { name } = req.params;
    let category;
    try {
        category = await categoryService.findByName(name);
        if (!category) throw new Error('Category not found');
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
    return res.json({ category, success: true});
}