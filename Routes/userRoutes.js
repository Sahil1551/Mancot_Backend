const express=require('express')
const router=express.Router()
const auth=require('../middleware/auth')
const userControl=require('../controller/userController')
router.post('/register',userControl.register)
router.post('/login',userControl.login)
router.post('/refresh_token',userControl.refreshtoken)
router.get('/logout',userControl.logout)
router.get('/info',auth,userControl.getInfo)

module.exports=router;