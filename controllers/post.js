const asyncHandler = require('express-async-handler');
const Post = require('../models/Post');
const User = require('../models/User');
exports.getAllPosts = asyncHandler(async (req, res, next) => {
    const posts = await Post.find();
    res.status(200).send(posts);
}); 

exports.createPost = asyncHandler(async (req, res, next) => {
    const { content, userId } = req.body;
    const { file } = req;
    if (!content) {
        res.status(500)
        throw new Error('empty field');
    }
    if (req.user.id !== userId) {
        res.status(500)
        throw new Error('invalid userId');
    }

    const post = new Post({
        userId: req.user.id,
        content,
        postPath: file.path
    });


    await post.save();
    res.status(200).send({ post, msg: 'post added with success' });
});

exports.updatePost = asyncHandler(async (req, res, next) => {
    const { _id } = req.params;

    const { file } = req;

    if (file !== undefined) {
        await Post.updateOne({ _id }, {
            $set: {
                ...req.body,
                postPath: file.path || null
            }
        })
    } else {
        await Post.updateOne({ _id }, {
            $set: {
                ...req.body
            }
        })
    }
    

    res.status(200).send({ msg: 'post updated with success' });
})

exports.deletePost = asyncHandler(async (req, res, next) => {

})