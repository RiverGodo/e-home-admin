const express = require('express');
const router = express.Router();
const categoryModel = require('../model/category')


router.get('/', async (req, res, next) => {
    try{
     const dataList = await categoryModel.find()

     res.json({
         code: 200,
         msg:'success',
         data:dataList
     })
    }catch(err){
        next(err)
    }
})


module.exports = router;