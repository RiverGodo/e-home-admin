const mongoose = require('mongoose')


const swiper = new mongoose.Schema({
    title:String,
    img:String,
    newsId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'news'
    },
    status:{//是否排序
        type:Number,
        default:1
    },
    sort:{//排序号
        type:Number,
        default:1
    }
},{versionKey: false, timestamps: {createdAt: 'create_time', updatedAt:'update_time'}})

module.exports = mongoose.model('swiper', swiper )