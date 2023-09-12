import * as express from 'express'
import db from '../common/connectDB.js'

const router = express.Router()

router.get('/add-product', (req, res) => {
    res.render('add-product', {active: req.active, title: 'Add product'})
})

router.post('/add-product', (req, res) => {
    const sql = `INSERT INTO products (name) VALUES ('${req.body.title}')`
    db.query(sql, function (err) {
        if (err) throw err
        console.log('1 record inserted')
    })
    res.redirect('/')
})

export default router
