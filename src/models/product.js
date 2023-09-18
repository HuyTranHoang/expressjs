import pool from '../common/connectDB.js'

class Product {

    static getAll = async () => {
        try {
            const [rows] = await pool.query('SELECT * FROM products')
            return rows
        } catch (err) {
            console.error('Lỗi khi query - getAll Product')
            throw err
        }
    }

    static getById = async (id) => {
        try {
            const [rows] = await pool.query(`SELECT * FROM products WHERE id = ${id}`)
            return rows
        } catch (err) {
            console.error('Lỗi khi query - getById Product')
            throw err
        }
    }

    static add = async (product) => {
        try {
            const [rows] = await pool.query('INSERT INTO products set ?', product)
            return rows
        } catch (err) {
            console.error('Lỗi khi query - add Product')
            throw err
        }
    }

    static update = async (product) => {
        const {name, price, id} = product
        const sql = 'UPDATE products SET name = ?, price = ? WHERE id = ?'
        try {
            const [rows] = await pool.query(sql, [name, price, id])
            return rows
        } catch (err) {
            console.error('Lỗi khi query - update Product')
            throw err
        }
    }

    static delete = async (id) => {
        try {
            const [rows] = await pool.query('DELETE FROM products WHERE id = ?', id)
            return rows
        } catch (err) {
            console.error('Lỗi khi query - delete Product')
            throw err
        }
    }
}

export default Product