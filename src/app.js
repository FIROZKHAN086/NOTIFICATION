import exprees from "express";
import notificationRoutes from './routes/notification.routes.js';
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config({
  silent: process.env.NODE_ENV === 'production'
});
import emailRoutes from './routes/emails.routes.js';

const app = exprees();



// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
// Parse JSON bodies
app.use(exprees.json());

const env = process.env.NODE_ENV || 'development';

console.log("thi is env " + env);




// Routes
app.use('/api/notifications', notificationRoutes);
app.use('/api/emails', emailRoutes);
app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: Date.now()
  });
});

export default app;