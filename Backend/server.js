const dotenv = require('dotenv')
dotenv.config({ path: './backend/config/config.env' })

const connectDatabase = require('./config/database')
const app = require('./index')

connectDatabase()

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})
