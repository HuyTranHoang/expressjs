import express from 'express'
import * as path from 'path'
import methodOverride from 'method-override'
import cookieParser  from 'cookie-parser'
import {fileURLToPath} from 'url'
import expressLayouts from 'express-ejs-layouts'

// Import router
import initRouter from './routes/_index.js'
import authenticateToken from './middlewares/authenticateToken.js'
import getUsername from './middlewares/getUsername.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()
const port = 3000

/// Body parser & http method override
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(cookieParser())

// Ejs
app.set('view engine', 'ejs')
app.set('views', 'views')

// Ejs layouts
app.use(expressLayouts)
app.set('layout extractScripts', true)

// Static file
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'))
app.use('/public', express.static(__dirname + '/public'))
app.use('/sweetalert2', express.static(__dirname + '/node_modules/sweetalert2/dist'))

// Middleware
app.use(getUsername)
app.use('/admin', authenticateToken)
app.use((req, res, next) => {
    res.locals.active = req.url
    next()
})

// Init router
initRouter(app)

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})