import connectDB from '../../../utils/connectDB';
import Product from '../../../models/productModel'
import { tokenProtect, isAdmin } from '../../../middlewares/auth'

connectDB();

export default async (req, res) => {
    const { method } = req;
    
    switch(method){

        case 'GET':
            try{
                
                const products = await Product.find({});

                res.status(200).json({ success:true, data: products})
            }
            catch(error){
                res.status(400).json({success: false, message: error.message});
            }
        break;
        
        case 'POST':

            try {

                await tokenProtect(req, res)
                await isAdmin(req, res)
                
                const product = await Product.create(req.body);
                res.status(201).json({ success: true, data: product})
            } catch (error){
                res.status(400).json({success: false, message: error.message});
            }
        break;
        
        default:
            res.status(400).json({success: false});
        break;
    }
}