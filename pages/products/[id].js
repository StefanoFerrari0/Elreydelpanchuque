import Image from 'next/image';
import styles from '../../styles/productsId.module.css'
import Layout from '../../components/Layout'
import {AiOutlineWhatsApp} from 'react-icons/ai'

export default function Product( { data }) {

  const product = data.data; 
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
          <button className={styles.wpp}><AiOutlineWhatsApp style={{marginRight: "auto", marginLeft: "20px"}} size={33}/><a className={styles.textWpp} href={`https://api.whatsapp.com/send?phone=5493813048313&text=¡Hola!+Estoy+interesado/a+por+el+producto+${product.title}`}target="_blank">Preguntá por este articulo</a></button>
        </div>
      </article>
    </Layout>

    )
  }


  export async function getStaticPaths() {
    const res = await fetch('http://localhost:3000/api/products')
    const data = await res.json()
  
    const paths = data.data.map((product) => ({
      params: { id: product._id },
    }))
  
    return { paths, fallback: false }
  }
  
  export async function getStaticProps({ params }) {
    //importar moongoose
    
    const res = await fetch(`http://localhost:3000/api/products/${params.id}`)
    const data = await res.json()

    return { props: { data } }
  }
  
  