import postMessage from '../models/postMessage.js';
import mongoose from 'mongoose';

const PostController = {
    async getPosts(req, res) {
        try {
            const post = await postMessage.find();
            return res.status(200).json({
                status: 'succes',
                post
            })
        } catch (err) {
            return res.status(400).json({
                error: error.message
            })
        }
    },
    async createPost(req, res) {
        try {
            const post = await postMessage.create(req.body)
            return res.status(201).json({ post })
        } catch (error) {
            return res.status(409).json({
                message: error.message
            })
        }
    },
    async updatePost(req, res) {
        const { id: _id } = req.params;
        const post = req.body

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send('No post with that Id')
        }
        const updatedPost = await postMessage.findByIdAndUpdate(_id, {...post, _id }, { new: true })
        return res.status(200).json({ updatedPost })

    },
    async deletePost(req, res) {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send('No post with that Id')
        }
        await postMessage.findByIdAndRemove(id)
        return res.status(200).json({
            message: 'Post successfully deleted'
        })
    },
    async likePost(req, res) {
        const { id } = req.params;
        if (!req.userId) {
            res.status(400).json({ message: 'Unauthenticated' })
        }
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send('No post with that Id')
        }
        const post = await postMessage.findById(id)
        const index = post.likes.findIndex((id) => { id === String(req.userId) });
        if (index === -1) {
            post.likes.push(req.userId)
        } else {
            post.likes = post.likes.filter((id) => { id !== String(req.userId) })
        }
        const updatedPost = await postMessage.findByIdAndUpdate(id, post, { new: true })
        return res.status(200).json({ updatedPost })

    }
}

export default PostController;