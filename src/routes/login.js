import * as express from 'express'
import LoginController from '../controllers/LoginController.js'

const router = express.Router()

router.get('/login', LoginController.index)
router.post('/login', LoginController.login)

router.get('/logout', LoginController.logout)

export default router
