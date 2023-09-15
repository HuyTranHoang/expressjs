import express from 'express'
import path from 'path'
import {fileURLToPath} from 'url'
import methodOverride from 'method-override'
import cookieParser  from 'cookie-parser'
import expressLayouts from 'express-ejs-layouts'
import multer from 'multer'

// Import router
import initRouter from './src/routes/_index.js'
import getUsername from './src/middlewares/getUsername.js'
import authenticateToken from './src/middlewares/authenticateToken.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()
const port = 3000

/// Body parser & http method override
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(cookieParser())

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimeType === 'image/png' || file.mimeType === 'image/jpg' || file.mimeType === 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

app.use(multer({
    storage: fileStorage,
    fileFilter
}))

// Ejs
app.set('view engine', 'ejs')
app.set('views', 'src/views')

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