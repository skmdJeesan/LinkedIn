import express from 'express'

import isAuth from '../middlewares/isAuth.js'
import { getAllNoti, removeAllNoti, removeOneNoti } from '../controllers/notification.controllers.js'

const notificationRouter = express.Router()

notificationRouter.get('/get-all', isAuth, getAllNoti)
notificationRouter.delete('/remove-all', isAuth, removeAllNoti)
notificationRouter.delete('/remove-one/:notificationId', isAuth, removeOneNoti)

export default notificationRouter