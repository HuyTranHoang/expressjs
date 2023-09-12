import * as express from 'express'
import * as path from 'path'
import db from '../common/connectDB.js'

import {fileURLToPath} from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const router = express.Router()

router.get('/add-product', (req, res) => {
    res.render('add-product', {active: req.active, title: 'Add product'})
})

router.post('/add-product', (req, res) => {
    const sql = `INSERT INTO products (name) VALUES ('${req.body.title}')`
    db.query(sql, function (err, result) {
        if (err) throw err
        console.log('1 record inserted')
    })
    res.redirect('/')
})

export default router
