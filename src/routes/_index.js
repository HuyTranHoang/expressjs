import adminRouter from './admin.js'
import loginRouter from './login.js'
import homeRouter from './home.js'

function route (app) {
    app.use(homeRouter)

    app.use(loginRouter)

    app.use('/admin', adminRouter)

    app.use((req, res) => {
        res.status(404).render('error/404', {active: '', title: '404'})
    })
}

export default route