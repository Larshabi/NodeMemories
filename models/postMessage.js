import pkg from 'mongoose';
const { Schema, model } = pkg;

const postSchema = new Schema({
        title: String,
        message: String,
        creator: String,
        tags: [String],
        selectedFile: String,
        likes: {
            type: [String],
            default: []
        }
    }, {
        timestamps: true
    }

)

const postMessage = model('PostMessage', postSchema)

export default postMessage;