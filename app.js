import express from 'express'
import * as path from 'path'
import methodOverride from 'method-override'
import {fileURLToPath} from 'url'
import expressLayouts from 'express-ejs-layouts'

// Import router
// const {router} = require('./routes/admin')
import initRouter from './routes/_index.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()
const port = 3000

/// Body parser & http method override
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

// Ejs
app.set('view engine', 'ejs')
app.set('views', 'views')

// Ejs layouts
app.use(expressLayouts)
app.set('layout extractScripts', true)

// Static file
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use('/js', express.static(__dirname + '/public/js'))
app.use('/sweetalert2', express.static(__dirname + '/node_modules/sweetalert2/dist'))

// Middleware
app.use((req, res, next) => {
    req.active = req.url
    next()
})

// Init router
initRouter(app)

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})