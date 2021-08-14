import Illustration from '../public/Error.png'
import Image from 'next/image'
import Layout from '../components/Layout'
import styles from '../styles/404.module.css'
import Button from '../components/Button'

export default function Error404() {
  return (
    <Layout description="La página a la cual trató de acceder no existe." title="Error 404 | El rey del panchuque">
        <section className={styles.error404}>
          <h1 className={styles.title}>Error 404 - Esta página no existe</h1>
          <Image src={Illustration} height={400} width={400} alt="Ilustración Error 404"/>
          <Button style={styles.btn} link="/" title="Volver al inicio"/>  
        </section>
    </Layout>
  )
}