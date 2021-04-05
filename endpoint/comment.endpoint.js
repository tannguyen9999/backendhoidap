
import * as commentService from '../service/comment.service'





export async function postData(req, res) {
    let { user } = req.credentials;
    let id = user._id;
    let data = req.body;
    data.userCommentId = id;
    let comment;
    try {
        comment = await commentService.createFromData(data)
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
    return res.json({ comment, success: true });
}

export async function getDataByPostId(req, res) {
    let {
        postId
    } = req.params;
    let comments;
    try {
        comments = await commentService.findByPostId(postId)
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
    return res.json({ comments, success: true });
}

export async function getDataOfme(req, res) {
    let { user } = req.credentials;
    let id = user._id;
    let comments;
    try {
        comments = await commentService.findOfme(id)
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
    return res.json({ comments, success: true });
}

