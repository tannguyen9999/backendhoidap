import Post from '../models/post.model';
 

export async function findById(id){ 
    const post = await Post.findById(id).lean().populate('userId');
    return post;
};


export async function createFromData (data){
    const post = await Post.create(data);
    return post;
};

export async function findByClass(limit, offset,classs) {
    let posts = await Post.find({
        class:classs
    })
        .lean()
        .limit(limit)
        .skip(offset)
        .populate('userId')
        .sort({ createdAt: -1 });
    return posts;
}

export async function findOfme(limit, offset,userId) {
    let posts = await Post.find({
        userId:userId
    })
        .lean()
        .limit(limit)
        .skip(offset)
        .populate('userId')
        .sort({ createdAt: -1 });
    return posts;
}

export async function findAllPost(limit, offset) {
    let posts = await Post.find({})
        .lean()
        .limit(limit)
        .skip(offset)
        .populate('userId')
        .sort({ createdAt: -1 });
    return posts;
}

export async function findAllPostToSiteMap(limit, offset) {
    let posts = await Post.find({})
        .lean()
        .sort({ createdAt: -1 });
    return posts;
}
