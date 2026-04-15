const mongoose = require('mongoose')
const dns = require('dns');
// This tells Node to ignore your ISP's DNS and use Google's instead
dns.setServers(['8.8.8.8', '8.8.4.4']);
const connectDatabase = () => {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch(err => {
        console.error('MongoDB connection error:', err.message)
        process.exit(1)
    })
}

module.exports = connectDatabase
