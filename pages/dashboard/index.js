import withAuth from "../../middlewares/withAuth";
import connectDB from "../../utils/connectDB";
import React, { useState, useEffect } from "react";
import Product from "../../models/productModel";

const Dashboard = ({ data }) => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    setProducts(data);
  }, []);

  function deleteUser(id) {
    setProducts(
      products.map((x) => {
        if (x.id === id) {
          x.isDeleting = true;
        }
        return x;
      })
    );
    userService.delete(id).then(() => {
      setProducts((products) => products.filter((x) => x.id !== id));
    });
  }

  console.log(products);
  return (
    <div>
      <h1>Productos</h1>
      <a href="/dashboard/products/add">Add User</a>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product) => (
              <tr key={product._id}>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>
                  <a href={`/dashboard/products/edit/${product._id}`}>Edit</a>
                  <button
                    onClick={() => deleteUser(product._id)}
                    disabled={product.isDeleting}
                  >
                    {product.isDeleting ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      <span>Delete</span>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          {!products && (
            <tr>
              <td colSpan="4" className="text-center">
                <div className="spinner-border spinner-border-lg align-center"></div>
              </td>
            </tr>
          )}
          {products && !products.length && (
            <tr>
              <td>
                <div>No hay productos para mostrar</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  await connectDB();

  const result = await Product.find({});
  var data = JSON.parse(JSON.stringify(result));

  return { props: { data } };
}

export default withAuth(Dashboard);
