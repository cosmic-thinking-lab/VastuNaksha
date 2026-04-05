import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
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
    phone: {
        type: String,
        required: [true, 'Please add a phone number']
    },
    selectedDate: {
        type: String,
        required: [true, 'Please select a date']
    },
    selectedTime: {
        type: String,
        required: [true, 'Please select a time slot']
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

export default mongoose.model('Booking', bookingSchema);
