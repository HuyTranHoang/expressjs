import * as express from 'express'
// import * as path from 'path'
// import {fileURLToPath} from 'url'

import {products} from './admin.js'

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

const router = express.Router()

router.get('/', (req, res) => {
    res.render('shop', {products: products, active: req.active, title: 'Home page'})
})

export default router