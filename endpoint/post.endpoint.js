
import * as postService from '../service/post.service'





export async function postData(req, res) {
    let { user, token } = req.credentials;
    let id = user._id;
    let data = req.body;
    data.userId = id;
    let post;
    try {
        post = await postService.createFromData(data)
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
    return res.json({ post, success: true });
}

export async function findPost(req, res) {
    let {
        postId
    } = req.params;
    let post;
    try {
        post = await postService.findById(postId)
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
    return res.json({ post, success: true });
}

export async function findPostsByClass(req, res) {
    let data = req.body;
    const classs = data.class;
    let {offset,limit} = data;
    if(!offset){
        offset = 0;
    }
    if(!limit){
        limit= 10;
    }    
    let posts;
    try {
        limit = parseInt(limit);
        offset = parseInt(offset);
        posts = await postService.findByClass(limit,offset,classs)
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
    return res.json({ posts, success: true,limit,offset });
}

export async function findPosts(req, res) {
    let data = req.body;
    let {offset,limit} = data;
    if(!offset){
        offset = 0;
    }
    if(!limit){
        limit= 10;
    }    
    let posts;
    try {
        limit = parseInt(limit);
        offset = parseInt(offset);
        posts = await postService.findAllPost(limit,offset)
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
    return res.json({ posts, success: true,limit,offset });
}

export async function findPostsOfme(req, res) {
    let { user } = req.credentials;
    let id = user._id;
    let data = req.body;
    let {offset,limit} = data;
    if(!offset){
        offset = 0;
    }
    if(!limit){
        limit= 10;
    }    
    let posts;
    try {
        limit = parseInt(limit);
        offset = parseInt(offset);
        posts = await postService.findOfme(limit,offset,id);
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
    return res.json({ posts, success: true,limit,offset });
}