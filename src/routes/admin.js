import express from 'express'
import ProductController from '../controllers/ProductController.js'

import upload from '../middlewares/upload.js'

const router = express.Router()

router.get('/product', ProductController.index)

router
    .get('/product/create', ProductController.create)
    .post('/product', upload.single('image'), ProductController.store)

router
    .get('/product/:id/edit', ProductController.edit)
    .put('/product/:id', ProductController.update)

router.delete('/product/:id', ProductController.destroy)

export default router
