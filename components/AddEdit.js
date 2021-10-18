import { useRouter } from "next/router";
import { Formik } from "formik";
import React, { useState } from "react";
import styles from "../styles/AddEdit.module.css";

export { AddEdit };

function AddEdit(props) {
  const product = props?.product;
  var isAddMode = !product;
  const router = useRouter();

  let firstImg = isAddMode
    ? "https://via.placeholder.com/500"
    : product.images[0];

  var [img, setImg] = useState(firstImg);
  var [file, setFile] = useState("");

  if (isAddMode) {
    var initValues = {
      title: "",
      price: 0,
      description: "",
      images: img,
      category: "",
    };
  } else {
    initValues = {
      title: product.title,
      price: product.price,
      description: product.description,
      images: img,
      category: product.category,
    };
  }

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Product | Rey del panchuque");
    data.append("cloud_name", "stefanoferrari0");

    return await fetch(
      "https://api.cloudinary.com/v1_1/stefanoferrari0/image/upload",
      {
        method: "post",
        body: data,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        var urlData = data.url;
        return urlData;
      })
      .catch((error) => console.log(error));
  };

  const createProduct = async (data) => {
    const imagePost = await uploadImage();

    console.log("imagePost");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: data.title,
        price: data.price,
        description: data.description,
        images: [imagePost],
        category: data.category,
      }),
    };

    return await fetch(`/api/products/`, requestOptions)
      .then((res) => {
        res.json();
      })
      .then(() => {
        alert(`El producto ${data.title} fue creado.`);
        router.replace("/dashboard/");
      })
      .catch((error) => console.log(error));
  };

  const editProduct = async (id, data) => {
    var dataImg;
    if (img != product.images[0]) {
      console.log("SE ESTA SUBIENDO LA IMAGEN A CLOUDINARY");
      dataImg = await uploadImage();
    }

    const imagePost = dataImg ? dataImg : product.images[0];

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: data.title,
        price: data.price,
        description: data.description,
        images: [imagePost],
        category: data.category,
      }),
    };

    return await fetch(`/api/products/${id}`, requestOptions)
      .then((res) => {
        res.json();
      })
      .then(() => {
        alert(`El producto ${data.title} fue editado.`);
        router.replace("/dashboard/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <Formik
      initialValues={initValues}
      validate={(values) => {
        let errors = {};

        if (!values.title) {
          errors.title = "El titulo no puede estar vacio.";
        }

        if (!values.price) {
          errors.price = "El precio no puede estar vacio.";
        }

        if (!values.description) {
          errors.description = "La descripción no puede estar vacia.";
        }

        if (!values.category) {
          errors.category = "La categoria no puede estar vacia.";
        }

        return errors;
      }}
      onSubmit={(data) => {
        return isAddMode ? createProduct(data) : editProduct(product._id, data);
      }}
    >
      {({
        values,
        handleSubmit,
        handleChange,
        handleBlur,
        touched,
        errors,
      }) => (
        <form className={styles.sectionForm} onSubmit={handleSubmit}>
          <div className={styles.inputDiv}>
            <label className={styles.label} htmlFor="title">
              Titulo
            </label>
            <input
              className={styles.inputs}
              type="text"
              id="title"
              name="title"
              placeholder="Titulo"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.title && errors.title ? <div>{errors.title}</div> : null}
          </div>
          <div className={styles.inputDiv}>
            <label className={styles.label} htmlFor="price">
              Precio
            </label>
            <input
              className={styles.inputs}
              type="number"
              id="price"
              name="price"
              placeholder="Precio"
              value={values.price}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.price && errors.price ? <div>{errors.price}</div> : null}
          </div>
          <div className={styles.inputDiv}>
            <label className={styles.label} htmlFor="description">
              Descripción
            </label>
            <textarea
              className={styles.inputs}
              type="text"
              id="description"
              name="description"
              placeholder="Descripción"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.description && errors.description ? (
              <div>{errors.description}</div>
            ) : null}
          </div>
          <div className={styles.inputDiv}>
            <label className={styles.label} htmlFor="category">
              Categoria
            </label>
            <input
              className={styles.inputs}
              type="string"
              id="category"
              name="category"
              placeholder="Categoria"
              value={values.category}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.category && errors.category ? (
              <div>{errors.category}</div>
            ) : null}
          </div>
          <div className={styles.inputDiv}>
            <label className={styles.label} htmlFor="category">
              Imagen
            </label>
            <img style={{ width: "500px", height: "500px" }} src={img} />
          </div>
          <div className={styles.inputDiv}>
            <input
              className={styles.inputs}
              type="file"
              onChange={(e) => {
                let file = e.target.files[0];
                setFile(file);
                let img = URL.createObjectURL(file);
                setImg(img);
              }}
            />
          </div>
          <button type="submit">Enviar</button>
        </form>
      )}
    </Formik>
  );
}
