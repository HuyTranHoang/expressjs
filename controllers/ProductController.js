import db from '../common/connectDB.js'

class ProductController {

    // [GET] - /
    index(req, res) {
        db.query('SELECT * FROM products', (err, results) => {
            if (err) console.log('Lỗi khi query')
            const success = req.query.success === 'true'
            res.render('product', {products: results, active: req.active, title: 'Home page', showAlert: success})
        })
    }

    // [Get] - /admin/product/create
    create(req, res) {
        res.render('add-product', {active: req.active, title: 'Add product'})
    }

    // [POST] - /admin/product
    store(req, res) {
        const sql = `INSERT INTO products (name, price) VALUES ('${req.body.name}', ${req.body.price})`
        db.query(sql, function (err) {
            if (err) {
                console.error(err)
                res.status(500).send('Error inserting record') // Handle the error gracefully
            } else {
                console.log('1 record inserted')
                res.redirect('/?success=true')
            }
        })
    }

    // [Get] - /admin/product/:id/edit
    edit(req, res) {
        const id = req.params.id
        const sql = `SELECT * FROM products WHERE id = ${id}`
        db.query(sql, function (err, result) {
            if (err) console.log('Lỗi khi query')
            res.render('edit-product', {active: req.active, title: 'Edit product', product: result[0]})
        })
    }

    // [PUT] - /admin/product/:id
    update(req, res) {
        const id = req.params.id
        const sql = `UPDATE products SET name = '${req.body.name}', price = '${req.body.price}' WHERE id = ${id}`
        db.query(sql, function (err) {
            if (err) throw err
            console.log('1 record updated')
        })
        res.redirect('/')
    }
    // [DELETE] - /admin/product/:id
    destroy(req, res) {
        const id = req.params.id
        const sql = `DELETE FROM products WHERE id = ${id}`
        db.query(sql, function (err) {
            if (err) throw err
            console.log('1 record deleted')
        })
        // res.redirect('/')
        res.json({
            'success': 'Product deleted'
        })
    }
}

export default new ProductController