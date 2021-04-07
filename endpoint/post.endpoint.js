
import * as postService from '../service/post.service'
import * as commentService from '../service/comment.service'

import contentSlideBar from '../utils/CONSTANT/contentSlideBar'
import { response } from 'express';
const axios = require('axios')






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

export async function searchPostByContent(req, res) {
    let data = req.body;
    const content = data.content;
    let posts;
    try {
        posts = await postService.searchPostByContent(content)
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
    return res.json({ posts, success: true });
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


export async function findPostsToSiteMap(req, res) {
    let posts;
    try {
        posts = await postService.findAllPostToSiteMap()
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
    return res.json({ posts, success: true });
}

export async function findPostsByOption(req, res) {
    let data = req.body;
    const classs = data.class;
    let {offset,limit,subject} = data;
    if(!offset){
        offset = 0;
    }
    if(!limit){
        limit= 10;
    }
    let option;
    if(classs && subject){
        option={
            class:classs,
            subject:subject
        }
    }

    if(!classs && subject){
        option={
            subject:subject
        }
    }

    if(classs && !subject){
        option={
            class:classs
        }
    }
    let posts;
    try {
        limit = parseInt(limit);
        offset = parseInt(offset);
        posts = await postService.findByOption(limit,offset,option)
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
    return res.json({ posts, success: true,limit,offset });
}

export async function crawlData(req, res) {
    let {
        postId
    } = req.params;
    const url = "https://api.hoidap247.com/question/detail"
    let ress
    try {
        const { data } = await axios({
          method: 'post',
          url: url,
          data: {
            question_id: postId
          }
        });
        if(data.data == null){
        return res.status(400).json({ success: false });

        }
       ress = data
       const content = data.data.content;
        let img ="";
        const comments = data.data.answers;
        const classs = data.data.grade_id;
        const subjectId = data.data.subject_id
        let subject ;
        let cmrv = [] ;
        let post;

        try {
            if(
                data.data.attachments[0] !== undefined
            ){
                img = data.data.attachments[0].large_url
            }
            
            subject = contentSlideBar[subjectId].text
            const dataSend = {
                class: classs,
                subject: subject,
                content: content,
                picture: img,
            }
            dataSend.userId = '60684596085d6e0015299afb'
            post =  await postService.createFromData(dataSend)
            const postUID = post._id;
            comments.map((item,i)=>{
                cmrv[i] = {
                    contentComment:item.content,
                    postId:postUID,
                    userCommentId:'60684596085d6e0015299afb'
                }
            })
            const apiCmts = cmrv.map((item)=>{
                return commentService.createFromData(item)
            })

            const reponseApiCmts = await Promise.all(apiCmts)
            

            
            
        } catch (error) {
            return res.status(400).json({ success: false,message: error.message });
        }

      
      } catch (err) {
        return res.status(400).json({ success: false });
      }
    
   
    return res.json({ ress, success: true });
}