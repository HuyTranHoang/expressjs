import modelProduct from '../models/product.js'

class ProductController {

    // [GET] - /
    async index(req, res) {
        try {
            const products = await modelProduct.getAll()
            const success = req.query.success === 'true'
            const loginAlert = req.query.li === 'true'
            const logoutAlert = req.query.lo === 'true'
            res.render('product/product', {products, title: 'Home page', showAlert: success, loginAlert, logoutAlert})
        } catch (error) {
            console.error(error)
            res.status(500).send('Internal Server Error')
        }
    }

    // [Get] - /admin/product/create
    create(req, res) {
        res.render('product/add-product', {title: 'Add product'})
    }

    // [POST] - /admin/product
    store(req, res) {
        const product = {
            name: req.body.name,
            price: req.body.price
        }

        modelProduct.add(product)
            .then(() => {
                console.log('1 record inserted')
                res.redirect('/admin/product/?success=true')
            })
            .catch((err) => {
                console.error(err)
                res.status(500).send('Error inserting record') // Handle the error gracefully
            })
    }

    // [Get] - /admin/product/:id/edit
    edit(req, res) {
        const id = req.params.id

        modelProduct.getById(id)
            .then((product) => {
                res.render('product/edit-product', {title: 'Edit product', product: product[0]})
            })
            .catch((err) => {
                console.error(err)
                res.status(500).send('Error editing record')
            })
    }

    // [PUT] - /admin/product/:id
    update(req, res) {
        const product = {
            id: req.params.id,
            name: req.body.name,
            price: req.body.price
        }
        modelProduct.update(product)
            .then(() => {
                console.log('1 record updated')
                res.redirect('/admin/product/?success=true')
            })
            .catch((err) => {
                console.error(err)
                res.status(500).send('Error updating record')
            })

    }

    // [DELETE] - /admin/product/:id
    destroy(req, res) {
        const id = req.params.id
        modelProduct.delete(id)
            .then(() => {
                res.json({
                    'success': 'Product deleted'
                })
            })
            .catch((err) => {
                console.error(err)
                res.status(500).send('Error deleting record')
            })
    }
}

export default new ProductController