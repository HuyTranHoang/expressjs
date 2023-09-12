import * as express from 'express'
import * as path from 'path'
import {fileURLToPath} from 'url'
import db from '../common/connectDB.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = express.Router()

router.get('/', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) console.log("Lỗi khi query")
        res.render('shop', {products: results, active: req.active, title: 'Home page'})

    })
})

export default router