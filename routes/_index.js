import adminRouter from './admin.js'
import shopRouter from './product.js'
import loginRouter from './login.js'

function route (app) {
    app.use(shopRouter)

    app.use(loginRouter)

    app.use('/admin', adminRouter)

    app.use((req, res) => {
        res.status(404).render('error/404', {active: '', title: '404'})
    })
}

export default route