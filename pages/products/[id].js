import connectDB from "../../utils/connectDB";
import Image from "next/image";
import styles from "../../styles/productsId.module.css";
import Layout from "../../components/Layout";
import { AiOutlineWhatsApp } from "react-icons/ai";
import Product from "../../models/productModel";

export async function getStaticPaths() {
  await connectDB();
  const products = await Product.find({});

  var data = JSON.parse(JSON.stringify(products));

  const paths = data.map((product) => ({
    params: { id: product._id.toString() },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  await connectDB();

  const result = await Product.findById(params.id);

  var data = JSON.parse(JSON.stringify(result));

  return { props: { data }, revalidate: 10 };
}

function ProductID({ data }) {
  const product = data;
  return (
    <Layout
      title={`${product.title} | El rey del panchuque`}
      description={`${product.description}`}
      link={`${process.env.BASE_URL}/products/${product._id}`}
    >
      <article className={styles.productContainer}>
        <div className={styles.col}>
          <div className={styles.imgContainer}>
            <Image
              src={product.images[0]}
              width="537"
              height="537"
              alt={product.title}
            />
          </div>
        </div>
        <div className={styles.col}>
          <h1 className={styles.mainTitle}>{product.title}</h1>
          <h2 className={styles.price}>${product.price}</h2>
          <p className={styles.note}>
            El precio publicado es de contado efectivo / Transferencia bancaria
            / Mercado Pago. Con tarjeta de crédito tiene interés
          </p>
          <h3 className={styles.subtitle}>Caracteristicas:</h3>
          <p className={styles.parragraph}>{product.description}</p>
          <button className={styles.wpp}>
            <AiOutlineWhatsApp
              style={{ marginRight: "auto", marginLeft: "20px" }}
              size={33}
            />
            <a
              className={styles.textWpp}
              href={`https://api.whatsapp.com/send?phone=5493813048313&text=¡Hola!+Estoy+interesado/a+por+el+producto+${product.title}`}
              target="_blank"
              rel="noreferrer"
            >
              Preguntá por este articulo
            </a>
          </button>
        </div>
      </article>
    </Layout>
  );
}

export default ProductID;
