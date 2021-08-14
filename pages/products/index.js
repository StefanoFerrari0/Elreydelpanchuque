import connectDB from '../../utils/connectDB'
import React, { useState, useEffect } from "react";
import CardProduct from '../../components/CardProduct'
import styles from '../../styles/products.module.css'
import Layout from '../../components/Layout'
import {AiOutlineSearch} from 'react-icons/ai'
import Product from '../../models/productModel'

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
        <Layout title="Catálogo | El rey del panchuque" description="¡Bienvenido a nuestro cátalogo de productos! Vas a encontrar panchuqueras, wafleras, etc." link="https://elreydelpanchuque.com/products/">
            <section className={styles.mainContainer}>
                <h2 className={styles.title}>Catálogo</h2>
                <div className={styles.searchDiv}>
                   
                    <input className={styles.searchBar} type="text" placeholder="🔍 Buscar producto"
                    onChange={(e) => setSearch(e.target.value)}/>
                </div>

                <div className={styles.containerProduct}>
                    {filteredProducts.length < 1 
                    ? <h3 className={styles.notFound}>No se encontraron productos que coincidan con su búsqueda: {search}</h3> 
                    : <CardProduct products={filteredProducts}></CardProduct>
                    }
                    
                </div>
            </section>
        </Layout>
    )
}

export async function getServerSideProps({ params }) {

  await connectDB();

  const result = await Product.find({})
  var data = JSON.parse(JSON.stringify(result))

  return { props: { data } }
}

export default Index;