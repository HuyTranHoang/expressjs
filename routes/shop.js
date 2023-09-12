import * as express from 'express'
import db from '../common/connectDB.js'

const router = express.Router()

router.get('/', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) console.log('Lỗi khi query')
        const success = req.query.success === 'true'
        res.render('shop', {products: results, active: req.active, title: 'Home page', showAlert: success})
    })
})

export default router