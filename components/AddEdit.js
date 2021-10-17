import { useRouter } from "next/router";
import { Formik } from "formik";
export { AddEdit };
import React, { useState } from "react";

function AddEdit(props) {
  const product = props?.product;
  const isAddMode = !product;
  const router = useRouter();

  let firstImg = isAddMode
    ? "https://via.placeholder.com/500"
    : product.images[0];

  var [img, setImg] = useState(firstImg);
  var [file, setFile] = useState("");
  let [dataImg, setDataImg] = useState("");

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

  const createProduct = async (data) => {
    uploadImage();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: data.title,
        price: data.price,
        description: data.description,
        images: [img],
        category: data.category,
      }),
    };

    return await fetch(`/api/products/`, requestOptions)
      .then((res) => {})
      .then(() => {
        alert(`El producto ${data.title} fue creado.`);
        router.replace("/dashboard/");
      })
      .catch(console.log(error));
  };

  const editProduct = async (id, data) => {
    var editImg = false;
    if (img != product.images[0]) {
      console.log("SE ESTA SUBIENDO LA IMAGEN A CLOUDINARY");
      editImg = true;
      await uploadImage();
    }

    var imagePost;
    if (editImg) {
      imagePost = dataImg.url;
    } else {
      imagePost = product.images[0];
    }
    console.log("FINAL POST IMAGEN: ", imagePost);
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
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Product | Rey del panchuque");
    data.append("cloud_name", "stefanoferrari0");

    await fetch(
      "https://api.cloudinary.com/v1_1/stefanoferrari0/image/upload",
      {
        method: "post",
        body: data,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setDataImg(data);
      })
      .catch((err) => {
        console.log(err);
      });
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
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Titulo</label>
            <input
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
          <div>
            <label htmlFor="price">Precio</label>
            <input
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
          <div>
            <label htmlFor="description">Descripción</label>
            <textarea
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
          <div>
            <label htmlFor="category">Imagen</label>
            <input
              type="file"
              onChange={(e) => {
                let file = e.target.files[0];
                setFile(file);
                let img = URL.createObjectURL(file);
                setImg(img);
              }}
            />
            <img style={{ width: "500px", height: "500px" }} src={img} />
          </div>
          <button type="submit">Enviar</button>
        </form>
      )}
    </Formik>
  );
}
