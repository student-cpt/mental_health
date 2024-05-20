import Journal from "../models/journalModel.js";
import User from "../models/userModel.js";

// creating a journal
export const create_journal = async (req, res) => {
    const { title, article, tags } = req.body;
    const { username } = req.params;
    console.log(username);
    console.log(req.body);

    try {
        const user = await User.findOne({ username });
        console.log(user);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const journalAdded = await Journal.create({
            title,
            article,
            tags,
        });

        user.journals.push(journalAdded._id);
        await user.save();

        res.status(201).json(journalAdded);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};


export const getPostsByUsername = async (req, res) => {
    const username = req.params.username;
    try {
        // Find the user document based on the provided username
        const user = await User.findOne({ username }).populate('journals');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // The journals array is already populated with the actual journal documents
        const journals = user.journals;

        return res.status(200).json(journals);
    } catch (error) {
        console.error('Error fetching journals by username:', error);
        return res.status(500).json({ error: error.message });
    }
};





// const update_post = async (req, res) => {
//     const { id } = req.params;
//     const { title, article, tags } = req.body;

//     try {
//         // Find and update the post by ID
//         const updatedPost = await Post.findByIdAndUpdate(id, { title, article, tags }, { new: true });
        
//         if (!updatedPost) {
//             return res.status(404).json({ error: "Post not found" });
//         }
        
//         res.status(200).json(updatedPost);
//     } catch (error) {
//         console.error('Error updating post:', error);
//         res.status(500).json({ error: error.message });
//     }
// };






// const delete_post = async (req, res) => {
//     const { id } = req.params;
    
//     try {
//         // Find and delete the post by ID
//         const deletedPost = await Post.findByIdAndDelete(id);
        
//         if (!deletedPost) {
//             return res.status(404).json({ error: 'Post not found' });
//         }

//         res.status(200).json({ message: 'Post deleted successfully' });
//     } catch (error) {
//         console.error('Error deleting post:', error);
//         res.status(500).json({ error: error.message });
//     }
// };