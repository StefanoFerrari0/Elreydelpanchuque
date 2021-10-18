import connectDB from "../../utils/connectDB";
import React, { useState, useEffect } from "react";
import CardProduct from "../../components/CardProduct";
import styles from "../../styles/products.module.css";
import Layout from "../../components/Layout";
import Product from "../../models/productModel";

function Index({ data }) {
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setFilteredProducts(
      data.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, data]);

  return (
    <Layout
      title="Catálogo | El rey del panchuque"
      description="¡Bienvenido a nuestro cátalogo de productos! Vas a encontrar panchuqueras, wafleras, etc."
      link={`${process.env.BASE_URL}/products`}
    >
      <section className={styles.mainContainer}>
        <h2 className={styles.title}>Catálogo</h2>
        <div className={styles.searchDiv}>
          <input
            className={styles.searchBar}
            type="text"
            placeholder="🔍 Buscar producto"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className={styles.containerProduct}>
          {filteredProducts.length < 1 ? (
            <h3 className={styles.notFound}>
              No se encontraron productos que coincidan con su búsqueda:{" "}
              {search}
            </h3>
          ) : (
            <CardProduct products={filteredProducts}></CardProduct>
          )}
        </div>
      </section>
    </Layout>
  );
}

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

export default Index;
