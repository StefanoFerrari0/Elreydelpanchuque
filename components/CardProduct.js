import React from 'react';
import styles from '../styles/CardProduct.module.css'
import Image from 'next/image'
import Button from '../components/Button'
import Link from 'next/link'

export default function CardProduct({ products }){
    return(
    <>


        { products.map((p) => (
            <article key={p._id} className={styles.card}>
                <div className={styles.hiddenContainer}>
                    <Button link={`/products/${p._id}`} style={styles.btn} title="Ver más"/>
                </div>
                <Link href={`/products/${p._id}`}>
                    <a>
                        <div className={styles.topCard}>
                            <Image  className={styles.cardImg} src={p.images[0]} width="200" height="200" alt={p.name}/>
                        </div>
                    <div className={styles.bottomCard}>
                        <h3 className={styles.productName}>{p.title}</h3>
                        <h4 className={styles.productPrice}>${p.price}</h4>
                    </div>
                    </a>
                </Link>
            </article>
        ))
        }
    </>
)
}