import connectDB from "../../../utils/connectDB";
import Product from "../../../models/productModel";
import { tokenProtect, isAdmin } from "../../../middlewares/auth";

connectDB();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const product = await Product.findById(id);

        if (!product) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: product });
      } catch (error) {
        res.status(400).json({ success: false });
      }

      break;

    case "PUT":
      try {
        await tokenProtect(req, res);
        await isAdmin(req, res);

        const product = await Product.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!product) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: product });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }

      break;

    case "DELETE":
      try {
        await tokenProtect(req, res);
        await isAdmin(req, res);

        const deleteProduct = await Product.deleteOne({ _id: id });

        if (!deleteProduct) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }

      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
