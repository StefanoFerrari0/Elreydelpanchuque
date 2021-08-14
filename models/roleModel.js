import mongoose from 'mongoose'

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
    }
})

let Dataset = mongoose.models.role || mongoose.model('role', roleSchema)

export default Dataset 
