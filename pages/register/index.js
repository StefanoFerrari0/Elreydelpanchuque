import React, { useState} from "react";
import styles from '../../styles/Register.module.css'
import Layout from '../../components/Layout'
import Input from '../../components/Input'

export default function Register() {

    const [email, setEmail] = useState({text: '', isValid: null});
    const [password, setPassword] = useState({text: '', isValid: null});
    const [password2, setPassword2] = useState({text: '', isValid: null});
    const [name, setName] = useState({text: '', isValid: null});

      
    return (
        <Layout>

            <section className={styles.mainContainer}>
                <div>
                    <h2 className={styles.title}>Login</h2>
                    <h3 className={styles.title}>Inicia sesión para poder utilizar más funciones</h3>

                    <Input data={email}
                    type="email"
                    placeholder="EJ: elreydelpanchuque@gmail.com"
                    name="email"
                    label="Email"
                    changeState={setEmail}
                    errorText="Ingrese un email válido."/>
                    </div>
                
            </section>

        </Layout>
    )
}