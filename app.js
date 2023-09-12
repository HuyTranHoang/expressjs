import express from 'express'
import * as path from 'path'
import {fileURLToPath} from 'url'
import expressLayouts from 'express-ejs-layouts'

// const {router} = require('./routes/admin')
import adminRouter from './routes/admin.js'
import shopRouter from './routes/shop.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(expressLayouts)

// app.use('/css', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')))
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))

app.use((req, res, next) => {
    req.active = req.url
    next()
})

app.use('/admin', adminRouter)
app.use(shopRouter)

app.use((req, res) => {
    res.status(404).render('error/404', {active: '', title: '404'})
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})