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
        } = req.body;

        const news = await newsModel.create({
            title,
            content,
            contentText,
            img,
            author,
            type,
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
        let {page = 1, page_size = 5} = req.query
        page = parseInt(page)
        page_size = parseInt(page_size)
        let count = await newsModel.count()
        const dataList = await newsModel
            .find()
            .skip((page-1)*page_size)
            .limit(page_size)
            .sort({_id:-1})
            .populate({
                path:'author',
                select:"-password"
            })
            .populate({
                path:'type'
            })

            res.json({
                code:200,
                data:dataList,
                count,
                msg:'success'
            })
    }catch(err){
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    try{
        const {id} = req.params
        const dataList = await newsModel
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
                data:dataList,
                msg:'success'
            })
    }catch(err){
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try{
        const {id} = req.params
        await newsModel.deleteOne({_id:id})
        res.json({
            code:200,
            msg:'删除成功'
        })
    }catch(err){
        next(err)
    }
})


module.exports = router;