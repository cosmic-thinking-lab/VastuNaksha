import Booking from '../models/Booking.js';

// @desc    Update booking status
// @route   PUT /api/booking/status/:id
// @access  Public
export const updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }
        res.status(200).json({
            success: true,
            data: booking
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Get all bookings
// @route   GET /api/booking/all
// @access  Public
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Book a call
// @route   POST /api/booking/book-call
// @access  Public
export const bookCall = async (req, res) => {
    try {
        const { name, email, phone, selectedDate, selectedTime } = req.body;

        // Basic validation
        if (!name || !email || !phone || !selectedDate || !selectedTime) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        // Validate Indian Phone Number (10 digits)
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid 10-digit Indian phone number'
            });
        }

        const booking = await Booking.create({
            name,
            email,
            phone,
            selectedDate,
            selectedTime
        });

        res.status(201).json({
            success: true,
            data: booking,
            message: 'Booking submitted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};
