const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const activitiesRouter = require('./routes/activities');
const destinationsRouter = require('./routes/destinations');
const itinerariesRouter = require('./routes/itinerary');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

const app=express();

// Enable CORS for all routes
app.use(cors());
const PORT=process.env.PORT || 5000;


//connect to mongodb
mongoose.connect('mongodb+srv://sa:xhjqr0IRhe2tIYJn@cluster1.osxj4d0.mongodb.net/WeekEndPlannerDB', {useNewUrlParser: true, useUnifiedTopology: true});
const db=mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB Atlas');
});

app.use(express.json());

// Routes
app.use('/activities', activitiesRouter);
app.use('/destinations', destinationsRouter);
app.use('/itineraries', itinerariesRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});