import React from 'react'
import styles from '../styles/Input.module.css'
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai'

export default function Input({data, type, placeholder, name, label, changeState, errorText, expression}) {

    const onChange = (e) => {
		changeState({...data, name: e.target.value});
	}

    const validacion = () => {
		if(expression){
			if(regularExpression.test(data.text)){
                changeState({...data, isValid: true});

			} else {
                changeState({...data, isValid: false});
			}
		}

		if(funcion){
			funcion();
		}
	}
    return (
        <div className={styles.Container}>
            <label className={data.isValid ? styles.label : styles.labelError}htmlFor={name}>{label}</label>
            <div>
                <input  type={type}
                    id={name} 
                    placeholder={ placeholder }
                    value={data.name}
                    onChange={onChange}
                    onKeyUp={validacion}
					onBlur={validacion}
                    className={styles.input + " " + !data.isValid ? styles.inputError : null }
                />
                {data.isValid ? <AiFillCheckCircle fill="green" size={20}/> : <AiFillCloseCircle fill="red" size={20}/> }
            </div>
            <p className={ styles.error + " " + data.isValid ? styles.hideError : styles.showError}>{errorText}</p>
        </div>
    )
}