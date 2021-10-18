import withAuth from "../../middlewares/withAuth";
import connectDB from "../../utils/connectDB";
import React, { useState, useEffect } from "react";
import Product from "../../models/productModel";
import styles from "../../styles/dashboard.module.css";
import Link from "next/link";

const Dashboard = ({ data }) => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    setProducts(data);
  }, []);

  const deleteUser = async (id, title) => {
    if (confirm(`¿Desea borrar el producto ${title}?`)) {
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id,
        }),
      };
      return await fetch(`/api/products/${id}`, requestOptions)
        .then(() => {
          var newList = products.filter((x) => x._id !== id);
          setProducts(newList);
        })
        .catch((error) => console.log(error));
    } else {
      return;
    }
  };

  return (
    <section className={styles.sectionDashboard}>
      <h1>Productos</h1>
      <button>
        <Link href="/dashboard/products/add">Crear producto</Link>
      </button>
      <table className={styles.rwdtable}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product) => (
              <tr key={product._id}>
                <td data-th="Nombre">{product.title}</td>
                <td data-th="Precio">{product.price}</td>
                <td data-th="Acciones">
                  <button>
                    <Link href={`/dashboard/products/edit/${product._id}`}>
                      Editar
                    </Link>
                  </button>
                  <button
                    onClick={() => deleteUser(product._id, product.title)}
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          {products && !products.length && (
            <tr>
              <td>
                <div>No hay productos para mostrar</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export async function getServerSideProps({ params }) {
  await connectDB();

  const result = await Product.find({});
  var data = JSON.parse(JSON.stringify(result));

  data.sort(function (a, b) {
    var nameA = a.title.toUpperCase();
    var nameB = b.title.toUpperCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    return 0;
  });

  return { props: { data } };
}

export default withAuth(Dashboard);
