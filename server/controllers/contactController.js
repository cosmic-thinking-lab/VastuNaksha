import ContactRequest from '../models/ContactRequest.js';

// @desc    Update contact request status
// @route   PUT /api/contact/status/:id
// @access  Public
export const updateContactStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const contactRequest = await ContactRequest.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );
        if (!contactRequest) {
            return res.status(404).json({
                success: false,
                message: 'Contact request not found'
            });
        }
        res.status(200).json({
            success: true,
            data: contactRequest
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

// @desc    Get all contact requests
// @route   GET /api/contact/all
// @access  Public
export const getAllContactRequests = async (req, res) => {
    try {
        const contactRequests = await ContactRequest.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: contactRequests.length,
            data: contactRequests
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

// @desc    Submit contact form with file
// @route   POST /api/contact/submit
// @access  Public
export const submitContactForm = async (req, res) => {
    try {
        const { name, email, description } = req.body;

        if (!name || !email || !description) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name, email, and description'
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Please upload a plan file'
            });
        }

        const planFileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

        const contactRequest = await ContactRequest.create({
            name,
            email,
            description,
            planFileUrl
        });

        res.status(201).json({
            success: true,
            data: contactRequest,
            message: 'Contact request submitted successfully'
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
