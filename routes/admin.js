import * as express from 'express'

const router = express.Router()

const products = []

router.get('/add-product', (req, res) => {
    res.render('add-product', {active: req.active, title: 'Add product'})
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