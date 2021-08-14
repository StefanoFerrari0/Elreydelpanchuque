import styles from '../styles/Footer.module.css'
import { AiOutlineWhatsApp, AiFillInstagram, AiFillFacebook } from 'react-icons/ai'

 
export default function Footer() {

  return (
    <footer className={styles.footer}>
        <div className={styles.socialFooter}>
            <ul style={{padding: "0", marginBottom: "0"}}>
                <li className={styles.socialItem}> <a href="https://www.instagram.com/elreydelpanchuque_/" target="_blank" rel="noopener noreferrer"><AiFillInstagram  size={20}/> </a></li>
                <li className={styles.socialItem}> <a  href="https://www.facebook.com/reydelpanchuque/" target="_blank" rel="noopener noreferrer"> <AiFillFacebook size={20}/></a></li>
                <li className={styles.socialItem}> <a href="https://wa.me/5493813048313" target="_blank" rel="noopener noreferrer"><AiOutlineWhatsApp size={20}/></a></li>
            </ul>
        </div>
    
        <div className={styles.footerText}>
            <p className={styles.footerH4}>
                © Copyright El rey del panchuque - 2021. Todos los derechos reservados.</p>

            <p  className={styles.footerH4} style={{fontSize: "0.8rem"}}>Desarrollado con 💖 por <a className={styles.stefano}href="https://www.instagram.com/stefanoferrari0/" target="_blank" rel="noopener noreferrer" >Stefano Ferrari</a></p>
        </div>
    </footer>

  )
}

