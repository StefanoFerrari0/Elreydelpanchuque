import Image from 'next/image';
import styles from '../../styles/productsId.module.css'
import Layout from '../../components/Layout'
import {AiOutlineWhatsApp} from 'react-icons/ai'
import Product from '../../models/productModel'
import connectDB from '../../utils/connectDB'
export async function getStaticPaths() {
  
      const products = await Product.find({});
      var data = await products.json()
      const paths = data.data.map((product) => ({
        params: { id: product._id },
      }))
    
      return { paths, fallback: false }
  

}


export async function getStaticProps({ params }) {  

  const product = await Product.findById(params.id);
  var data = await product.json()

  return { props: { data } }
}

function ProductID( { data }) {

  const product = data; 
    return (
    <Layout title={`${product.title} | El rey del panchuque`} description={`${product.description}`} 
    link={`https://elreydelpanchuque.com/products/${product._id}`}>
      <article className={styles.productContainer}>
        <div className={styles.col}>
          <div className={styles.imgContainer}>
            <Image src={product.images[0]} width="537" height="537" alt={product.title}/>
          </div>
        </div>
        <div className={styles.col}>
          <h1 className={styles.mainTitle}>{product.title}</h1>
          <h2 className={styles.price}>${product.price}</h2>
          <h3 className={styles.subtitle}>Caracteristicas:</h3>
          <p className={styles.parragraph}>{product.description}</p>
          <button className={styles.wpp}><AiOutlineWhatsApp style={{marginRight: "auto", marginLeft: "20px"}} size={33}/><a className={styles.textWpp} href={`https://api.whatsapp.com/send?phone=5493813048313&text=¡Hola!+Estoy+interesado/a+por+el+producto+${product.title}`} target="_blank" rel="noreferrer">Preguntá por este articulo</a></button>
        </div>
      </article>
    </Layout>

    )
}

  export default ProductID