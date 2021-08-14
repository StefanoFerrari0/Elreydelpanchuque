import React from 'react'
import NavBar from './NavBar'
import styles from '../styles/Layout.module.css'
import Head  from 'next/head'
import { AiOutlineWhatsApp } from 'react-icons/ai'
import Footer from '../components/Footer'

function Layout({children, title, description, link}) {
    return (
        <div className={styles.container}>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description}></meta>
                <meta property="og:title" content={title}/>
                <meta property="og:description" content={description}/>
                {link ? <meta property="og:url" content={link}/> : null }
                <link rel="icon" href="/favicon.ico" />
                <meta property="og:type" content="website"/>
                <link href="https://fonts.googleapis.com/css2?family=Quattrocento:wght@400;700&display=swap" rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,700;1,700&family=Roboto:wght@300;400&display=swap" rel="stylesheet"/>
            </Head>

            <NavBar/>
            
            <main className={styles.wrapper}>
                {children}

                <div>
                    <a href="https://wa.me/5493813048313" className={styles.wppButton} target="_blank" rel="noopener noreferrer">
                    <AiOutlineWhatsApp size={40} style={{marginTop: "10px"}}/>
                    </a>
                </div>
            </main>

            <Footer/>

        </div>
    )
}

export default Layout
