import db from '../common/connectDB.js'

class Product {
    constructor() {
    }

    getAll = () => new Promise((resolve, reject) => {
        db.query('SELECT * FROM products', (err, results) => {
            if (err) {
                console.log('Lỗi khi query - getAll Product' + err)
                reject(err)
            } else {
                resolve(results)
            }
        })
    })

    getById = (id) => new Promise((resolve, reject) => {
        db.query(`SELECT * FROM products WHERE id = ${id}`, (err, results) => {
            if (err) {
                console.log('Lỗi khi query - getById Product' + err)
                reject(err)
            } else {
                resolve(results)
            }
        })
    })

    add = (product) => new Promise((resolve, reject) => {
        const sql = 'INSERT INTO products set ?'
        db.query(sql, product, (err, results) => {
            if (err) {
                console.log('Lỗi khi query - add Product' + err)
                reject(err)
            } else {
                resolve(results)
            }
        })
    })

    update = (product) => new Promise((resolve, reject) => {
        const sql = `UPDATE products SET name = '${product.name}', price = '${product.price}' WHERE id = ${product.id}`
        db.query(sql, product, (err, results) => {
            if (err) {
                console.log('Lỗi khi query - Update Product' + err)
                reject(err)
            } else {
                resolve(results)
            }
        })
    })

    delete = (id) => new Promise((resolve, reject) => {
        const sql = `DELETE FROM products WHERE id = ${id}`
        db.query(sql, (err, results) => {
            if (err) {
                console.log('Lỗi khi query - delete Product' + err)
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}

export default new Product