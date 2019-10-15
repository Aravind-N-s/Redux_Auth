require('dotenv/config')
const mongoose = require('mongoose')

mongoose.set('useUnifiedTopology', true)
mongoose.set('useCreateIndex', true)

mongoose.Promise = global.Promise

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to the DB')
    })
    .catch((err) => {
        console.log('ERROR connected to DB', err)
    })

module.exports = {
    mongoose
}