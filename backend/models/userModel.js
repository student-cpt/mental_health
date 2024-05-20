import mongoose from 'mongoose';
import Journal from './journalModel.js';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 0
    },
    bio: {
        type: String,
        default: ''
    },
    journals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Journal'
    }]
}, {
    timestamps: true 
});

const User = mongoose.model('User', userSchema);
export default User;
``
