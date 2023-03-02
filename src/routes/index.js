import express from 'express'
import productsRoute from './products.js'
import userRoutes from './users.js'

const router = express.Router()

router.use('/products', productsRoute)
router.use('/users', userRoutes)
router.get('/', (req, res) => res.send('Hello World!'))

export default router
