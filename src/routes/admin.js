import * as express from 'express'
import ProductController from '../controllers/ProductController.js'

import upload from '../middlewares/upload.js'

const router = express.Router()

router.get('/product', ProductController.index)

router.get('/product/create', ProductController.create)

router.post('/product', upload.single('image'), ProductController.store)

router.get('/product/:id/edit', ProductController.edit)

router.put('/product/:id', ProductController.update)

router.delete('/product/:id', ProductController.destroy)

export default router
