import React from 'react'
import Link from 'next/link'
import styles from '../styles/Button.module.css'

export default function Button({link, style, title}) {
    return (
        <Link href={link}>
            <a><button className={styles.btn + " " + style}>{title}</button></a>
        </Link>
    )
}
