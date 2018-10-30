const express = require('express');
const router = express.Router();
const auth = require('./auth');
const newsModel = require('../model/news')


router.post('/',auth, async(req, res, next) => {
    try{
        let{
            title,
            content,
            contentText,
            img,
            author,
            type,
            look_num
        } = req.body;

        const news = await newsModel.create({
            title,
            content,
            contentText,
            img,
            author,
            type,
            look_num
        })

        res.json({
            code:200,
            data:news,
            msg:'新闻添加成功'
        })
    }catch(err){
        next(err)
    }
})

router.get('/',async (req, res, next) => {
    try{
        let {page = 1, page_size = 10} = req.query
        page = parseInt(page)
        page_size = parseInt(page_size)
        
        const dataList = await newsModel
            .find()
            .skip((page-1)*page_size)
            .limit(page_size)
            .sort({_id:-1})
            .populate({
                path:'admin_user',
                select:"-password"
            })
            .populate({
                path:'category'
            })

            res.json({
                code:200,
                data:dataList,
                msg:'success'
            })
    }catch(err){
        next(err)
    }
})

router.get('/:id',async (req, res, next) => {
    try{
        const {id} = req.params
        const data = await newsModel
            .findById(id)
            .populate({
                path:'admin_user',
                select:"-password"
            })
            .populate({
                path:'category'
            })

            res.json({
                code:200,
                data,
                msg:'success'
            })
    }catch(err){
        next(err)
    }
})


module.exports = router;