import modelProduct from '../models/product.js'

class ProductController {

    // [GET] - /
    static index = async (req, res, next) => {
        try {
            const products = await modelProduct.getAll()
            const success = req.query.success === 'true'
            const loginAlert = req.query.li === 'true'
            const logoutAlert = req.query.lo === 'true'
            res.render('product/product', {products, title: 'Home page', showAlert: success, loginAlert, logoutAlert})
        } catch (err) {
            // console.error(err)
            // res.status(500).send('Internal Server Error')
            next(err)
        }
    }

    // [Get] - /admin/product/create
    static create = (req, res) => res.render('product/add-product', {title: 'Add product'})

    // [POST] - /admin/product
    static store = async (req, res, next) => {

        const {name, price} = req.body
        let image = 'default.jpg'

        if (req.file)
            image = req.filename

        const product = {name, price, image}

        try {
            const results = await modelProduct.add(product)
            console.log(results)
            res.redirect('/admin/product/?success=true')
        } catch (err) {
            next(err)
        }

    }

    // [Get] - /admin/product/:id/edit
    static edit(req, res, next) {
        const id = req.params.id

        modelProduct.getById(id)
            .then((product) => {
                res.render('product/edit-product', {title: 'Edit product', product: product[0]})
            })
            .catch((err) => {
                // console.error(err)
                // res.status(500).send('Error editing record')
                next(err)
            })
    }

    // [PUT] - /admin/product/:id
    static update = async (req, res, next) => {
        const id = req.params.id
        const {name, price} = req.body
        const product = {id, name, price}

        try {
            const results = await modelProduct.update(product)
            console.log(results)
            res.redirect('/admin/product/?success=true')
        } catch (err) {
            next(err)
        }

    }

    // [DELETE] - /admin/product/:id
    static destroy(req, res, next) {
        const id = req.params.id
        modelProduct.delete(id)
            .then(() => {
                res.json({
                    'success': 'Product deleted'
                })
            })
            .catch((err) => {
                // console.error(err)
                // res.status(500).send('Error deleting record')
                next(err)
            })
    }
}

export default ProductController