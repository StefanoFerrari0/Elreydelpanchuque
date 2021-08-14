import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    price:{
        type: Number,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true 
    },
    images:{
        type: Array,
        required: true
    }
    }, {
        timestamps: true
    })

    let Dataset = mongoose.models.product || mongoose.model('product', productSchema)
    
    export default Dataset