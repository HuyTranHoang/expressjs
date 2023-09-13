import adminRouter from './admin.js'
import shopRouter from './product.js'

function route (app) {
    app.use('/admin', adminRouter)

    app.use(shopRouter)

    app.use((req, res) => {
        res.status(404).render('error/404', {active: '', title: '404'})
    })
}

export default route