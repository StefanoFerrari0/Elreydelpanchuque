import React from "react";
import HeroImage from "../components/HeroImage";
import Illustration from "../public/HomeIllu.png";
import Image from "next/image";
import CardProduct from "../components/CardProduct";
import Button from "../components/Button";
import styles from "../styles/index.module.css";
import SocialMedia from "../public/Newsletter.png";
import { AiFillInstagram, AiOutlineWhatsApp } from "react-icons/ai";
import Layout from "../components/Layout";
import connectDB from "../utils/connectDB";
import Product from "../models/productModel";

export default function Home({ data }) {
  return (
    <Layout
      description="Somos el rey del panchuque!! Nos dedicamos a la venta de productos gastronómicos, hacemos envíos a todo el país. ¡Pasá a ver nuestro catálogo!"
      title="El rey del panchuque"
      link={process.env.BASE_URL}
    >
      <HeroImage
        Img={Illustration}
        Title="¡Bienvenido!"
        Subtitle={`Somos el rey del panchuque! Nos dedicamos a la venta de productos gastronómicos. 
        Hacemos envíos a todo el país. Nos caracterizamos por:\n°Consejos sobre ventas, para que puedas hacer rendir al máximo tus productos y sea más eficiente tu emprendimiento ❤️\n°Atención al público de forma rápida y personalizada.\n°Ayudas técnicas en productos y alimento.\n°Asesoramiento sobre recetas.`}
        H="467"
        W="232"
        alt="Ilustración"
      ></HeroImage>

      <section className={styles.product}>
        <h2 className={styles.title}>Catálogo</h2>
        <div className={styles.containerProduct}>
          <CardProduct products={data}></CardProduct>
        </div>
        <div className={styles.btnContainer}>
          <Button
            link="/products"
            title="Ver más productos"
            style={styles.btn}
          />
        </div>
      </section>

      <section className={styles.socialContainer} id="contacto">
        <h2 className={styles.title + " " + styles.socialTitle}>
          Redes sociales
        </h2>
        <h4 className={styles.subtitle}>¡Contactanos!</h4>
        <div className={styles.imgContainer}>
          <Image
            className={styles.img}
            src={SocialMedia}
            height={450}
            width={450}
            alt="Ilustración"
          />
        </div>
        <div className={styles.socialMedia}>
          <div>
            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FReyDelPanchuque&tabs=timeline&width=340&height=70&small_header=false&adapt_container_width=true&hide_cover=true&show_facepile=true&appId"
              width="340"
              className={styles.fbPage}
              scrolling="no"
              frameBorder="0"
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            ></iframe>
          </div>
          <div className={styles.instagram}>
            <a
              target="_blank"
              href="https://www.instagram.com/reydelpanchuque_/"
              rel="noreferrer"
            >
              <AiFillInstagram size={50} style={{ fill: "white" }} />
              <h4 className={styles.titleIg}>@reydelpanchuque_</h4>
            </a>
          </div>
          <div className={styles.wpp}>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://wa.me/+5493813048313"
            >
              <AiOutlineWhatsApp size={50} style={{ fill: "white" }} />
              <h4 className={styles.titleIg}>+54 9 3813048313</h4>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  await connectDB();

  let mainProductID = [
    "6137a1111d36560008d32412",
    "6137a25a1d36560008d32453",
    "6137a17f1d36560008d3242b",
  ];

  const result = await Product.find({});

  var allData = JSON.parse(JSON.stringify(result));

  var data = allData.filter(function (el) {
    return (
      el._id == mainProductID[0] ||
      el._id == mainProductID[1] ||
      el._id == mainProductID[2]
    );
  });

  return { props: { data } };
}
