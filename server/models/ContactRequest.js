import mongoose from 'mongoose';

const contactRequestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    planFileUrl: {
        type: String,
        required: [true, 'Please upload a plan file']
    },
    status: {
        type: String,
        enum: ['pending', 'on-process', 'done'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('ContactRequest', contactRequestSchema);
