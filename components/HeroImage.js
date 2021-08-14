import React from 'react'
import styles from '../styles/HeroImage.module.css'
import Image from 'next/image'

export default function HeroImage({Img, H, W, alt, Title, Subtitle }){
    return (
        
    <section className={styles.container}>

        <div className={styles.allText}>
            <h2 className={styles.title}>{Title}</h2>
            <p className={styles.subTitle}>{Subtitle}</p>
        </div>
        <div className={styles.imgContainer}>
            <Image className={styles.img} src={Img} height={H} width={W} alt={alt}/>
        </div>
    </section>
    )
}