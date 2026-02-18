import webpush from 'web-push';



webpush.setVapidDetails(
  'mailto:firozkhan192006@gmail.com',
  "BC-C4A6FZ2Nelm-emPfOXX008UxAh4eXa9MPrbcG2Z3II-9PTwCnPR4eImI-P7IgXkYkz9h5NrV2GB7up7XCW-U",
  "IHgtR0u5wQ26JUXFcPhta8bouPYmZeNVFiM0BAE96SM"
);

// In-memory storage for subscriptions (use database in production)
let subscriptions = [];
// this is fix on futere we will use database to store the subscriptions
console.log(subscriptions);




// @desc    Store push subscription
// @route   POST /api/notifications/subscribe
export const subscribe = async (req, res) => {
  try {
    const subscription = req.body;
    
    // Add subscription to array
    subscriptions.push(subscription);
    
    console.log(subscription);
    

    res.status(201).json({ 
      success: true, 
      message: 'Subscription added successfully' 
    });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to save subscription' 
    });
  }
};

// @desc    Send push notification to all subscribers
// @route   POST /api/notifications/send
/* 
this is the function that will send the notification to all the subscribers, it will take the title, message and url from the request body and send the notification to all the subscribers. it will also handle the errors and remove the invalid subscriptions from the array.
*/
export const sendNotification = async (req, res) => {
  try {
    const { title, message, url } = req.body;

    if (!title || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Title and message are required' 
      });
    }

    const payload = JSON.stringify({
      title: title,
      body: message,
      icon: '/icon.png', 
      badge: '/badge.png', 
      url: url || '/',
      timestamp: Date.now()
    });

    // Send notification to all subscribers
    const notifications = subscriptions.map(subscription => 
      webpush.sendNotification(subscription, payload)
        .catch(error => {
          console.error('Error sending notification:', error);
          // Remove invalid subscriptions
          if (error.statusCode === 410) {
            subscriptions = subscriptions.filter(sub => sub !== subscription);
          }
        })
    );

    await Promise.all(notifications);

    res.status(200).json({ 
      success: true, 
      message: 'Notifications sent successfully',
      sentTo: subscriptions.length 
    });

  } catch (error) {
    console.error('Send notification error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send notifications' 
    });
  }
};

// @desc    Get VAPID public key
// @route   GET /api/notifications/vapid-public-key
export const getVapidPublicKey = (req, res) => {
  res.status(200).json({ 
    success: true, 
    publicKey: "BC-C4A6FZ2Nelm-emPfOXX008UxAh4eXa9MPrbcG2Z3II-9PTwCnPR4eImI-P7IgXkYkz9h5NrV2GB7up7XCW-U" 
  });
};

// @desc    Remove subscription
// @route   POST /api/notifications/unsubscribe
export const unsubscribe = async (req, res) => {
  try {
    const { endpoint } = req.body;
    
    subscriptions = subscriptions.filter(sub => sub.endpoint !== endpoint);
    
    res.status(200).json({ 
      success: true, 
      message: 'Unsubscribed successfully' 
    });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to unsubscribe' 
    });
  }
};