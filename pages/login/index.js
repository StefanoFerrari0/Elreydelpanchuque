import React, { useState } from "react";
import styles from "../../styles/Login.module.css";
import Layout from "../../components/Layout";
import { AiOutlineSearch } from "react-icons/ai";
import { useFormik } from "formik";

const validate = (values) => {
  const errors = {};

  if (!values.password) {
    errors.password = "Requerido";
  } else if (values.password.length < 6) {
    errors.password = "La contraseña debe tener al menos 8 caracteres.";
  }

  if (!values.email) {
    errors.email = "Requerido";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Email inválido.";
  }

  return errors;
};

export default function SignupForm() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validate,

    onSubmit: (values) => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      };

      fetch("/api/auth/login", requestOptions).then(
        (res) => console.log("respuesta: ", res.json()),
        (error) => {
          console.log("error: ", error);
        }
      );
    },
  });

  return (
    <section className={styles.mainContainer}>
      <div>
        <h2 className={styles.title}>Login</h2>
        <h3 className={styles.title}>
          Inicia sesión para poder utilizar más funciones
        </h3>
      </div>

      <div>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email Address</label>

          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />

          {formik.errors.email ? <div>{formik.errors.email}</div> : null}

          <label htmlFor="password">Contraseña</label>

          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />

          {formik.errors.password ? <div>{formik.errors.password}</div> : null}
          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
}
