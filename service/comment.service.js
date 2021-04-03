import Comment from '../models/comment.model';
 


export async function createFromData (data){
    const comment = await Comment.create(data);
    return comment;
};

export async function findByPostId(postId) {
    let comments = await Comment.find({
        postId:postId
    })
        .lean()
        .populate('userCommentId')
        .sort({ createdAt: -1 });
    return comments;
}

export async function findOfme(userCommentId) {
    let comments = await Comment.find({
        userCommentId:userCommentId
    })
        .lean()
        .populate('postId')
        .sort({ createdAt: -1 });
    return comments;
}




