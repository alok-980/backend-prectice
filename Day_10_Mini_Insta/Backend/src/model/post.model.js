import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
    },

    image: {
        type: String,
        required: true
    }
})

const PostModel = mongoose.model('posts', postSchema);

export default PostModel;