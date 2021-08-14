import React, {useState} from 'react'
import Link from  'next/link'
import Image from 'next/image'
import Logo from '../public/crown.png'
import styles from '../styles/Navbar.module.css'

const navigation = [
  { name: 'Catálogo', href: '/catalogo', current: false },
  { name: 'Contacto', href: '#', current: false },
]
 
export default function Navbar() {

    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);

  return (
     <nav className={styles.navbar}>
        <div className={styles.logo}>
            <Link href="/">
              <a className="">
                <Image src={Logo} height="70" width="70" alt="Rey del panchuque"/>
              </a>
            </Link>
            <Link href="/">
              <a className={styles.logoName}>
                 <h4 className={styles.h4Logo}> El rey del <br/>panchuque</h4>
              </a>
            </Link>
        </div>

        <ul className={ click ? styles.navLinks + " " + styles.Active : styles.navLinks}>
          <li className={styles.links}>
					  <Link href="/products">
              <a className="">Catálogo</a>
					  </Link>
          </li>
          <li className={styles.links}>
					  <Link href="/#contacto">
              <a className="">Contacto</a>
					  </Link>
          </li>
				</ul>

        <div className={styles.burguer} onClick={handleClick}>
           <div className={click ? styles.burgerLine + " " + styles.line1 : styles.burgerLine}></div>
           <div className={click ? styles.burgerLine + " " + styles.line2 : styles.burgerLine}></div>
           <div className={click ? styles.burgerLine + " " + styles.line3 : styles.burgerLine}></div>
        </div>
	  </nav>
  )
}

