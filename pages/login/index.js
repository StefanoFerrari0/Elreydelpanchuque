import React, { useState} from "react";
import styles from '../../styles/Login.module.css'
import Layout from '../../components/Layout'
import {AiOutlineSearch} from 'react-icons/ai'


export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

      
    return (
            <section className={styles.mainContainer}>
                <div>

                </div>
                <div>
                    <h2 className={styles.title}>Login</h2>
                    <h3 className={styles.title}>Inicia sesión para poder utilizar más funciones</h3>
                </div>
            </section>
    )
}

//GET SERVER SIDE PROPS PARA FIJARME . 
export async function getStaticProps({ params }) {
    const res = await fetch("http://localhost:3000/api/products/")
    const data = await res.json()
  
    return { props: { data } }
}