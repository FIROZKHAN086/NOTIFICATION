import express from 'express';
import { 
  subscribe, 
  sendNotification, 
  getVapidPublicKey,
  unsubscribe 
} from '../controllers/notification.Controller.js';

const router = express.Router();

/* Public route to get VAPID key */
router.get('/vapid-public-key', getVapidPublicKey);

// Subscribe to push notifications
router.post('/subscribe', subscribe);

// Unsubscribe from push notifications
router.post('/unsubscribe', unsubscribe);

// Send push notification (protected route - add auth middleware if needed)
router.post('/send', sendNotification);

export default router;