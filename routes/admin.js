import * as express from 'express'
import * as path from 'path'

import {fileURLToPath} from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const router = express.Router()

const products = []

router.get('/add-product', (req, res) => {
    res.render('add-product', {active: req.active, title: "Add product"})
})

router.post('/add-product', (req, res) => {
    products.push({
        title: req.body.title
    })
    res.redirect('/')
})

export default router

export {
    products
}