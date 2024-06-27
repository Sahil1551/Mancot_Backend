const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const { setStatus, getStatus } = require('./status');
const nodemailer = require('nodemailer');
const CheckoutModel=require('./models/Checkout')
const jwt=require('jsonwebtoken')
const path=require('path')
// Load environment variables from .env file
dotenv.config();
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: 'mancot.14414@gmail.com',
      pass: 'fvsbtmowqpvzedcd'
  }
});

// Initialize Express app
const app = express();

// Middleware
const allowedOrigins = [
  'https://frontend-snowy-pi-75.vercel.app'  // Add other allowed origins as needed
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true  // Allow cookies and authorization headers
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
  useTempFiles: true
}));
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB Connected');
  // Start server after successful MongoDB connection
  app.listen(process.env.PORT , () => {
    console.log(`Server is running on PORT ${process.env.PORT }`);
  });
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Routes

app.use('/user', require('./Routes/userRoutes'));
app.use('/api', require('./Routes/productRoutes'));
app.use('/api', require('./Routes/upload'));
app.use('/api', require('./Routes/Review'));
app.use('/api', require('./Routes/CategoryRoutes'));
app.use('/api', require('./Routes/cartRoutes'));
app.use('/api', require('./Routes/CheckOut'));
app.get('/api/key',(req,res)=>{
  return res.status(201).json({key:process.env.RAZOR_PAY_API_KEY})
})

const crypto = require('crypto');
const Checkout = require('./models/Checkout');
app.get('/api/paymentDetails/:id',async(req,res)=>{
  const { id } = req.params;
  console.log('Received ID:', id);
  // Validate if id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: 'Invalid Object ID' });
  }

  try {
    const iid = new mongoose.Types.ObjectId(id);
    const details = await CheckoutModel.findOne({ _id: iid });

    if (!details) {
      return res.status(404).json({ msg: 'Payment details not found' });
    }

    return res.json(details);
  } catch (error) {
    console.error('Error fetching payment details:', error);
    res.status(500).json({ msg: 'Internal server error' });
  }
})
app.post('/api/paymentVerifcation', async(req, res) => {
  try {
    const { razorpay_order_id: razorpayOrderID, razorpay_payment_id: razorpayPaymentID, razorpay_signature: razorpaySignature } = req.body;

    // Generate the HMAC SHA-256 signature
    const generatedSignature = crypto.createHmac('sha256', process.env.RAZOR_PAY_API_SECRET)
      .update(`${razorpayOrderID}|${razorpayPaymentID}`)
      .digest('hex');

    if (generatedSignature === razorpaySignature) {

      const id = getStatus(); 

      if (!id) {
        return res.status(400).json({ message: 'Invalid order ID' });
      }

      // Ensure id is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid Object ID' });
      }

      const objectId = new mongoose.Types.ObjectId(id);

      try {
        const updatedCheckout = await Checkout.findByIdAndUpdate(
          objectId,
          { paymentStatus: 'Paid',
          razorpayid:razorpayOrderID,
          razorpaypaymentid:razorpayPaymentID
        },
          { new: true }
        );
        
        if (!updatedCheckout) {
          return res.status(404).json({ message: 'Checkout not found' });
        }
        if(updatedCheckout.paymentStatus==='Paid'){
        const mailOptions = {
          from: 'mancot.14414@gmail.com',
          to: updatedCheckout.email, // Replace with the recipient's email
          subject: `Payment Successful for order number${objectId}` ,
          html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
          <h2 style="color: #007bff;">Order Confirmation</h2>
          <p>Your payment was successful. Thank you for your purchase!</p>
          <div style="margin-top: 20px;">
            <h4>Order Details</h4>
            <p><strong>Order ID:</strong> ${updatedCheckout._id}</p>
            <p><strong>Ordered by:</strong> ${updatedCheckout.email}</p>
            <p><strong>Payment Status:</strong> ${updatedCheckout.paymentStatus}</p>
            <p><strong>Delivery Status:</strong>Delivery Status Will be updated in 1-2 working days </p>
            
          </div>
          <div style="margin-top: 20px;">
            <p>If you have any questions, feel free to contact our support team.</p>
            <p>Best regards,<br>Your Company Team</p>
          </div>
        </div>
      </div>
    `,
      };
        
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email sent: ' + info.response);
    });
    }




    idi=updatedCheckout._id.toString();
        const tokenData = {
          objectIdString: idi // Replace with actual object id string
        };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
          expiresIn: '1h' // Optionally set expiration time
        });
    
        // Set JWT token as a cookie
        res.cookie('data', token, {
          httpOnly: false,
          path: '/',
          domain: 'mancots.onrender.com',
          secure: true, // Set to true if using HTTPS
          sameSite: 'None' // Adjust sameSite policy as per your requirement
        });
        res.redirect('https://frontend-snowy-pi-75.vercel.app/api/paymentVerification'); 
      
      } catch (error) {
        console.error('Error updating payment status:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    } else {
      console.log('Signature verification failed');
      return res.status(400).json({ message: 'Unsuccessful' });
    }
  } catch (err) {
    console.error('Error in payment verification route:', err);
    res.status(500).json({ message: 'Something went wrong!' });
  }});// Error handling middleware
  
  app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

module.exports = app;
