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
      description="Somos El rey del panchuque, nos dedicamos a vender panchuqueras y otras maquinas como wafleras y demás. ¡Pasá a ver nuestro catálogo!"
      title="El rey del panchuque"
      link={process.env.BASE_URL}
    >
      <HeroImage
        Img={Illustration}
        Title="¡Bienvenido!"
        Subtitle="Somos El rey del panchuque, nos dedicamos a vender panchuqueras y demás. Bla bla bla acá hay que poner muchas más descripción."
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
    "60fe6592c89553a21e236285",
    "6117d66f0135150edcd0f4e5",
    "6117d6300135150edcd0f4e0",
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
