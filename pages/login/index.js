import React from "react";
import styles from "../../styles/Login.module.css";
import { useFormik } from "formik";
import { useRouter } from "next/router";

const validate = (values) => {
  const errors = {};

  if (!values.password) {
    errors.password = "Requerido";
  } else if (values.password.length < 6) {
    errors.password = "La contraseña debe tener al menos 6 caracteres.";
  }

  if (!values.email) {
    errors.email = "Requerido";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Email inválido.";
  }

  return errors;
};

export default function SignupForm() {
  const Router = useRouter();

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
        (res) => Router.replace("/dashboard"),
        (error) => {
          console.log("error: ", error);
        }
      );
    },
  });

  return (
    <section className={styles.mainContainer}>
      <div className={styles.card}>
        <div>
          <h2 className={styles.title}>Login</h2>
        </div>

        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <label className={styles.labels} htmlFor="email">
            Email
          </label>
          {formik.touched.email && formik.errors.email ? (
            <div className={styles.errors}>{formik.errors.email}</div>
          ) : null}
          <input
            className={styles.inputs}
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />

          <label className={styles.labels} htmlFor="password">
            Contraseña
          </label>

          {formik.touched.password && formik.errors.password ? (
            <div className={styles.errors}>{formik.errors.password}</div>
          ) : null}

          <input
            className={styles.inputs}
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />

          <button className={styles.btn} type="submit">
            Iniciar sesión
          </button>
        </form>
      </div>
    </section>
  );
}
