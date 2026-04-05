import express from 'express';
import { submitContactForm, getAllContactRequests, updateContactStatus } from '../controllers/contactController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/submit', upload.single('planFile'), submitContactForm);
router.get('/all', getAllContactRequests);
router.put('/status/:id', updateContactStatus);

export default router;
