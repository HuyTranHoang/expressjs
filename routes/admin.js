import * as express from 'express'
import db from '../common/connectDB.js'
import Swal from 'sweetalert2'

const router = express.Router()

router.get('/add-product', (req, res) => {
    res.render('add-product', {active: req.active, title: 'Add product'})
})

router.post('/add-product', (req, res) => {
    const sql = `INSERT INTO products (name) VALUES ('${req.body.name}')`
    db.query(sql, function (err) {
        if (err) {
            console.error(err)
            res.status(500).send('Error inserting record') // Handle the error gracefully
        } else {
            console.log('1 record inserted')
            res.redirect('/?success=true');
        }
    })
})
router.get('/product/:id', (req, res) => {
    const id = req.params.id
    const sql = `SELECT * FROM products WHERE id = ${id}`
    db.query(sql, function (err, result) {
        if (err) console.log('Lỗi khi query')
        res.render('edit-product', {active: req.active, title: 'Edit product', product: result[0]})
    })
})

router.post('/product', (req, res) => {
    const id = req.body.id
    const sql = `UPDATE products SET name = '${req.body.name}' WHERE id = ${id}`
    db.query(sql, function (err) {
        if (err) throw err
        console.log('1 record updated')
    })
    res.redirect('/')
})

router.get('/product/delete/:id', (req, res) => {
    const id = req.params.id
    const sql = `DELETE FROM products WHERE id = ${id}`
    db.query(sql, function (err) {
        if (err) throw err
        console.log('1 record deleted')
    })
    res.redirect('/')
})

export default router
