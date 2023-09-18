import modelProduct from '../models/product.js'

class HomeController {
    // [GET] - /
    async index(req, res) {
        try {
            const products = await modelProduct.getAll()
            const logoutAlert = req.query.lo === 'true'

            res.render('home', {products, title: 'Home page', logoutAlert})
        } catch (error) {
            console.error(error)
            res.status(500).send('Internal Server Error')
        }
    }
}

export default new HomeController