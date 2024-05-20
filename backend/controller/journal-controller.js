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

// read all your journals only your journals 
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


// update your journal
