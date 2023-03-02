import mongoose from 'mongoose'
import config from 'config'

const mongodbUrl = config.get('database.mongoUrl')
mongoose.set('strictQuery', false)

const connect = () => mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const close = () => mongoose.connection.close()

export default {
    connect,
    connection: mongoose.connection
}