const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();
// global.__basedir = __dirname;

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/pdfs', require('./routes/api/pdfs'));
app.use('/api/pdf_upload', require('./routes/api/pdf_upload'))
app.use('/api/pdf', express.static(__dirname + '/upload/QR'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));