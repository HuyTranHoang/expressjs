import * as express from 'express'
import ProductController from '../controllers/ProductController.js'

const router = express.Router()

router.get('/add-product', ProductController.create)

router.post('/add-product', ProductController.store)

router.get('/product/:id/edit', ProductController.edit)

router.put('/product/:id',  ProductController.update)

router.delete('/product/:id', ProductController.destroy)

export default router
