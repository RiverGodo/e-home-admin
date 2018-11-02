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
       res.json({
           code:500,
           msg:'缺少必要参数',
           err
       })
    }
})

router.get('/', async(req, res, next) => {
    try{
        let {page = 1, page_size = 5} = req.query
        page = parseInt(page)
        page_size = parseInt(page_size) //parseInt() 函数可解析一个字符串,并返回一个整数
        let count = await swiperModel.count() //返回符合条件的文档数
        const dataList = await swiperModel
            .find()
            .skip((page-1)*page_size) //skip()方法同样接受一个数字参数作为跳过的记录条数。
            .limit(page_size)//limit()方法接受一个数字参数，该参数指定从MongoDB中读取的记录条数
            .populate({path:'newsId'})
            .sort({sort: -1,_id:-1})
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

router.get('/:id', async(req, res, next) => {
    try{
        const {id} = req.params
        const dataList = await swiperModel.findById(id)
                        .populate({path:'newsId'})
            res.json({
                code:200,
                data:dataList,
                msg:'success'
            })
    }catch(err){
        next(err)
    }
})

router.patch('/:id', auth, async (req, res, next) => {
    try{
        const {id} = req.params
        const{
            img,
            title,
            newsId,
            sort,//控制排序
            status//控制显示
        } = req.body

        const data = await swiperModel.findById(id)
        const updateData = await data.update({$set: {
            img,
            title,
            newsId,
            sort,//控制排序
            status//控制显示
        }})
        
        res.json({
            code:200,
            msg:'轮播图修改成功',
            data:updateData
        })

    }catch(err){
        next(err)
    }
}) 

router.delete('/:id', auth, async(req, res, next) => {
    try{
        const {id} = req.params
       await swiperModel.deleteOne({_id:id})
        res.json({
            code:200,
            msg:'删除成功'
        })

    }catch(err){
        next(err)
    }
})


module.exports = router;