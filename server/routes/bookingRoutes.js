import express from 'express';
import { bookCall, getAllBookings, updateBookingStatus } from '../controllers/bookingController.js';

const router = express.Router();

router.post('/book-call', bookCall);
router.get('/all', getAllBookings);
router.put('/status/:id', updateBookingStatus);

export default router;
