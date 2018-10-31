const express = require('express');
const router = express.Router();
const auth = require('./auth');
const swiperModel = require('../model/swiper')
 
router.post('/', auth, async(req, res, next) => {
    try{
        let{
            title,
            img,
            newsId,
            status,
            sort,
        } = req.body;

        const swipers = await swiperModel.create({
            title,
            img,
            newsId,
            status,
            sort,
        })

        res.json({
            code:200,
            msg:'轮播图创建成功',
            data:swipers
        })
    }catch(err){
        next(err)
    }
})

router.get('/', async(req, res, next) => {
    try{
        let {page = 1, page_size = 10} = req.query
        page = parseInt(page)
        page_size = parseInt(page_size)

        const dataList = await swiperModel
            .find()
            .skip((page-1)*page_size)
            .limit(page_size)
            .populate({path:'newsId'})
            .sort({_id:-1})

            res.json({
                code:200,
                data:dataList,
                msg:'success'
            })
    }catch(err){
        next(err)
    }
})

router.get('/:id', async(req, res, next) => {
    try{
        const {id} = req.params
        const dataList = await swiperModel
            .findById(id)
            
            res.json({
                code:200,
                data:dataList,
                msg:'success'
            })
    }catch(err){
        next(err)
    }
})



module.exports = router;